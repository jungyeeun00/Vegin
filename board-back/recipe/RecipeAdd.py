import requests
from bs4 import BeautifulSoup
import RecipeCrawling
import CategoryAdd
import pymysql

# Connection 연결

conn = pymysql.connect(host='vegindatabase.cbnzjcm8m9yd.ap-northeast-2.rds.amazonaws.com', port=3306, user='vegin', password='vegin123', db='vegindb', charset='utf8')

# Connection으로부터 Cursor 생성

curs = conn.cursor()

page = 1
last = False
id = 1
cate_dic = {'밑반찬':'63', '메인반찬':'56', '국/탕':'54', '찌개':'55', '디저트':'60', '면/만두':'53', '밥/죽/떡':'52', '퓨전':'61', '김치/젓갈/장류':'57', '양념/소스/잼':'58', '양식':'65', '샐러드':'64', '스프':'68', '빵':'66', '과자':'69', '차/음료/술':'59', '기타':'62'}

while last == False:
    url = "https://www.10000recipe.com/recipe/list.html?q=%EB%B9%84%EA%B1%B4&order=reco&page=" + str(page)
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
                curs.execute(sql_recipe, (res[1][0], res[2][0], res[2][1], res[2][2], '', 0, res[0][0]))
                conn.commit()
                keys = (res[3].keys())
                i = 0
                for key in keys:
                    for value in res[3][key]:
                        curs.execute(sql_ingre, (id, res[4][i], key, value))
                        conn.commit()
                        i += 1

                for n in range(1, len(res[5]) + 1):
                    curs.execute(sql_step, (n, id, res[5][n-1], res[6][n-1]))
                    conn.commit()

                id += 1
            except Exception as e:
                print(e)

    page_list = soup.select('#contents_area_full > ul > nav > ul > li > a')
    if (page_list[-1].get_text() == str(page)) and (page_list[-1].get_text() != ">"):
        last = True
    else:
        page += 1;



### 카테고리 지정 ###

cate_names = CategoryAdd.CateClassif(cate_dic)
sql_cate = "UPDATE recipe SET category=%s WHERE name=%s"
for key in cate_names.keys():
    for value in cate_names[key]:
        curs.execute(sql_cate, (key, value))
        conn.commit()

curs.close()
conn.close()