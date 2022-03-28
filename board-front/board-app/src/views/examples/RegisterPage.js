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
import React from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";

// reactstrap components
import { Button, Card, Form, Input, InputGroup, InputGroupText, Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import VeginFooter from "components/Footers/VeginFooter";

function RegisterPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
  return (
    <>
      <IndexNavbar />
      <div className="login-main">
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register login ml-auto mr-auto" style={{ backgroundColor: "white" }}>
                {/* <h3 className="title mx-auto">
                  <img className="login_logo" alt="login_logo" src={require("assets/img/login_logo.png")} style={{ width: '250px' }} />
                </h3> */}
                <h3 className="login-title">LOGIN</h3>
                <Form className="register-form">
                  <div className="login-group">
                    <span className="login-icon"> <FontAwesomeIcon icon={faEnvelope} /> </span>
                    <Input className='input-login' placeholder="Email" type="text" />
                  </div>
                  <div className="login-group">
                    <span className="login-icon"> <FontAwesomeIcon icon={faLock} /> </span>
                    <Input className='input-login' placeholder="Password" type="text" />
                  </div>
                  <Button block className="login-btn">
                    LOGIN
                  </Button>
                </Form>
                <div className="otherbtns" >
                  <Button
                    className="signup-btn"
                    color="danger"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()} >
                    SIGN UP
                  </Button>
                  <Button
                    className="findpwd-btn"
                    color="danger"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}  >
                    Forgot password?
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <VeginFooter/>
    </>
  );
}

export default RegisterPage;
