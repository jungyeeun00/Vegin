import sys
import pandas as pd
import sqlalchemy as db
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

engine = db.create_engine('mysql+pymysql://root:1234@localhost/vegindb').connect()

# 불용어 추가
product_stopwords = ['비건', 'Vegan', 'vegan', '클래식', '세트', '할인', 'set', '신상', '증정', '배송', '인증']


# 데이터 불러 와서 데이터 처리를 위한 열 추가
def load():
    sql = "SELECT * FROM product;"
    product = pd.read_sql(sql, engine)
    product['feature'] = product['product_name'] + ' ' + product['category']
    return product


# TF-IDF
def vectorize(product):
    tf = TfidfVectorizer(stop_words=product_stopwords, min_df=1)
    tfidf_matrix = tf.fit_transform(product['feature'])
    return tfidf_matrix


# 유사도
def similarity(product):
    tfidf_matrix = vectorize(product)
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    return cosine_sim


# 추천 리스트. 상위 8개 상품 반환
def get_recommendations(product_id):
    # 상품 데이터
    product = load()
    # 상품의 id를 index로 하고 shop.index를 data로 하는 indices 생성
    indices = pd.Series(data=product.index, index=product['product_id'].astype(str))
    # 입력받은 상품의 id로부터 해당되는 인덱스를 받아옴
    idx = indices[int(product_id)]
    # 모든 상품에 대해서 해당 상품과의 유사도를 구함
    cosine_sim = similarity(product)
    sim_scores = list(enumerate(cosine_sim[idx]))
    # 유사도에 따라 상품들을 정렬
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    # 가장 유사한 8개의 상품을 받아옴(본인 제외)
    sim_scores = sim_scores[1:9]
    # 가장 유사한 8개의 상품의 인덱스 받아옴
    product_indices = [i[0] for i in sim_scores]
    # 가장 유사한 8개의 상품의 id를 리턴
    return list(map(int, indices[product_indices].index))


def main(argv):
    print(get_recommendations(argv[1]))


if __name__ == "__main__":
    main(sys.argv)
