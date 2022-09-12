from tensorflow.keras.layers import Embedding, Dense, GRU
from tensorflow.keras.models import Sequential
from tensorflow.keras.models import load_model
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
import numpy as np
import json
from tensorflow.keras.preprocessing.sequence import pad_sequences

#전처리 데이터 불러오기
DATA_PATH = './CLEAN_DATA/'
X_TRAIN_DATA = 'nsmc_X_train.npy'
Y_TRAIN_DATA = 'nsmc_y_train.npy'
DATA_CONFIGS = 'data_configs.json'

X_train = np.load(open(DATA_PATH + X_TRAIN_DATA, 'rb'))
X_train = pad_sequences(X_train, maxlen=X_train.shape[1])

y_train = np.load(open(DATA_PATH + Y_TRAIN_DATA, 'rb'))

prepro_configs = json.load(open(DATA_PATH+DATA_CONFIGS, 'r'))

# 모델 설계
model = Sequential()
model.add(Embedding(prepro_configs['vocab_size'], 100))
model.add(GRU(128))
model.add(Dense(1, activation='sigmoid'))

# 모델 검증
# EarlyStopping은 검증 데이터 손실이 증가 = 과적합 징후. 검증 데이터 손실이 3회 증가하면 정해진 에포크 도달 못해도 학습 조기 종료
es = EarlyStopping(monitor='val_loss', mode='min', verbose=1, patience=3)
# ModelCheckpoint를 사용하여 검증 데이터의 정확도가 이전보다 좋아질 경우에만 모델 저장.
mc = ModelCheckpoint('GRU_model.h5', monitor='val_acc', mode='max', verbose=1, save_best_only=True)

# 모델 훈련
model.compile(optimizer='rmsprop', loss='binary_crossentropy', metrics=['acc'])
history = model.fit(X_train, y_train, epochs=12, callbacks=[es, mc], batch_size=60, validation_split=0.2)
