from bs4 import BeautifulSoup
import time
import random
from selenium import webdriver
import pymysql
from webdriver_manager.chrome import ChromeDriverManager

#driver = webdriver.Chrome(ChromeDriverManager().install())
options = webdriver.ChromeOptions()
#driver = webdriver.Chrome()
#driver = webdriver.Chrome(executable_path=ChromeDriverManager(version='102.0.5005.27').install(), chrome_options=options)
driver = webdriver.Chrome(executable_path=ChromeDriverManager().install())


# DB 연결
conn = pymysql.connect(
    host='vegindatabase.cyumdfzrqmsj.ap-northeast-2.rds.amazonaws.com',
    port=3306,
    user='vegin',
    password='vegin123',
    db='board-back',
    charset='utf8'
)

conn.set_charset('utf8mb4')
curs = conn.cursor()

url = 'https://www.idus.com/search?word=%EB%B9%84%EA%B1%B4&keyword_channel=user&category_uuid=5c6bc7d4-7760-4702-b63f-7f29eca479e3'
category_name = '디저트'

# url = 'https://www.idus.com/search?word=%EB%B9%84%EA%B1%B4&keyword_channel=user&category_uuid=8daa0fc3-d370-46c5-a58b-9a0c71a6ae08'
# category_name = '간편식품'

# url = 'https://www.idus.com/search?word=%EB%B9%84%EA%B1%B4&keyword_channel=user&category_uuid=c468e7db-ea75-11e4-b903-06f4fe0000b5'
# category_name = '화장품'

# url = 'https://www.idus.com/search?word=%EB%B9%84%EA%B1%B4&keyword_channel=user&category_uuid=976cfb97-c6bc-11e3-83fc-06530c0000b4&category_uuid=66299878-c6bc-11e3-8577-06f4fe0000b5&category_uuid=30b3ae0f-c6bc-11e3-8577-06f4fe0000b5&category_uuid=e3ba45b3-c165-11e3-8788-06fd000000c2&category_uuid=be3cf842-ea74-11e4-8878-06a6fa0000b9'
# category_name = '생활용품'

# url = 'https://www.idus.com/search?word=%EB%B9%84%EA%B1%B4&keyword_channel=user&category_uuid=f0475fb1-c6bb-11e3-954e-06a6fa0000b9&category_uuid=b12b42eb-0cdf-11e4-85f1-06fd000000c2&category_uuid=aef50134-0cdf-11e4-8182-06530c0000b4&category_uuid=ac599662-0cdf-11e4-85f1-06fd000000c2&category_uuid=387867a4-0da4-11e4-873e-06f4fe0000b5&category_uuid=1616d42d-ea77-11e4-88d5-06530c0000b4&category_uuid=a9970f75-ea75-11e4-8a46-06fd000000c2&category_uuid=bc5f4be5-c6bc-11e3-8b03-06fd000000c2'
# category_name = '패션잡화'
# driver.get(url)

#페이지 맨 아래로 스크롤
prev_height = driver.execute_script("return document.body.scrollHeight")

#무한 스크롤
while True:
    # 스크롤을 화면 가장 아래로 내린다
    driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
    # 페이지 로딩 대기
    time.sleep(2)
    # 현재 문서 높이를 가져와서 저장
    curr_height = driver.execute_script("return document.body.scrollHeight")
    if(curr_height == prev_height):
        break
    else:
        prev_height = driver.execute_script("return document.body.scrollHeight")

a_list = driver.find_elements_by_css_selector('#content > div:nth-of-type(2) > div > div > div > div > a')

href_list = []
for i in a_list:
    href_list.append(i.get_attribute('href'))
h_len = len(href_list)

d_list = []
# 성별
s_list = ['m', 'f']

# 상품 상세 정보 url

for a in a_list:
    href_list.append(a.get_attribute('href'))

