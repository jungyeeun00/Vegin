import sqlalchemy as db
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import sys

engine = db.create_engine('mysql+pymysql://root:1234@localhost/vegindb').connect()


def load_clean():
    sql_igr = 'select * from ingredient'
    ingredient = pd.read_sql(sql_igr, engine)
    sql_st = 'select * from step'
    step = pd.read_sql(sql_st, engine)
    # print(df_igr)
    sql_rcp = 'select * from recipe'
    recipe = pd.read_sql(sql_rcp, engine)
    # length = len(df_rcp.index)
    name_list = ingredient.groupby(['recipe_id'], as_index=False).agg({'name': ' '.join, 'recipe_id' : 'first'})['name']
    name_list = name_list.rename("feature")
    step_list = step.groupby(['recipe_id'], as_index=False).agg({'content': ' '.join, 'recipe_id' : 'first'})['content']
    # print(step_list)
    recipe = pd.concat([recipe, name_list], axis=1)
    recipe['feature'] = recipe['category'] + ' ' + recipe['feature'] + ' ' + recipe['name'] + ' ' + step['content']
    return recipe


def tokenize(recipe):
    # min_df를 1로 설정해줌으로써 한번이라도 노출이 된 정보도 다 고려함
    # ngram_range : n_gram 범위 지정 연속으로 나오는 단어들의 순서도 고려함
    tf = TfidfVectorizer(min_df=1, ngram_range=(1, 5))
    tfidf_matrix = tf.fit_transform(recipe['feature'])
    return tfidf_matrix


def similarity(recipe):
    # 유사도
    tfidf_matrix = tokenize(recipe);
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    return cosine_sim


def get_recommendations(name):
    recipe = load_clean()
    indices = pd.Series(data=recipe.index, index=recipe['name'])
    # 선택한 레시피의 이름으로부터 해당되는 인덱스를 받아옵니다. 이제 선택한 레시피를 가지고 연산할 수 있습니다
    idx = indices[name]
    # 모든 레시피에 대해서 해당 레시피와의 유사도를 구합니다
    cosine_sim = similarity(recipe)
    sim_scores = list(enumerate(cosine_sim[idx]))
    # 유사도에 따라 레시피들을 정렬합니다
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    # 가장 유사한 10개의 레시피를 받아옵니다
    sim_scores = sim_scores[1:11]
    # 가장 유사한 10개의 레시피의 인덱스를 받아옵니다
    recipe_indices = [i[0] for i in sim_scores]
    # 가장 유사한 10개의 레시피의 이름을 리턴합니다
    return indices[recipe_indices]


def main(argv):
    return get_recommendations(argv[1])


if __name__ == "__main__":
    main(sys.argv)
