from bs4 import BeautifulSoup
import time
from selenium import webdriver
import pymysql

options = webdriver.ChromeOptions()
driver = webdriver.Chrome()

# DB 연결
conn = pymysql.connect(
    host='vegindatabase.cbnzjcm8m9yd.ap-northeast-2.rds.amazonaws.com',
    port=3306,
    user='vegin',
    password='vegin123',
    db='vegindb',
    charset='utf8'
)
curs = conn.cursor()

url = 'https://www.idus.com/search?word=%EB%B9%84%EA%B1%B4&keyword_channel=user&category_uuid=1616d42d-ea77-11e4-88d5-06530c0000b4&category_uuid=a9970f75-ea75-11e4-8a46-06fd000000c2&category_uuid=bc5f4be5-c6bc-11e3-8b03-06fd000000c2'
category_name = '패션잡화'
driver.get(url)

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

a_list = driver.find_elements_by_css_selector('#content > div > div > div > div > div > a')
href_list = []

# 상품 상세 정보 url
for a in a_list:
    href_list.append(a.get_attribute('href'))

for href in href_list:
    driver.get(href)
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    # 상품 이미지 url
    img_url = soup.select_one("#img-section > div > div > ul > li:nth-of-type(1)")
    if img_url is None:
        img_url = soup.select_one('#img-section > div > div > ul > li')
    img_url = img_url.get('style')
    img_url = img_url.split('background-image: url("')[1][:-17]

    # 상품명
    name = soup.select_one("#content > div:nth-of-type(2) > aside > div > div.sticky_aside_product > h2").get_text()

    # 판매가
    soldPrice = soup.select_one("#content > div:nth-of-type(2) > aside > div > div.sticky_aside_product > div.product-detail-info > div.price_tag-detail > span > span.price_tag__strong > strong")
    if soldPrice is None:
        soldPrice = soup.select_one("#content > div:nth-of-type(2) > aside > div > div.sticky_aside_product > div.product-detail-info > div.price_tag-detail > span.price_tag__strong > strong")
    soldPrice = int(soldPrice.get_text().replace(',',''))

    # 정가
    regPrice = soup.select_one("#content > div:nth-of-type(2) > aside > div > div > div.product-detail-info > div:nth-of-type(1) > span > del")
    if regPrice is None:
        regPrice = soldPrice
    else :

        regPrice = int(regPrice.get_text().replace('원', '').replace(',',''))
    # 할인율
    saleRate = soup.select_one("#content > div:nth-of-type(2) > aside > div > div > div.product-detail-info > div:nth-of-type(1) > span > span.price_tag__hilight > em")
    if saleRate is None:
        saleRate = 0
    else:
        saleRate = int(saleRate.get_text())

    # 옵션 제외하고 DB insert
    sql = "INSERT INTO product (product_name, reg_price, sold_price, sale_rate, category, img_src) VALUES (%s, %s, %s, %s, %s, %s)"
    curs.execute(sql, (name, soldPrice, regPrice, saleRate, category_name, img_url))
    conn.commit()
    # 옵션
    op = soup.select('#optionScrollable > div.select_group__body > ol > ul > li')

    if op is not None:
        curs.execute("SELECT MAX(product_id) FROM product")
        product_id = curs.fetchone()
        for o in op:
            choice = o.get_text()
            if "(+" in choice:
                extra_cost = int(choice.split('(+')[1][:-1].replace('원','').replace(',',''))
            else :
                extra_cost = 0
            sql = "INSERT INTO choice (product_id, content, extra_cost) VALUES (%s, %s, %s)"
            curs.execute(sql, (product_id, choice, extra_cost))
    conn.commit()

curs.close()
conn.close()
