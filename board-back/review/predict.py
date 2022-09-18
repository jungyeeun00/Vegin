from konlpy.tag import Mecab
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
import pickle
import re
import sys

max_len = 80
model = load_model('GRU_model.h5')

with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

stopwords = ['는데', '습니다', '네요', '어요', '었', '있', '은', '는', '이', '가', '하', '고', '아', '거', '것', '의', '도', '다', '한', '에', '을', '를', '인', '듯', '과', '와', '네', '들', '듯', '지', '임', '게', '어']


def predict(new_sentence):
    if new_sentence == '':
        return 0
    mecab = Mecab('C:/mecab/mecab-ko-dic')
    new_sentence = re.sub(r'[^ㄱ-ㅎㅏ-ㅣ가-힣\\s ]', '', new_sentence)
    new_sentence = mecab.morphs(new_sentence) # 토큰화
    new_sentence = [word for word in new_sentence if not word in stopwords]  # 불용어 제거
    vector = tokenizer.texts_to_sequences([new_sentence]) # 정수 인코딩
    pad_new = pad_sequences(vector, maxlen=max_len) # 패딩
    score = float(model.predict(pad_new)) # 예측
    return score


def main(argv):
    print(predict(argv[1]))


if __name__ == "__main__":
    main(sys.argv)