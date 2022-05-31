import sys
import pymysql
import pandas as pd
import sqlalchemy as db
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

engine = db.create_engine('mysql+pymysql://root:dlrkdls7815@localhost/board-back').connect()

product_stopwords = ['비건', 'Vegan', 'vegan', '클래식', '세트', '할인', 'set', '신상', '증정', '배송', '인증']


def load():
    sql = "SELECT * FROM product;"
    product = pd.read_sql(sql, engine)
    product['feature'] = product['product_name'] + ' ' + product['category']
    return product


def tokenize(product):
    # min_df를 1로 설정해줌으로써 한번이라도 노출이 된 정보도 다 고려함
    tf = TfidfVectorizer(stop_words=product_stopwords, min_df=1)
    tfidf_matrix = tf.fit_transform(product['feature'])
    return tfidf_matrix


def similarity(product):
    tfidf_matrix = tokenize(product)
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    return cosine_sim


# 상위 10개 이름 반환하는 함수
def get_recommendations(product_id):
    product = load()
    indices = pd.Series(data=product.index, index=product['product_id'].astype(str))
    idx = indices[int(product_id)]
    cosine_sim = similarity(product)
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:9]  # 상위 9개
    product_indices = [i[0] for i in sim_scores]
    return list(map(int, indices[product_indices].index))


def main(argv):
    print(get_recommendations(argv[1]))


if __name__ == "__main__":
    main(sys.argv)
