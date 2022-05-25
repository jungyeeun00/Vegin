import React from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import VeginFooter from "components/Footers/VeginFooter";
import { Button, Card, Form, Input, InputGroup, InputGroupText, Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faCreditCard, faHeart, faCartShopping, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import MemberService from "service/MemberService";
import { NavLink } from "react-router-dom";

function MypagePage() {
    const [activeTab, setActiveTab] = React.useState("1");

    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("landing-page");
        return function cleanup() {
            document.body.classList.remove("landing-page");
        };
    });
    return (
        <>
            <IndexNavbar />

            <div className="section mypage">
                <Container className="mypage-container">
                    <Row>
                        <Col className="mypage-info">
                            <div> <FontAwesomeIcon icon={faCircleUser} /> 이름 </div>
                            <div className="info-text">
                                <div> 아이디: vegin123 </div>
                                <div> 전화번호: 010-1234-5678 </div>
                                <div> 주소: 서울특별시 성북구 삼선교로16길 116 한성대학교 </div>
                                <div> 가입일: 2022.05.07 </div>
                            </div>
                            <Button className="info-change-btn">회원정보 변경</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mypage-order">
                            <div> <FontAwesomeIcon icon={faCreditCard} /> 주문 내역 </div>
                        </Col>
                        
                        <Col className="mypage-cart">
                            <div> <FontAwesomeIcon icon={faCartShopping} /> 장바구니 </div>
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