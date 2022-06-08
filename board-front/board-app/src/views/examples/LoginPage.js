/*!

=========================================================
* Paper Kit React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import MemberService from "service/MemberService";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint, faLock } from '@fortawesome/free-solid-svg-icons'
import VeginFooter from "components/Footers/VeginFooter";

/* 로그인 페이지 */
class LoginPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  /* 아이디 입력 */
  setUsernameHandler = (e) => {
    this.setState({ username: e.target.value });
  };

  /* 비밀번호 입력 */
  setPasswordHandler = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <>
        <IndexNavbar />
        <div className="login-main">
          <div className="filter" />
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" lg="4">
                <Card className="card-register login ml-auto mr-auto" style={{ backgroundColor: "white" }}>
                  <h3 className="login-title">LOGIN</h3>
                  <Form className="register-form">
                    {/* 아이디 입력 */}
                    <div className="login-group">
                      <span className="login-icon"> <FontAwesomeIcon icon={faFingerprint} /> </span>
                      <Input className='input-login' placeholder="ID" type="text" id="username" onChange={this.setUsernameHandler} />
                    </div>
                    {/* 비밀번호 입력 */}
                    <div className="login-group">
                      <span className="login-icon"> <FontAwesomeIcon icon={faLock} /> </span>
                      <Input className='input-login' placeholder="Password" type="password" id="password" onChange={this.setPasswordHandler} />
                    </div>
                    {/* 로그인 버튼 */}
                    <Button block className="login-btn" onClick={() =>
                      /* 로그인 요청 */
                      MemberService.login(this.state.username, this.state.password)
                        .then(res => {
                          console.log(res.data);
                            this.props.history.push("/index")
                          })
                        .catch(error => alert('아이디 혹은 비밀번호를 확인하세요.'))}>
                      LOGIN
                    </Button>
                  </Form>
                  <div className="otherbtns" >
                    {/* 회원가입 */}
                    <Button
                      className="signup-btn"
                      color="danger"
                      href="/join-page"
                      onClick={(e) => window.location.href = "/join-page"}
                    >
                      SIGN UP
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <VeginFooter />
      </>
    );
  }
}

export default LoginPage;
