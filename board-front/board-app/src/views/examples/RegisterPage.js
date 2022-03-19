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

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

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
      {/* <ExamplesNavbar /> */}
      {/* <div
        className="page-header"
        style={{
          backgroundImage:
            "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      > */}
        <div className="filter"/>
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto" style={{backgroundColor: "white"}}>
                <h3 className="title mx-auto">
                  <img className="login_logo" alt="login_logo" src={require("assets/img/login_logo.png")} style={{width : '250px'}} />
                </h3>
               
                <Form className="register-form">
                  {/* <label>Email</label> */}
                  <Input placeholder="Email" type="text" />
                 {/* <label>Password</label> */}
                  <Input placeholder="Password" type="password" /> 
                  <Button block className="btn-round" 
                    style={{
                      backgroundColor: "#4A8451", 
                      border : 'none'
                      }}>
                    LOGIN
                  </Button>

                </Form>
                <div className="otherbtns" >
                  <Button
                    className="btn-link"
                    style={{
                      fontWeight : '500',
                      marginLeft : '20px',
                      display : "inline"
                    }}
                    color="danger"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    SIGN UP
                  </Button>
                  <Button
                    className="btn-link"
                    style={{
                      fontWeight : '500',
                      marginLeft : '20px',
                      display : "inline"
                    }}
                    color="danger"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot password?
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by Creative Tim
          </h6>
        </div>
      {/* </div> */}
    </>
  );
}

export default RegisterPage;
