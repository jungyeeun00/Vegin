import axios from 'axios';
import qs from 'qs';

const LOGIN_API_BASE_URL = "http://localhost:8080/member/login";
const SIGNUP_API_BASE_URL = "http://localhost:8080/member/signup";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'

class MemberService {
    
    login(username, password) {

        const axiosConfig = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }

        return axios.post(LOGIN_API_BASE_URL,
            qs.stringify({ username: username, password: password }),
            axiosConfig)
            .then(localStorage.setItem("member", JSON.stringify(username)))
            .catch(err => console.log(err));
    }

    logout() {
        localStorage.removeItem("member");
    }

    getCurrentMember() {
        return JSON.parse(localStorage.getItem("member"));
    }

    signup(memberDto) {
        return axios.post(SIGNUP_API_BASE_URL, memberDto);
    }
}

export default new MemberService();