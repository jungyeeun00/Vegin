import axios from 'axios'; 

const MYPAGE_API_BASE_URL = "http://localhost:8080"; /* 마이페이지 URL */

/* 마이페이지 관리 */
class MyPageService {
    /* 관심상품 목록 조회 */
    getLikeList(memberId) {
        return axios.get(MYPAGE_API_BASE_URL +  "/likes" + "?memberId="+ memberId)
    }
}

export default new MyPageService();