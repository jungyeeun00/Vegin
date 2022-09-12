from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np

# 전처리 데이터 불러오기
DATA_PATH = './CLEAN_DATA/'
X_TEST_DATA = 'nsmc_X_test.npy'
Y_TEST_DATA = 'nsmc_y_test.npy'

X_test = np.load(open(DATA_PATH + X_TEST_DATA, 'rb'))
X_test = pad_sequences(X_test, maxlen=X_test.shape[1])

y_test = np.load(open(DATA_PATH + Y_TEST_DATA, 'rb'))

# 평가
loaded_model = load_model('GRU_model.h5')
print("\n 테스트 정확도: %.4f" % (loaded_model.evaluate(X_test, y_test)[1]))