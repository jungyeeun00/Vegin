import requests
from bs4 import BeautifulSoup
import urllib.parse
import pymysql
import RecipeCrawling

# Connection 연결
conn = pymysql.connect(host='localhost', port=3306, user='root', password='1234', db='vegindb', charset='utf8')

# Connection으로부터 Cursor 생성
curs = conn.cursor()

page = 1
last = False
id = 1
cates = {'밑반찬':'63', '메인반찬':'56', '국/탕':'54', '찌개':'55', '디저트':'60', '면/만두':'53', '밥/죽/떡':'52', '퓨전':'61', '김치/젓갈/장류':'57', '양념/소스/잼':'58', '양식':'65', '샐러드':'64', '스프':'68', '빵':'66', '과자':'69', '차/음료/술':'59', '기타':'62'}

# 비건 검색한 baseUrl
baseUrl = "https://www.10000recipe.com/recipe/list.html?q=%EB%B9%84%EA%B1%B4"

# 카테고리별로 수집
for cate in cates.keys():
    page = 1
    last = False
    while last == False:
        params = urllib.parse.urlencode({'cat4': cates[cate], 'order': 'reco', 'page': str(page)})
        url = baseUrl + "&" + params
        html = requests.get(url).text
        soup = BeautifulSoup(html, 'html.parser')

        a_list = soup.select('div.common_sp_thumb > a')
        href_list = []
        for a in a_list:
            href_list.append(a.attrs['href'])

        # recipe_all = [recipe_title_img, recipe_title, recipe_info, recipe_source, recipe_quantity, recipe_step, recipe_step_img]
        for href in href_list:
            res = RecipeCrawling.ItemRecipe(href)
            if res is None:
                continue
            else:
                # SQL문 생성
                sql_recipe = "INSERT INTO recipe (name, servings, time, difficulty, category, views, img) VALUES (%s, %s, %s, %s, %s, %s, %s)"
                sql_ingre = "INSERT INTO ingredient (recipe_id, quantity, category, name) VALUES (%s, %s, %s, %s)"
                sql_step = "INSERT INTO step (no, recipe_id, content, img) VALUES (%s, %s, %s, %s)"
                try:
                    # recipe 테이블에 추가
                    curs.execute(sql_recipe, (res[1][0], res[2][0], res[2][1], res[2][2], cate, 0, res[0][0]))
                    conn.commit()
                    keys = (res[3].keys())
                    i = 0

                    # ingredient 테이블에 추가
                    for key in keys:
                        for value in res[3][key]:
                            curs.execute(sql_ingre, (id, res[4][i], key, value))
                            conn.commit()
                            i += 1

                    # step 테이블에 추가
                    for n in range(1, len(res[5]) + 1):
                        curs.execute(sql_step, (n, id, res[5][n-1], res[6][n-1]))
                        conn.commit()

                    id += 1
                except Exception as e:
                    print(e)

        # 페이지 이동
        page_list = soup.select('#contents_area_full > ul > nav > ul > li > a')
        if (page_list[-1].get_text() == str(page)) and (page_list[-1].get_text() != ">"):
            last = True
        else:
            page += 1;


curs.close()
conn.close()