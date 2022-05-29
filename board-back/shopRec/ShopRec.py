import sys
import pymysql
import pandas as pd
import sqlalchemy as db
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

engine = db.create_engine('mysql+pymysql://root:dlrkdls7815@localhost/board-back').connect()


def load_clean():
    sql = "SELECT * FROM product;"
    product = pd.read_sql(sql, engine)
    product['feature'] = product['product_name'] + ' ' + product['category']
    return product


def tokenize(product):
    # min_df를 1로 설정해줌으로써 한번이라도 노출이 된 정보도 다 고려함
    # ngram_range : n_gram 범위 지정 연속으로 나오는 단어들의 순서도 고려함
    tf = TfidfVectorizer(min_df=1, ngram_range=(1, 5))
    tfidf_matrix = tf.fit_transform(product['feature'])
    return tfidf_matrix


def similarity(product):
    tfidf_matrix = tokenize(product)
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    return cosine_sim


# 상위 10개 이름 반환하는 함수
def get_recommendations(product_id):
    product = load_clean()
    # indices = pd.Series(data=product.index, index=product['product_name'])
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
