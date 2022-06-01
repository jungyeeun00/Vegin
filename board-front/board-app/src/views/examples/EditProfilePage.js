import React, { Component } from 'react';
import { Button, Card, Form, Input, InputGroup, InputGroupText, Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faHouse, faCakeCandles } from '@fortawesome/free-solid-svg-icons'
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import MemberService from "service/MemberService";
import VeginFooter from "components/Footers/VeginFooter";
import { faIdCard } from '@fortawesome/free-regular-svg-icons';


class EditProfilePage extends Component {

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

    componentDidMount(){
        MemberService.getOneMember(localStorage.getItem("member")).then((res) => {
            console.log(res);
            this.setState({
                id: res.data.id,
                email: res.data.email,
                name: res.data.name,
                phone: res.data.phone,
                address: res.data.address,
                birthday: res.data.birthday
            })
        })
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

    render() {
        return (
            <>
                <IndexNavbar />
                <div className="join-main">
                    <div className="filter" />
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto">
                                <Card className="card-register join ml-auto mr-auto" style={{ backgroundColor: "white" }}>
                                    {/* <h3 className="title mx-auto">
                    <img className="login_logo" alt="login_logo" src={require("assets/img/login_logo.png")} style={{ width: '250px' }} />
                    </h3> */}
                                    <h3 className="join-title">회원정보 수정</h3>
                                    <Form className="register-form">
                                        <div className="join-group" id='bottom-name'>
                                            <span className="join-icon"> <FontAwesomeIcon icon={faUser} /> <text>이름</text> </span>
                                            <Input className='input-join' placeholder="Name" type="text" id="name" value={this.state.name} onChange={this.setNameHandler} />
                                        </div>
                                        <UncontrolledTooltip placement="top" target="bottom-name" delay={0}>
                                        2자 이상 16자 이하로 입력하시오
                                        </UncontrolledTooltip>
                                        <div className="join-group" id='bottom-id'>
                                            <span className="join-icon"> <FontAwesomeIcon icon={faIdCard} /> <text>아이디</text> </span>
                                            <Input className='input-join' placeholder="ID" type="text" id="id" value={this.state.id} style={{pointerEvents:'none'}}/>
                                        </div>
                                        <UncontrolledTooltip placement="top" target="bottom-id" delay={0}>
                                        아이디는 변경 불가합니다
                                        </UncontrolledTooltip>
                                        <div className="join-group" id='bottom-email'>
                                            <span className="join-icon"> <FontAwesomeIcon icon={faEnvelope} /> <text>이메일</text> </span>
                                            <Input className='input-join' placeholder="Email" type="email" id="username" value={this.state.email} onChange={this.setEmailHandler} />
                                        </div>
                                        <UncontrolledTooltip placement="top" target="bottom-email" delay={0}>
                                        @을 포함한 이메일을 입력하시오
                                        </UncontrolledTooltip>
                                        <div className="join-group">
                                            <span className="join-icon"> <FontAwesomeIcon icon={faLock} /> <text>비밀번호</text> </span>
                                            <Input className='input-join' placeholder="Password" type="password" id="password" onChange={this.setPasswordHandler} />
                                        </div>
                                        <div className="join-group" id='bottom-phone'>
                                            <span className="join-icon"> <FontAwesomeIcon icon={faPhone} /> <text>전화번호</text> </span>
                                            <Input className='input-join' placeholder="Phone" type="text" id="phone" value={this.state.phone} onChange={this.setPhoneHandler} />
                                        </div>
                                        <UncontrolledTooltip placement="top" target="bottom-phone" delay={0}>
                                        -을 포함한 전화번호를 입력하시오
                                        </UncontrolledTooltip>
                                        <div className="join-group">
                                            <span className="join-icon"> <FontAwesomeIcon icon={faHouse} /> <text>주소</text> </span>
                                            <Input className='input-join' placeholder="Address" type="text" id="address" value={this.state.address} onChange={this.setAddressHandler} />
                                        </div>
                                        <div className="join-group">
                                            <span className="join-icon"> <FontAwesomeIcon icon={faCakeCandles} /> <text>생년월일</text> </span>
                                            <Input className='input-join' placeholder="Birthday" type="date" id="birthday" value={this.state.birthday} onChange={this.setBirthdayHandler} />
                                        </div>
                                        <Button block className="join-btn" type='button' onClick={() => {
                                            let memberDto = {
                                                id: this.state.id,
                                                email: this.state.email,
                                                password: this.state.password,
                                                name: this.state.name,
                                                phone: this.state.phone,
                                                address: this.state.address,
                                                birthday: this.state.birthday
                                            };
                                            MemberService.signup(memberDto)
                                            .then(res => this.props.history.push("/signup-success"))
                                            }}>
                                            Edit
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

export default EditProfilePage;