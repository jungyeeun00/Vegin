import axios from 'axios';

const LOGIN_API_BASE_URL = "http://localhost:8080/member/login";
const SIGNUP_API_BASE_URL = "http://localhost:8080/member/signup";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'

class MemberService {
    // login = () => {
    //     fetch(LOGIN_API_BASE_URL)
    // }

    login(username, password) {
        // const username = document.getElementById("username");
        // const password = document.getElementById("password");
        
        return axios.get(LOGIN_API_BASE_URL, username, password);


        // axios({
        //     method: "POST",
        //     url: LOGIN_API_BASE_URL,
        //     data: {
        //         "username": username.value,
        //         "password": password.value
        //     },
        //     headers: {
                
        //     }
        // }).then((res) => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err);
        //     console.log(username.value);
        // })

        // return axios
        //     .post(LOGIN_API_BASE_URL, {
        //         username,
        //         password
        //     })
        //     .then(res => {
        //         if (res.data.accessToken) {
        //             localStorage.setItem("member", JSON.stringify(res.data))
        //         }

        //         return res.data;
        //     });
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