import axios from 'axios';
import qs from 'qs';

const LOGIN_API_BASE_URL = "http://localhost:8080/member/login";    /* 로그인 URL */
const SIGNUP_API_BASE_URL = "http://localhost:8080/member/signup";  /* 회원가입 URL */
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'

/* 회원 관리 */
class MemberService {
    /* 로그인 */
    login(username, password) {
        const axiosConfig = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }

        return axios.post(LOGIN_API_BASE_URL,
            qs.stringify({ username: username, password: password }),
            axiosConfig)
            .then(localStorage.setItem("member", username))
            .catch(err => console.log(err));
    }

    /* 로그아웃 */
    logout() {
        localStorage.removeItem("member");
    }

    /* 특정 회원 조회 */
    getOneMember(id){
        return axios.get(LOGIN_API_BASE_URL+"/"+id);
    }

    /* 회원 정보 변경 */
    updateMember(id, member){
        return axios.put(LOGIN_API_BASE_URL+"/"+id, member);
    }

    /* 현재 로그인 한 회원 조회 */
    getCurrentMember() {
        return localStorage.getItem("member");
    }

    /* 회원가입 */
    signup(memberDto) {
        return axios.post(SIGNUP_API_BASE_URL, memberDto);
    }
}

export default new MemberService();