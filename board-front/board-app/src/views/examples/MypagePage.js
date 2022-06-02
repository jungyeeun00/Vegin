import React, { useEffect, useState } from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import VeginFooter from "components/Footers/VeginFooter";
import { Button,  Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faCreditCard, faHeart, faCartShopping, faPenToSquare, faPencilSquare, faPencil } from '@fortawesome/free-solid-svg-icons'

import MemberService from "service/MemberService";

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
        // console.log("load"+localStorage.getItem("member"));
        MemberService.getOneMember(localStorage.getItem("member")).then((res) => {
            // console.log(res);
            res.data.createdDate = res.data.createdDate.substring(0, 4) + "."
                + res.data.createdDate.substring(5, 7) + "." + res.data.createdDate.substring(8, 10);
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
                            <div onClick={() => window.location.href = '/edit-profile'}> <FontAwesomeIcon icon={faPencil} /> 회원정보 변경 </div>
                        </Col>
                        
                        <Col className="mypage-cart">
                            <div onClick={() => window.location.href="/cart"}> <FontAwesomeIcon icon={faCartShopping} /> 장바구니 </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mypage-like">
                            <div onClick={() => window.location.href="/likes"}> <FontAwesomeIcon icon={faHeart} /> 관심 상품 </div>
                        </Col>

                        <Col className="mypage-post">
                            <div onClick={() => window.location.href = '/mypost-page'}> <FontAwesomeIcon icon={faPenToSquare} /> 내 글 목록 </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <VeginFooter />
        </>
    );
}

export default MypagePage;