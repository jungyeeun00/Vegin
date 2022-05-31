import React, { useState, useEffect} from "react";
import { useParams, useHistory, useLocation } from "react-router";
import IndexNavbar from 'components/Navbars/IndexNavbar';
import VeginFooter from 'components/Footers/VeginFooter';
import { PagesSharp, ThreeSixtyOutlined } from '@material-ui/icons';
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
import ShopItemOption from '../index-sections/ShopItemOption';

function ProductDetailPage() {
    const history = useHistory();
    const location = useLocation();
    
    const productId = useParams().productId;
    const productName = location.state.productName;
    const soldPrice = location.state.soldPrice;
    const imgSrc = location.state.imgSrc;
    const detail = location.state.detail; 

    const [choices, setChoices] = useState([]);

    const [defoption, setDefOp] = useState([]) // default 옵션

    const [options, setOption] = useState([]); // 선택한 옵션 
    const [sum, setSum] = useState(0); // 선택한 옵션 총 금액

    useEffect(() => {
        ShopService.getChoices(productId)
        .then(res => setChoices(res.data))
        window.scrollTo(0, 0);
        setDefOp(
            { text: productName, num: 0, price: Number(soldPrice), sum: 0 },
        )
    }, []);
   
    const goToList = () => { 
        history.push('/shop-page'); 
    };

    const [activeTab, setActiveTab] = useState("1");
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    //상품 옵션을 선택하면 화면에 elements 추가 렌더링
    const selectOption = (e) => {
        let flag = 0; // 중복 선택 여부 확인 변수
        let opValue = e.target.value.split("\t"); // content, extraCost 탭 문자로 분리
        let price = Number(opValue[1]) + Number(soldPrice); // 추가 금액에 원래 가격 합산
        const _options = options.filter((o) => {
            return o.text !== opValue[0];
        });
        // 이미 선택한 옵션인 경우 팝업 창 뜨도록
        for(let i = 0; i < options.length; i++) {
            if(options[i].text == opValue[0]) {
                flag = 1;
                alert('이미 선택한 옵션입니다.');
                break;
            }
        }
        if(flag == 0) {
            setOption([
                ..._options,
                { productName: productName, text: opValue[0], num: 1, price: price, sum: price },
            ])
            setSum(sum + price); 
        }
    };

   //선택한 옵션의 수량 변경 시 수량 및 가격 반영
    const plusQuantity = (option) => {
        setOption(options);
        setSum(sum + option.price);
        option.num += 1;
        option.sum += option.price;
    };
    const minusQuantity = (option) => {
        if (option.sum > 0 && option.num > 1) {
            setSum(sum - option.price);
            option.num -= 1;
            option.sum -= option.price;
        }
        setOption(options);
    };  //옵션 삭제
    const deleteOption = (target) => {
        const _options = options.filter(o => {
            if (o.text !== target.text) {
                return o;
            }
            setSum(sum - Number(target.sum));
        });
        setOption(_options);
    };

     //장바구니 담기 시 로컬 스토리지에 정보를 저장
    const setSessionStorage = () => {
        const _cart = sessionStorage.getItem("cart");
        if (_cart) {
            const parseCart = JSON.parse(_cart);
            sessionStorage.setItem("cart", JSON.stringify([...parseCart, ...options]));
        } 
        else {
            sessionStorage.setItem("cart", JSON.stringify(options));
        }
        //저장 여부를 알리고 페이지 이동 의사를 묻는 알림창
        // swal({
        // title: "장바구니에 잘 담겼어요!",
        // icon: "success",
        // buttons: {
        //     showCart: { text: "장바구니 이동", value: "showCart" },
        //     cancel: "쇼핑 계속하기",
        // },
        // }).then((value) => {
        // switch (value) {
        //     case "showCart":
        //     history.push("/cart");
        //     break;
        // }
        // });
        console.log("ss")
    }

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
                                { choices.length != 0 
                                ?   //<Row style={{backgroundColor: 'red'}}>
                                    <Row>
                                        <Col md="4" className="option-col text-center text-md-left">
                                            <div className="option-choice">
                                                <span>옵션 선택</span>
                                            </div>
                                        </Col> 
                                        <Col className="option-col">
                                            <select
                                                value='option'
                                                onChange={selectOption}
                                            >
                                                <option value="" >옵션</option>
                                                {
                                                    choices.map(
                                                        choice => 
                                                        <option value={choice.content + "\t" + choice.extraCost}>
                                                            {choice.content}
                                                        </option>
                                                )}
                                            </select>
                                        </Col> 
                                        <Col>

                                        {/* 선택 옵션 */}
                                        {options.length != 0 &&
                                            <div className="option-wrapper">
                                            {
                                                options.map((option, idx) => {
                                                return (
                                                    <ShopItemOption 
                                                    option={option} idx={idx}
                                                    minusQuantity={minusQuantity}
                                                    plusQuantity={plusQuantity}
                                                    deleteOption={deleteOption}/>
                                                );
                                            })}
                                            </div>
                                        }
                                        </Col>
                                    </Row>
                                : 
                                    <Row style={{ height: '200px'}}>
                                          <Col md="4" className="text-center text-md-left">
                                            <div className="option-choice">
                                                <span>수량 선택</span>
                                            </div>
                                            <div className="option-wrapper">
                                           
                                                    <ShopItemOption 
                                                    option={defoption} 
                                                    minusQuantity={minusQuantity}
                                                    plusQuantity={plusQuantity}
                                                    deleteOption={deleteOption}/>
                                              
                                            </div>
                                            </Col> 
                                    </Row>   
                                }

                                <Row className="product-total" style={{ height: '120px' }}>
                                    <Col md="4">
                                        총 상품 금액
                                    </Col>
                                    <Col className="text-center text-md-right">
                                       <span> {sum}원 </span> 
                                    </Col>
                                </Row>

                                <div className="product-btns">
                                <Button
                                    className="cart-btn btn-round"
                                    outline
                                    type="button"
                                    onClick={setSessionStorage}
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
                            </Container>
                        </div>
                        
                    </div>
                    
                </div > 
               

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
                        <div className="snt-detail-wrapper">
                          <div style={{whiteSpace: 'pre-wrap'}}>{detail}</div>
                        </div>
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