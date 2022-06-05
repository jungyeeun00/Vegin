import React, { Component } from 'react';
import { Button, Card, Form, Input, Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFingerprint, faEnvelope, faLock, faPhone, faHouse, faCakeCandles } from '@fortawesome/free-solid-svg-icons'
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import MemberService from "service/MemberService";
import VeginFooter from "components/Footers/VeginFooter";

/* 회원 정보 변경 페이지 */
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
            birthday: '',
            createdDate: ''
        }
    }

    componentDidMount() {
        /* 현재 로그인 한 회원 조회 */
        MemberService.getOneMember(localStorage.getItem("member")).then((res) => {
            console.log(res);
            this.setState({
                id: res.data.id,
                email: res.data.email,
                name: res.data.name,
                phone: res.data.phone,
                address: res.data.address,
                birthday: res.data.birthday,
                createdDate: res.data.createdDate
            })
        })
    }

    /* 이메일 변경 */
    setEmailHandler = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    /* 비밀번호 변경 */
    setPasswordHandler = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    /* 이름 변경 */
    setNameHandler = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    /* 전화번호 변경 */
    setPhoneHandler = (e) => {
        this.setState({
            phone: e.target.value
        });
    }

    /* 주소 변경 */
    setAddressHandler = (e) => {
        this.setState({
            address: e.target.value
        });
    }

    /* 생년월일 변경 */
    setBirthdayHandler = (e) => {
        this.setState({
            birthday: e.target.value
        });
    }

    /* 비밀번호 유효성 검사 */
    checkPassword = (password) => {
        const regExp = /(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}/g;
        if (regExp.test(password))
            return true;
        else
            return false;
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
                                    <h3 className="join-title">회원정보 수정</h3>
                                    <Form className="register-form">
                                        {/* 이름 수정 */}
                                        <div className="join-group" id='bottom-name'>
                                            <span className="join-icon"> <FontAwesomeIcon icon={faUser} /> <text>이름</text> </span>
                                            <Input className='input-join' placeholder="Name" type="text" id="name" value={this.state.name} onChange={this.setNameHandler} />
                                        </div>
                                        <UncontrolledTooltip placement="top" target="bottom-name" delay={0}>
                                        2자 이상 16자 이하로 입력하시오
                                        </UncontrolledTooltip>
                                        {/* 아이디 수정 불가 */}
                                        <div className="join-group" id='bottom-id'>
                                            <span className="join-icon"> <FontAwesomeIcon icon={faFingerprint} /> <text>아이디</text> </span>
                                            <Input className='input-join' placeholder="ID" type="text" id="id" value={this.state.id} style={{pointerEvents:'none'}}/>
                                        </div>
                                        <UncontrolledTooltip placement="top" target="bottom-id" delay={0}>
                                        아이디는 변경 불가합니다
                                        </UncontrolledTooltip>
                                        {/* 이메일 수정 */}
                                        <div className="join-group" id='bottom-email'>
                                            <span className="join-icon"> <FontAwesomeIcon icon={faEnvelope} /> <text>이메일</text> </span>
                                            <Input className='input-join' placeholder="Email" type="email" id="username" value={this.state.email} onChange={this.setEmailHandler} />
                                        </div>
                                        <UncontrolledTooltip placement="top" target="bottom-email" delay={0}>
                                        @을 포함한 이메일을 입력하시오
                                        </UncontrolledTooltip>
                                        {/* 비밀번호 수정 */}
                                        <div className="join-group" id='bottom-password'>
                                            <span className="join-icon"> <FontAwesomeIcon icon={faLock} /> <text>비밀번호</text> </span>
                                            <Input className='input-join' placeholder="Password" type="password" id="password" onChange={this.setPasswordHandler} />
                                        </div>
                                        <UncontrolledTooltip placement="top" target="bottom-password" delay={0} style={{ width: "200px" }}>
                                            영문, 숫자, 특수문자(!@#$%^&*)를 조합하여 8-20자로 입력하시오
                                        </UncontrolledTooltip>
                                        {/* 전화번호 수정 */}
                                        <div className="join-group" id='bottom-phone'>
                                            <span className="join-icon"> <FontAwesomeIcon icon={faPhone} /> <text>전화번호</text> </span>
                                            <Input className='input-join' placeholder="Phone" type="text" id="phone" value={this.state.phone} onChange={this.setPhoneHandler} />
                                        </div>
                                        <UncontrolledTooltip placement="top" target="bottom-phone" delay={0}>
                                        -을 포함한 전화번호를 입력하시오
                                        </UncontrolledTooltip>
                                        {/* 주소 수정 */}
                                        <div className="join-group">
                                            <span className="join-icon"> <FontAwesomeIcon icon={faHouse} /> <text>주소</text> </span>
                                            <Input className='input-join' placeholder="Address" type="text" id="address" value={this.state.address} onChange={this.setAddressHandler} />
                                        </div>
                                        {/* 생년월일 수정 */}
                                        <div className="join-group">
                                            <span className="join-icon"> <FontAwesomeIcon icon={faCakeCandles} /> <text>생년월일</text> </span>
                                            <Input className='input-join' placeholder="Birthday" type="date" id="birthday" value={this.state.birthday} onChange={this.setBirthdayHandler} />
                                        </div>
                                        {/* 회원정보 수정 버튼 */}
                                        <Button block className="join-btn" type='button' onClick={() => {
                                            let memberDto = {
                                                id: this.state.id,
                                                email: this.state.email,
                                                password: this.state.password,
                                                name: this.state.name,
                                                phone: this.state.phone,
                                                address: this.state.address,
                                                birthday: this.state.birthday,
                                                createdDate: this.state.createdDate
                                            };
                                            /* 회원정보 유효성 검사 */
                                            if (memberDto.name == '')
                                                alert("이름을 입력하세요.");
                                            else if (memberDto.password == '')
                                                alert("비밀번호를 입력하세요.");
                                            else if (!this.checkPassword(memberDto.password))
                                                alert("비밀번호를 올바르게 입력하세요.");
                                            else if (memberDto.email == '')
                                                alert("이메일을 입력하세요.");
                                            else if (memberDto.phone == '') 
                                                alert("전화번호를 입력하세요.");
                                            else
                                                /* 변경된 회원 정보 등록 요청 */
                                                MemberService.signup(memberDto)
                                                    .then(res => this.props.history.push("/signup-success"))
                                                    .catch(err => alert("회원정보를 올바르게 입력하세요."));
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