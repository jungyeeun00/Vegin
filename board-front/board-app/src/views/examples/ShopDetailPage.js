import React, { useState, useEffect} from "react";
import { useParams, useHistory, useLocation } from "react-router";
import IndexNavbar from 'components/Navbars/IndexNavbar';
import ShopNavTab from "../index-sections/ShopNavTab";
import VeginFooter from 'components/Footers/VeginFooter';
import { ThreeSixtyOutlined } from '@material-ui/icons';
import ShopService from 'service/ShopService';
import {
    Container,
    Row,
    Col,
    Button,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
} from "reactstrap";
import ProductInquiry from "../index-sections/ProductInquiry";
import Reviews from "../index-sections/Reviews";


function ProductDetailPage() {
    const history = useHistory();
    const location = useLocation();
    
    const productId = useParams().productId;
    const productName = location.state.productName;
    const soldPrice = location.state.soldPrice;
    const imgSrc = location.state.imgSrc;
    const detail = location.state.detail; 

    const [choices, setChoices] = useState([]);

    useEffect(() => {
        ShopService.getChoices(productId)
        .then(res => setChoices(res.data))
        window.scrollTo(0, 0);
    }, []);
    console.log(choices)
   
    const goToList = () => { 
        history.push('/shop-page'); 
    };

    const [activeTab, setActiveTab] = useState("1");
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };


    return (
        <>
            <IndexNavbar />
            {/* shopInfo */}
            <div className="shop-info-wrap">
                <div className="shop-info-items">
                    <div className="shop-info-item left">
                        <div className="shop-info-image">
                            <img id="shopImg" className="item-img" alt="shop_img" src={imgSrc} />
                        </div>
                    </div>
                    <div className="shop-info-item right">
                        <div className="shop-info-text">
                            <Container>
                                <Row style={{ height: '75px'}}>
                                    <Col>
                                        <div>
                                            <h3 className="product-name">{productName}</h3>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="price-row" style={{ height: '75px'}}>
                                    <Col>
                                        <div className="product-price">
                                            <span>{soldPrice}</span>
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
                                {/* 옵션 있는 경우만 출력 */}
                                { choices.length != 0 &&
                                    <Row style={{ height: '120px'}}>
                                    
                                        <Col md="4" className="text-center text-md-left">
                                            <div className="option-choice">
                                                <span>옵션 선택</span>
                                            </div>
                                        </Col> 
                                        <Col>
                                            <select
                                                value='option'
                                                // onChange={(e) =>
                                                //     setForm({ ...form, day: e.target.value })
                                                // }
                                            >
                                                <option value="" selected>옵션</option>
                                                {
                                                    choices.map(
                                                        choice => 
                                                        <option value={choice.choiceId}>
                                                            {choice.content}
                                                        </option>
                                                )}
                                            </select>
                                        </Col> 
                                    </Row>

                            
                                }

                                <Row className="product-total" style={{ height: '120px' }}>
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
           
            {/* <ShopNavTab /> */}
            <div className="navtab-section">
                <div className="nav-tabs-navigation">
                    <div className="nav-tabs-wrapper">
                        <Nav id="tabs" role="tablist" tabs>
                            <NavItem>
                                <NavLink
                                    className={activeTab === "1" ? "active" : ""}
                                    onClick={() => {
                                        toggle("1");
                                    }}
                                >
                                    상품문의
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={activeTab === "2" ? "active" : ""}
                                    onClick={() => {
                                        toggle("2");
                                    }}
                                >
                                    상품후기
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={activeTab === "3" ? "active" : ""}
                                    onClick={() => {
                                        toggle("3");
                                    }}
                                >
                                    상품문의
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </div>
                <TabContent activeTab={activeTab} className="text-center">
                    <TabPane tabId="1">
                        <p className="snt-detail-wrapper">
                          <div style={{whiteSpace: 'pre-wrap'}}>{detail}</div>
                        </p>
                    </TabPane>
                    <TabPane tabId="2">
                        < Reviews />
                    </TabPane>
                    <TabPane tabId="3">
                        < ProductInquiry />
                    </TabPane>
                </TabContent>
            </div>{" "}

            <div className="btn-list">
                <button type="button" className="btn-round btn"
                    onClick={goToList}> 목록 </button>
            </div>
            <VeginFooter />
        </>
    );
}


export default ProductDetailPage;