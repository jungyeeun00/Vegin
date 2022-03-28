import React, { Component } from 'react';

import {
    Container,
    Row,
    Col,
    Button,
} from "reactstrap";

class ShopInfo extends Component {
    render() {
        return (
            <>
                <div class="shop-info-wrap">
                    <div class="shop-info-items">
                        <div class="shop-info-item left">
                            <div class="shop-info-image">
                                <img id="shopImg" className="item-img" alt="shop_img" src={require("assets/img/shop_item.jpg")} />
                            </div>
                        </div>
                        <div className="shop-info-item right">
                            <div className="shop-info-text">
                                <Container>
                                    <Row style={{ height: '75px'}}>
                                        <Col>
                                            <div>
                                                <h3 className="product-name">상품명</h3>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="price-row" style={{ height: '75px'}}>
                                        <Col>
                                            <div className="product-price">
                                                <span>16,900원</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row style={{ height: '120px'}}>
                                        <Col md="4" className="text-center text-md-left">
                                            <div className="delivery">
                                                <span>배송안내</span>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="delivery-info">
                                                3,000원 <br /> 3만원 이상 구매시 무료배송
                                            </div>
                                            <div className="delivery-info">
                                                평일 오후 13:00 이전 결제시 당일 발송 <br />
                                                ( 단, 주문량 증가 시 달라질 수 있습니다. )
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row style={{ height: '40px'}}>
                                        <Col>
                                            <div className="option-choice">
                                                옵션 선택
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="choice-row" style={{ height: '55px' }}>
                                        <Col md="4">
                                            <div className="choice">
                                                선택
                                            </div>
                                        </Col>
                                        <Col>
                                            <div 
                                                className="choice-btn-group btn-group" 
                                                role="group" 
                                                aria-label="Choice Buttons"
                                            >
                                                <Button type="button" className="choice-btn btn-secondary">choice1</Button>
                                                <Button type="button" className="choice-btn btn-secondary">choice2</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="option-row" style={{ height: '55px' }}>
                                        <Col md="4">
                                            <div className="option">
                                                옵션
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="option-btns">
                                                <Button type="button" className="option-btn btn-secondary">1</Button>
                                                <Button type="button" className="option-btn btn-secondary">2</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="product-total" style={{ height: '50px' }}>
                                        <Col md="4">
                                            총 상품 금액
                                        </Col>
                                        <Col className="text-center text-md-right">
                                            <span>0</span> 원
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    </div >
                    <div className="product-btns">
                        <Button
                            className="cart-btn btn-round"
                            outline
                            type="button"
                        >
                            장바구니 담기
                        </Button>
                        <Button 
                            className="buy-btn btn-round"
                            outline
                            type="button"
                        >
                            바로 구매하기
                        </Button>
                    </div>
                </div >
            </>
        );
    }
}

export default ShopInfo;