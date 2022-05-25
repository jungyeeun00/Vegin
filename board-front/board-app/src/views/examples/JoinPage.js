import React from 'react';
import { Button, Card, Form, Input, InputGroup, InputGroupText, Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faHouse, faCakeCandles } from '@fortawesome/free-solid-svg-icons'
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import MemberService from "service/MemberService";
import VeginFooter from "components/Footers/VeginFooter";


function JoinPage() {
    document.documentElement.classList.remove("nav-open");

    return (
        <>
            <IndexNavbar />
            <div className="join-main">
                <div className="filter" />
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto" lg="4">
                            <Card className="card-register join ml-auto mr-auto" style={{ backgroundColor: "white" }}>
                                {/* <h3 className="title mx-auto">
                  <img className="login_logo" alt="login_logo" src={require("assets/img/login_logo.png")} style={{ width: '250px' }} />
                </h3> */}
                                <h3 className="join-title">JOIN</h3>
                                <Form className="register-form">
                                    <div className="join-group">
                                        <span className="join-icon"> <FontAwesomeIcon icon={faUser} /> <text>이름</text> </span>
                                        <Input className='input-join' placeholder="Name" type="text" id="realname" />
                                    </div>
                                    <div className="join-group">
                                        <span className="join-icon"> <FontAwesomeIcon icon={faEnvelope} /> <text>이메일</text> </span>
                                        <Input className='input-join' placeholder="Email" type="email" id="username" />
                                    </div>
                                    <div className="join-group">
                                        <span className="join-icon"> <FontAwesomeIcon icon={faLock} /> <text>비밀번호</text> </span>
                                        <Input className='input-join' placeholder="Password" type="password" id="password" />
                                    </div>
                                    <div className="join-group">
                                        <span className="join-icon"> <FontAwesomeIcon icon={faPhone} /> <text>전화번호</text> </span>
                                        <Input className='input-join' placeholder="Phone" type="text" id="phone" />
                                    </div>
                                    <div className="join-group">
                                        <span className="join-icon"> <FontAwesomeIcon icon={faHouse} /> <text>주소</text> </span>
                                        <Input className='input-join' placeholder="Address" type="text" id="address" />
                                    </div>
                                    <div className="join-group">
                                        <span className="join-icon"> <FontAwesomeIcon icon={faCakeCandles} /> <text>생년월일</text> </span>
                                        <Input className='input-join' placeholder="Birthday" type="date" id="birthday" />
                                    </div>
                                    <Button block className="join-btn" onClick={MemberService.signup}>
                                            Join
                                    </Button>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <VeginFooter />
        </>
    );
}

export default JoinPage;