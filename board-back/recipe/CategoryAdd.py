import requests
from bs4 import BeautifulSoup
import urllib.parse

baseUrl = "https://www.10000recipe.com/recipe/list.html?q=%EB%B9%84%EA%B1%B4"
# &cat4={num}&order=reco&page={page}

cate_names = {}

def CateClassif(cate):
    for key in cate.keys():
        page = 1
        last = False
        while last == False:
            params = urllib.parse.urlencode({'cat4': cate[key], 'order': 'reco', 'page': str(page)})
            url = baseUrl + "&" + params

            html = requests.get(url).text

            soup = BeautifulSoup(html, 'html.parser')

            tit_list = []
            #contents_area_full > ul > ul > li:nth-child(1) > div.common_sp_caption > div.common_sp_caption_tit.line2
            res = soup.select("#contents_area_full > ul > ul > li > div.common_sp_caption > div.common_sp_caption_tit.line2")
            source = []
            for n in res:
                source.append(n.get_text())

            cate_names[key] = source

            page_list = soup.select('#contents_area_full > ul > nav > ul > li > a')
            if (page_list[-1].get_text() == str(page)) and (page_list[-1].get_text() != ">"):
                last = True
            else:
                page += 1

    return cate_names
