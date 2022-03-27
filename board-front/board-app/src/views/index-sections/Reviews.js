import React, { Component } from 'react';

import {
    Container,
    Row,
    Col,
} from "reactstrap";

class Reviews extends Component {
    render() {
        return (
            <>
                {/* 리뷰리스트 */}
                <ul className="review-list">
                    <li className="review-item">
                        <Container>
                            <Row style={{ height: '30px' }}>
                                <Col md="3" className="review-user">
                                    <div><span>홍**</span>님의 리뷰입니다</div>
                                </Col>
                                <Col className="review-star">
                                    <div className="star-wrap">
                                        <div className="star-rating">
                                            <span style={{ width: "60%" }}></span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3">
                                </Col>
                                <Col className="review-content">
                                    {/* <div className="review-img"></div> */}
                                    <div className="review-img">
                                        <img alt="review_img" src={require("assets/img/eva.jpg")} />
                                    </div>
                                    <div className="review-text">
                                        나쁘지 않은듯? 아마도?
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </li>
                    <li className="review-item">
                        <Container>
                            <Row style={{ height: '30px' }}>
                                <Col md="3" className="review-user">
                                    <div><span>김**</span>님의 리뷰입니다</div>
                                </Col>
                                <Col className="review-star">
                                    <div className="star-wrap">
                                        <div className="star-rating">
                                            <span style={{ width: "100%" }}></span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3">
                                </Col>
                                <Col className="review-content">
                                    {/* <div className="review-img"></div> */}
                                    <div className="review-text">
                                        진짜 최고. 여러분 제발 여기 사이트 이용하세요. 특히 이 제품.<br/>
                                        한 번 이거 산 뒤로 계속 이 제품만 사용하는 중입니다.<br/>
                                        쓸 말 고갈. 진짜 우리 사이트 최고 짱짱맨<br/>
                                        최고의 비건 사이트 비긴~ 야호~<br/>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </li>
                </ul>
            </>
        );
    }
}

export default Reviews;