import React, { useEffect, useState } from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import VeginFooter from "components/Footers/VeginFooter";
import { Button, Card, Form, Input, InputGroup, InputGroupText, Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faCreditCard, faHeart, faCartShopping, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import MemberService from "service/MemberService";
import { NavLink } from "react-router-dom";

function MypagePage() {
    const [activeTab, setActiveTab] = React.useState("1");
    const [user, setUser] = useState([]);

    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    document.documentElement.classList.remove("nav-open");
    useEffect(() => {
        document.body.classList.add("landing-page");
        console.log("load"+localStorage.getItem("member"));
        MemberService.getOneMember(localStorage.getItem("member")).then((res) => {
            console.log(res);
            setUser(res.data);
        })
        return function cleanup() {
            document.body.classList.remove("landing-page");
        };
    }, []);
    return (
        <>
            <IndexNavbar />
            <div className="section mypage">
                <Container className="mypage-container">
                    <Row>
                    {localStorage.length !== 0 &&
                        <Col className="mypage-info">
                            <div> <FontAwesomeIcon icon={faCircleUser} /> {user.name} </div>
                            <div className="info-text">
                                <div> 아이디: {user.id} </div>
                                <div> 전화번호: {user.phone} </div>
                                <div> 주소: {user.address} </div>
                                <div> 가입일: {user.createdDate} </div>
                            </div>
                            <Button className="info-change-btn">회원정보 변경</Button>
                        </Col>
                    }
                    {localStorage.length === 0 &&
                    <Col className="mypage-info">
                        <Button className="info-change-btn" onClick={() => window.location.href = "/login-page"}>로그인</Button>
                    </Col>
                    }
                    </Row>
                    <Row>
                        <Col className="mypage-order">
                            <div> <FontAwesomeIcon icon={faCreditCard} /> 주문 내역 </div>
                        </Col>
                        
                        <Col className="mypage-cart">
                            <div onClick={() => window.location.href="/cart"}> <FontAwesomeIcon icon={faCartShopping} /> 장바구니 </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mypage-like">
                            <div> <FontAwesomeIcon icon={faHeart} /> 관심 상품 </div>
                        </Col>
                        <Col className="mypage-post">
                            <div> <FontAwesomeIcon icon={faPenToSquare} /> 내 글 목록 </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <VeginFooter />
        </>
    );
}

export default MypagePage;