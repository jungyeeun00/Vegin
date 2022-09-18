import sys
import pandas as pd
import sqlalchemy as db
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# db와 연결
engine = db.create_engine('mysql+pymysql://vegin:vegin123@vegindatabase01.cyumdfzrqmsj.ap-northeast-2.rds.amazonaws.com:3306/board-back').connect()

# 불용어 추가
recipe_stopwords = ['비건', '비건채식', '비건레시피', '비건음식', '비건베이킹', '요리', '쿡', '법', '간단', '레시피', '채식', '베이', '킹', '음식', '초', '노', '손', '맛', '약', 'cm', 'g', 'or']

# 유사도 계산 시 사용할 가중치
w_igr = 2
w_name = 1.5
w_st = 1


# 데이터 불러 와서 데이터 처리를 위한 열 추가
def load():
    sql_igr = 'select * from ingredient'
    ingredient = pd.read_sql(sql_igr, engine)
    sql_st = 'select * from step'
    step = pd.read_sql(sql_st, engine)
    sql_rcp = 'select * from recipe'
    recipe = pd.read_sql(sql_rcp, engine)
    igr_list = ingredient.groupby(['recipe_id'], as_index=False).agg({'name': ' '.join, 'recipe_id': 'first'})['name']
    step_list = step.groupby(['recipe_id'], as_index=False).agg({'content': ' '.join, 'recipe_id': 'first'})['content']
    recipe['igr_list'] = recipe['category'] + ' ' + igr_list
    recipe['st_list'] = step_list
    return recipe


# TF-IDF
def vectorize(documents):
    tf = TfidfVectorizer(stop_words=recipe_stopwords, min_df=1)
    tfidf_matrix = tf.fit_transform(documents)
    return tfidf_matrix


# 유사도
def similarity(recipe):
    # 유사도
    tfidf_matrix1 = vectorize(recipe['igr_list'])
    cosine_sim = linear_kernel(tfidf_matrix1, tfidf_matrix1) * w_igr
    tfidf_matrix2 = vectorize(recipe['name'])
    cosine_sim += linear_kernel(tfidf_matrix2, tfidf_matrix2) * w_name
    tfidf_matrix3 = vectorize(recipe['st_list'])
    cosine_sim += linear_kernel(tfidf_matrix3, tfidf_matrix3) * w_st
    return cosine_sim / 4.5


# 추천 리스트. 상위 8개 레시피 반환
def get_recommendations(id):
    # 레시피 데이터
    recipe = load()
    # 레시피의 id를 index로 하고 recipe.index를 data로 하는 indices 생성
    indices = pd.Series(data=recipe.index, index=recipe['id'].astype(str))
    # 입력받은 레시피의 id로부터 해당되는 인덱스를 받아옴
    idx = indices[id]
    # 모든 레시피에 대해서 해당 레시피와의 유사도를 구함
    cosine_sim = similarity(recipe)
    sim_scores = list(enumerate(cosine_sim[idx]))
    # 유사도에 따라 레시피들을 정렬
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    # 가장 유사한 8개의 레시피를 받아옴(본인 제외)
    sim_scores = sim_scores[1:9]
    # 가장 유사한 8개의 레시피의 인덱스 받아옴
    recipe_indices = [i[0] for i in sim_scores]
    # 가장 유사한 8개의 레시피의 id를 리턴
    return list(map(int, indices[recipe_indices].index))


def main(argv):
    print(get_recommendations(argv[1]))


if __name__ == "__main__":
    main(sys.argv)