for href in href_list[0:]:
    driver.get(href)
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    # 상품 상세정보
    detail = soup.select_one('#prd-info > p')
    if detail is None:
        detail = soup.select_one('#prd-info > div.ProductDetailDescription > div.ProductDetailDescription__content.ProductDetailDescription__content--hidden')
        #         for i in detail:
        #             d_list.append(i.get_text())
        #             detail = '\n'.join(d_list)
        if detail is None:
            continue
    #     else:
    #         detail = detail.get_text()
    detail = detail.get_text()

    # 상품 이미지 url
    img_url = soup.select_one("#img-section > div > div > ul > li:nth-of-type(1)")
    if img_url is None:
        img_url = soup.select_one('#img-section > div > div > ul > li')
    img_url = img_url.get('style')
    img_url = img_url.split('background-image: url("')[1][:-17]

    # 상품명
    name = soup.select_one("#content > div:nth-of-type(2) > aside > div > div.sticky_aside_product > h2").get_text()

    # 판매가
    soldPrice = soup.select_one("#content > div:nth-of-type(2) > aside > div > div > div:nth-of-type(2) > div:nth-of-type(1) > div > span > span.price_tag__strong > strong")

    if soldPrice is None:
        soldPrice = soup.select_one("#content > div:nth-of-type(2) > aside > div > div > div:nth-of-type(2) > div:nth-of-type(1) > div > span > span")
        if soldPrice is None:
            soldPrice = soup.select_one("#content > div:nth-of-type(2) > aside > div > div > div.product-detail-info > div > div:nth-of-type(1) > span > strong")

    soldPrice = int(soldPrice.get_text().replace('원','').replace(',',''))
    print("sold: " + str(soldPrice))

    # 정가
    regPrice = soup.select_one("#content > div:nth-of-type(2) > aside > div > div > div:nth-of-type(2) > div:nth-of-type(1) > div > span > span.price_tag__crossout")
    if regPrice is None:
        regPrice = soup.select_one("#content > div:nth-of-type(2) > aside > div > div > div:nth-of-type(2) > div:nth-of-type(1) > div > span > del")
        if regPrice is None:
            regPrice = soldPrice
        else :
            regPrice = int(regPrice.get_text().replace('원', '').replace(',',''))
    print("regPrice: "+str(regPrice))

    # 할인율
    saleRate = soup.select_one("#content > div:nth-of-type(2) > aside > div > div > div:nth-of-type(2) > div:nth-of-type(1) > div > span > span.price_tag__hilight > em")
    if saleRate is None:
        saleRate = 0
    else:
        saleRate = int(saleRate.get_text())

    # 옵션 제외하고 DB insert
    sql = "INSERT INTO product (product_name, sold_price, reg_price, sale_rate, category, img_src, detail) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    curs.execute(sql, (name, soldPrice, regPrice, saleRate, category_name, img_url, detail))
    conn.commit()
    # 옵션
    op = soup.select('#optionScrollable > div.select_group__body > ol > ul > li')
    if op is not None:
        curs.execute("SELECT MAX(product_id) FROM product") # 방금 INSERT한 product_id 가져옴
        product_id = curs.fetchone()

        for o in op:
            choice = o.get_text()
            if "(+" in choice:
                extra_cost = int(choice.split('(+')[1][:-1].replace('원','').replace(',',''))
            elif "(-" in choice:
                extra_cost = -int(choice.split('(-')[1][:-1].replace('원','').replace(',',''))
            else :
                extra_cost = 0
            sql = "INSERT INTO choice (product_id, content, extra_cost) VALUES (%s, %s, %s)"
            curs.execute(sql, (product_id, choice, extra_cost))
            conn.commit()


            # 리뷰
    while True:
        time.sleep(1)
        review = driver.find_elements_by_css_selector('#prd-review > ul > li')

        for r in review:
            # 이름
            r_name = r.find_element_by_css_selector('a > div.review-header > div.reviewer-info > div.reviewer-detail-info > span.reviewer-name').text
            rSql = '(select id FROM member WHERE id="' + r_name + '")'
            curs.execute("SELECT EXISTS " + rSql)
            isExist = curs.fetchone()
            if '0' in str(isExist) : # 작성자 이름이 DB에 존재하지 않으면 삽입
                email = r_name + '@test.com'
                pwd = '$2a$10$SL7gYaIkiKXK2aucyfy4duE0p2CAY57JowNNWCqWWfdmjP1vWqiqy'
                name = 'user'
                phone = '010-0000-0000'
                gender = random.choice(s_list)
                age = random.randrange(18,65)
                sql = "INSERT INTO member (id, email, password, name, phone, gender, age) VALUES (%s, %s, %s, %s, %s, %s, %s)"
                curs.execute(sql, (r_name, email, pwd, name, phone, gender, age))
                conn.commit()

            # 리뷰 내용
            r_text = r.find_elements_by_css_selector('a > div.review-body > div.review-contents')
            text = ''
            for t in r_text:
                text = text + t.text

                # 별점 계산
            star = r.find_element_by_css_selector('a > div.review-header > div.review-rate > span')
            star = float(star.get_attribute('data-value'))

            print(product_id); print(r_name); print(star); print(text); print('-------');
            sql = "INSERT INTO review (product_id, member_id, star, text) VALUES (%s, %s, %s, %s)"
            curs.execute(sql, (product_id, r_name, star, text))
            conn.commit()

        # 리뷰 다음 페이지로 이동
        try:
            #             nextpage = driver.find_element_by_css_selector("#prd-review > ul > nav > button.arrows > i.right")
            #             nextpage.click()
            nextpage = driver.find_element_by_css_selector("#prd-review > ul > nav > button.arrows")
            if('다음' in nextpage.text):
                print(nextpage.text)
                nextpage.send_keys('\n')
            else:
                nextpage = driver.find_elements_by_css_selector("#prd-review > ul > nav > button.arrows")[1]
                nextpage.send_keys('\n')

        except:
            print("데이터 수집 완료.")
            break


curs.close()
conn.close()
