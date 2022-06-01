import React, { Component } from 'react';
import { Button, Card, Form, Input, InputGroup, InputGroupText, Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFingerprint, faLock, faEnvelope, faPhone, faHouse, faCakeCandles } from '@fortawesome/free-solid-svg-icons'
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import MemberService from "service/MemberService";
import VeginFooter from "components/Footers/VeginFooter";


class JoinPage extends Component {
    //document.documentElement.classList.remove("nav-open");

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            password: '',
            name: '',
            phone: '',
            address: '',
            birthday: ''
        }
    }

    setIdHandler = (e) => {
        this.setState({
            id: e.target.value
        });
    }

    setEmailHandler = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    setPasswordHandler = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    setNameHandler = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    setPhoneHandler = (e) => {
        this.setState({
            phone: e.target.value
        });
    }

    setAddressHandler = (e) => {
        this.setState({
            address: e.target.value
        });
    }

    setBirthdayHandler = (e) => {
        this.setState({
            birthday: e.target.value
        });
    }

    // componentDidMount() {
    //     MemberService.signup(memberDto).then((res) => {
    //         this.setState({
    //             p_num: res.data.pagingData.currentPageNum,
    //             paging: res.data.pagingData,
    //             boards: res.data.list
    //         });
    //     });
    // }

    render() {
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
                                            <Input className='input-join' placeholder="Name" type="text" id="name" onChange={this.setNameHandler} />
                                        </div>
                                        <div className="join-group">
                                            <span className="join-icon"> <FontAwesomeIcon icon={faFingerprint} /> <text>아이디</text> </span>
                                            <Input className='input-join' placeholder="ID" type="text" id="id" onChange={this.setIdHandler} />
                                        </div>
                                        <div className="join-group">
                                            <span className="join-icon"> <FontAwesomeIcon icon={faLock} /> <text>비밀번호</text> </span>
                                            <Input className='input-join' placeholder="Password" type="password" id="password" onChange={this.setPasswordHandler} />
                                        </div>
                                        <div className="join-group">
                                            <span className="join-icon"> <FontAwesomeIcon icon={faEnvelope} /> <text>이메일</text> </span>
                                            <Input className='input-join' placeholder="Email" type="email" id="username"  onChange={this.setEmailHandler} />
                                        </div> 
                                        <div className="join-group">
                                            <span className="join-icon"> <FontAwesomeIcon icon={faPhone} /> <text>전화번호</text> </span>
                                            <Input className='input-join' placeholder="Phone" type="text" id="phone" onChange={this.setPhoneHandler} />
                                        </div>
                                        <div className="join-group">
                                            <span className="join-icon"> <FontAwesomeIcon icon={faHouse} /> <text>주소</text> </span>
                                            <Input className='input-join' placeholder="Address" type="text" id="address" onChange={this.setAddressHandler} />
                                        </div>
                                        <div className="join-group">
                                            <span className="join-icon"> <FontAwesomeIcon icon={faCakeCandles} /> <text>생년월일</text> </span>
                                            <Input className='input-join' placeholder="Birthday" type="date" id="birthday" onChange={this.setBirthdayHandler} />
                                        </div>
                                        <Button block className="join-btn" onClick={() => {
                                            let memberDto = {
                                                id: this.state.id,
                                                email: this.state.email,
                                                password: this.state.password,
                                                name: this.state.name,
                                                phone: this.state.phone,
                                                address: this.state.address,
                                                birthday: this.state.birthday
                                            };
                                            MemberService.signup(memberDto);
                                            }}>
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
}

export default JoinPage;