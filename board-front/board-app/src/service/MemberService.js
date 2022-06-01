import axios from 'axios';
import { noConflict } from 'lodash';
import qs from 'qs';

const LOGIN_API_BASE_URL = "http://localhost:8080/member/login";
const SIGNUP_API_BASE_URL = "http://localhost:8080/member/signup";
const UPDATE_API_BASE_URL = "http://localhost:8080/member/list";
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
            .then(localStorage.setItem("member", username))
            .catch(err => console.log(err));
    }

    logout() {
        localStorage.removeItem("member");
    }

    getOneMember(id){
        return axios.get(LOGIN_API_BASE_URL+"/"+id);
    }

    updateMember(id, member){
        return axios.put(LOGIN_API_BASE_URL+"/"+id, member);
    }

    getCurrentMember() {
        return localStorage.getItem("member");
    }

    signup(memberDto) {
        return axios.post(SIGNUP_API_BASE_URL, memberDto);
    }
}

export default new MemberService();