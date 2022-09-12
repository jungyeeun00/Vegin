import sqlalchemy as db
import pandas as pd
import numpy as np
from konlpy.tag import Mecab
from sklearn.model_selection import train_test_split
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import json
import pickle
import os

# engine = db.create_engine('mysql+pymysql://vegin:vegin123@vegindatabase.cyumdfzrqmsj.ap-northeast-2.rds.amazonaws.com:3306/board-back').connect()
engine = db.create_engine('mysql+pymysql://root:1234@localhost/vegindb').connect()

# 데이터 불러오기
sql_load = "SELECT star, text FROM review where star!=3;"
review = pd.read_sql(sql_load, engine)
# 레이블 부여. 별점 4, 5인 리뷰는 1, 별점 1, 2인 리뷰는 0
#####!!!!!!!!!!!!!!!!!!!! 별점 소수점도 추가 해야함 !!!!!!!!!!!!!!!!!!!!#####
review['label'] = np.select([review.star > 3], [1], default=0)
# 중복 데이터 제거
review.drop_duplicates(subset=['text'], inplace=True)
# 훈련 데이터와 테스트 데이터 3:1 비율로 분리
train, test = train_test_split(review, test_size=0.25, random_state=42)

# 한글 제외 모두 제거
train['text'] = train['text'].str.replace('[^ㄱ-ㅎㅏ-ㅣ가-힣]', '', regex=True)
test['text'] = test['text'].str.replace('[^ㄱ-ㅎㅏ-ㅣ가-힣]', '', regex=True)
# 공백 null로 변경 후 null값인 데이터 제거
train['text'].replace('', np.nan, inplace=True)
train.dropna(subset=['text'], inplace=True)
test['text'].replace('', np.nan, inplace=True)
test.dropna(subset=['text'], inplace=True)

mecab = Mecab('C:/mecab/mecab-ko-dic')
stopwords = ['는데', '습니다', '네요', '어요', '었', '있', '은', '는', '이', '가', '하', '고', '아', '거', '것', '의', '도', '다', '한', '에', '을', '를', '인', '듯', '과', '와', '네', '들', '듯', '지', '임', '게', '어']

# 훈련 데이터 토큰화
train['tokenized'] = train['text'].apply(mecab.morphs)
train['tokenized'] = train['tokenized'].apply(lambda x: [item for item in x if item not in stopwords])

# 테스트 데이터 토큰화
test['tokenized'] = test['text'].apply(mecab.morphs)
test['tokenized'] = test['tokenized'].apply(lambda x: [item for item in x if item not in stopwords])

X_train = train['tokenized'].values
y_train = train['label'].values
X_test = test['tokenized'].values
y_test = test['label'].values

# vocabulary 생성
tokenizer = Tokenizer()
tokenizer.fit_on_texts(X_train)

# 단어 빈도수가 1인 단어는 자연어 처리에서 배제
threshold = 2
total_cnt = len(tokenizer.word_index)   # 단어의 수
rare_cnt = 0    # 등장 빈도수가 threshold보다 작은 단어의 개수를 카운트
total_freq = 0  # 훈련 데이터의 전체 단어 빈도수 총 합
rare_freq = 0   # 등장 빈도수가 threshold보다 작은 단어의 등장 빈도수의 총 합

# 단어와 빈도수의 쌍(pair)를 key와 value로 받는다.
for key, value in tokenizer.word_counts.items():
    total_freq = total_freq + value

    # 단어의 등장 빈도수가 threshold 보다 작으면
    if(value < threshold):
        rare_cnt = rare_cnt + 1
        rare_freq = rare_freq + value

# 등장 빈도수가 1인 단어들의 수를 제외한 단어의 개수를 단어 집합의 최대 크기로 제한
# 전체 단어 개수 중 빈도수 2이하인 단어 개수는 제거.
# 0번 패딩 토큰과 1번 OOV 토큰을 고려하여 +2
vocab_size = total_cnt - rare_cnt + 2

# 정수 인코딩 실행
# Tokenizer에 oov_token을 지정
# Out-Of-Vocabulary(단어 집합에 없는 단어)
tokenizer = Tokenizer(vocab_size, oov_token='OOV')
tokenizer.fit_on_texts(X_train)
X_train = tokenizer.texts_to_sequences(X_train)
X_test = tokenizer.texts_to_sequences(X_test)

# 패딩
# 서로 다른 길이의 문장 길이 동일하게 맞춰주는 패딩 작업 수행
# 모델에 넣어주기 위해서는 문장의 길이를 동일하게 맞춰주어야 함
max_len = 80
X_train = pad_sequences(X_train, maxlen=max_len)
X_test = pad_sequences(X_test, maxlen=max_len)

y_train = np.array(y_train)
y_test = np.array(y_test)


DEFAULT_PATH  = './' # 경로지정
DATA_PATH = 'CLEAN_DATA/' #.npy파일 저장 경로지정
X_TRAIN_DATA = 'nsmc_X_train.npy'
X_TEST_DATA = 'nsmc_X_test.npy'
Y_TRAIN_DATA = 'nsmc_y_train.npy'
Y_TEST_DATA = 'nsmc_y_test.npy'

DATA_CONFIGS = 'data_configs.json'

data_configs = {}
data_configs['vocab_size'] = vocab_size

#전처리한 데이터들 파일로저장

if not os.path.exists(DEFAULT_PATH + DATA_PATH):
    os.makedirs(DEFAULT_PATH+DATA_PATH)

#전처리 학습데이터 넘파이로 저장
np.save(open(DEFAULT_PATH+DATA_PATH+X_TRAIN_DATA,'wb'), X_train)
np.save(open(DEFAULT_PATH+DATA_PATH+Y_TRAIN_DATA,'wb'), y_train)
#전처리 테스트데이터 넘파이로 저장
np.save(open(DEFAULT_PATH+DATA_PATH+X_TEST_DATA,'wb'), X_test)
np.save(open(DEFAULT_PATH+DATA_PATH+Y_TEST_DATA,'wb'), y_test)

#데이터 사전 json으로 저장
json.dump(data_configs,open(DEFAULT_PATH + DATA_PATH + DATA_CONFIGS,'w'), ensure_ascii=False)

# tokenizer 저장
with open('tokenizer.pickle', 'wb') as handle:
    pickle.dump(tokenizer, handle)