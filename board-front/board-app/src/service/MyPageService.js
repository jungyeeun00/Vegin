import axios from 'axios'; 

const MYPAGE_API_BASE_URL = "http://localhost:8080";

class MyPageService {
    getLikeList(memberId) {
        return axios.get(MYPAGE_API_BASE_URL +  "/likes" + "?memberId="+ memberId)
    }
}

export default new MyPageService();