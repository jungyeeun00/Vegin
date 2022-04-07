import requests
from bs4 import BeautifulSoup

baseUrl = 'http://www.10000recipe.com'

def ItemRecipe(recipeUrl):
    url = baseUrl + recipeUrl

    html = requests.get(url).text
    soup = BeautifulSoup(html, 'html.parser')

    recipe_title_img = [] # 레시피 전체 사진
    recipe_title = [] # 레시피 제목
    recipe_info = [] # 레시피 정보
    recipe_source = {}  # 레시피 재료
    recipe_quantity = [] # 레시피 재료 양
    recipe_step = [] # 레시피 순서
    recipe_step_img = [] # 레시피 순서별 사진

    try:
        res = soup.select_one("div.view2_pic > div.centeredcrop > img")
        recipe_title_img.append(res.attrs['src'])
    except(AttributeError):
        return

    try:
        res = soup.select_one("div.view2_summary.st3 > h3")
        recipe_title.append(res.get_text())
        res_list = soup.select("div.view2_summary_info > span")
        for res in res_list:
            recipe_info.append(res.get_text())
        res = soup.select("div.ready_ingre3 > ul")
    except(AttributeError):
        return

    # 재료 찾는 for문 가끔 형식에 맞지 않는 레시피들이 있어 try/ except 해준다
    try:
        for n in res:
            source = []
            title = n.select_one("#divConfirmedMaterialArea > ul > b").get_text()
            recipe_source[title] = ''
            for tmp in n.select('li'):
                tempSource = tmp.get_text().replace('\n', '').replace(' ', ' ')
                source.append(tempSource.split("    ")[0])
                unit = tmp.select_one("span.ingre_unit")
                recipe_quantity.append(unit.get_text())
            recipe_source[title] = source
    except (AttributeError):
        return

    # 요리 순서
    # res = soup.select("div.view_step > div.view_step_cont.media > div.media-body")
    res = soup.select("div.view_step > div.view_step_cont.media")

    i = 1
    for n in res:
        # 툴 제거
        if n.select_one("p") is not None:
            n.p.extract()
        recipe_step.append(n.get_text().replace('\n', ''))

        img_id = "#stepimg" + str(i)
        if soup.select_one(img_id) is not None:
            st_img = soup.select_one(img_id + "> img")
            if st_img is not None:
                recipe_step_img.append(st_img.attrs['src'])
            else:
                recipe_step_img.append('')
        else:
            recipe_step_img.append('')
        i += 1


    if not recipe_step:
        return

    recipe_all = [recipe_title_img, recipe_title, recipe_info, recipe_source, recipe_quantity, recipe_step, recipe_step_img]
    return (recipe_all)

