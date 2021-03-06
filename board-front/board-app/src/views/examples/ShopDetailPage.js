import VeginFooter from 'components/Footers/VeginFooter';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import {
    Button, Col, Container, Nav, NavItem,
    NavLink, Row, TabContent,
    TabPane
} from "reactstrap";
import ShopService from 'service/ShopService';
import ProductInquiry from "../index-sections/ProductInquiry";
import Reviews from "../index-sections/Reviews";
import ShopItemOption from '../index-sections/ShopItemOption';

function ProductDetailPage() {
    const history = useHistory();
    const location = useLocation();
    
    const productId = useParams().productId;
    const productName = location.state.productName;
    const soldPrice = location.state.soldPrice;
    const regPrice = location.state.regPrice;
    const saleRate = location.state.saleRate;
    const imgSrc = location.state.imgSrc;
    const detail = location.state.detail; 

    const [choices, setChoices] = useState([]);

    const [defoption, setDefOp] = useState([]) // default 옵션
    const [options, setOption] = useState([]); // 선택한 옵션 
    const [sum, setSum] = useState(0); // 선택한 옵션 총 금액
    const [noOpFlag, setNoOpFlag] = useState(1); // 옵션 없는 경우 체크 변수(1은 옵션 없음 0은 옵션 있음)

    useEffect(() => {
        ShopService.getChoices(productId)
        .then(res => setChoices(res.data))
        window.scrollTo(0, 0);
        setDefOp(
             { productName: productName, num: 0, price: Number(soldPrice), sum: 0 , id: 0, choiceId: -1, productId: productId }, 
        )
        setNoOpFlag(1);
        setSum(0);
    }, []);
    
   /* 상품 리스트로 돌아가기 위해 경로 저장 */
    const goToList = () => { 
        history.push('/shop-page'); 
    };

    const [activeTab, setActiveTab] = useState("1");
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    /* 상품 옵션을 선택하면 화면에 elements 추가 렌더링 */
    const selectOption = (e) => {
        setNoOpFlag(0);

        let flag = 0; // 중복 선택 여부 확인 변수
        let opValue = e.target.value.split("\t"); // content, extraCost 탭 문자로 분리
        let price = Number(opValue[2]) + Number(soldPrice); // 추가 금액에 원래 가격 합산
        const _options = options.filter((o) => {
            return o.option !== opValue[0];
        });
        // 이미 선택한 옵션인 경우 팝업 창 뜨도록
        for(let i = 0; i < options.length; i++) {
            if(options[i].option === opValue[0]) {
                flag = 1;
                alert('이미 선택한 옵션입니다.');
                break;
            }
        }
        if(flag === 0) {
            setOption([
                ..._options,
                { productName: productName, option: opValue[0], num: 1, price: price, regPrice: regPrice, sum: price, id: 0, choiceId: opValue[1] },
            ])
            setSum(sum + price); 
        }
    };

   /* 선택한 옵션의 수량 변경 시 수량 및 가격 반영 */
    const plusQuantity = (option) => {
        setOption(options);
        setSum(sum + option.price);
        option.num += 1;
        //option.sum += option.price;
        option.sum = option.num * option.price;
    };
    const minusQuantity = (option) => {
        if (option.sum > 0 && option.num > 1) {
            setSum(sum - option.price);
            option.num -= 1;
            //option.sum -= option.price;
            option.sum = option.num * option.price;
        }
        setOption(options);
    };  
    
    /* 옵션 삭제 */
    const deleteOption = (target) => {
        const _options = options.filter(o => {
            if (o.option !== target.option) {
                return o;
            }
            setSum(sum - Number(target.sum));
        });
        setOption(_options);
    };

     /* 장바구니 담기 시 로컬 스토리지에 정보 저장 */
    const setSessionStorage = () => {

        if(window.confirm("장바구니로 이동하시겠습니까?")){
            window.location.href = "/cart";
        }
        console.log("noOpFlag " + noOpFlag);
        // 세션 저장
        const _cart = sessionStorage.getItem("cart");
        if (_cart) {
            const _parseCart = JSON.parse(_cart);
            // noOpFlag가 1인 경우는 옵션이 존재하지 않는 상품 
            if(noOpFlag === 1) checkCart(defoption, _parseCart);
            else checkCartOp(options, _parseCart);
        } 
        else { 
            if(noOpFlag === 1) sessionStorage.setItem("cart", JSON.stringify([defoption]));
            else sessionStorage.setItem("cart", JSON.stringify(options));
        }
    }

    /* 옵션이 있는 경우 장바구니 상품 중복 처리 */ 
    const checkCartOp = (checkOption, cartOption) =>{
        const newCartArr = []; 

        checkOption.forEach( check => {
            let ExistenceStatus = cartOption.findIndex(i => i.choiceId === check.choiceId); // 중복 체크 변수
            console.log("status " + ExistenceStatus);

            if (ExistenceStatus === -1) // 중복되는 것이 없으면 그대로 세션에 저장
                newCartArr.push(check); 
            else { // 중복되는 것이 있으면 수량, 가격 변경해서 다시 삽입
                cartOption.forEach(cartop => {
                    if(cartop.choiceId === check.choiceId) {
                        cartop.num += check.num;
                        cartop.sum += check.sum;
                        newCartArr.push(cartop);
                        cartOption = cartOption.filter(c => {
                            return c.choiceId !== check.choiceId})
                    }
                })
            }
            sessionStorage.setItem("cart", JSON.stringify([...cartOption, ...newCartArr]));
        })
    }

     /* 옵션이 있는 경우 장바구니 상품 중복 처리 */ 
    const checkCart = (check, cartOption) => {
        const newCartArr = []; 

        let ExistenceStatus = cartOption.findIndex(i => (i.productId === check.productId)); // 중복 체크 변수
        if (ExistenceStatus === -1) // 중복되는 것이 없으면 그대로 세션에 저장
            newCartArr.push(check);
        else { // 중복되는 것이 있으면 수량, 가격 변경해서 다시 삽입
            cartOption.forEach(cartop => {
                if(cartop.productId === check.productId) {
                    cartop.num += check.num;
                    cartop.sum += check.sum;
                    newCartArr.push(cartop);
                    cartOption = cartOption.filter(c => {
                        return c.choiceId !== check.choiceId})
                }
            })
        }
        sessionStorage.setItem("cart", JSON.stringify([...cartOption, ...newCartArr]));
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
                                            { soldPrice !== regPrice &&
                                                <span>
                                                    <span className="product-saleRate">{saleRate}%</span> 
                                                    <span className="product-regPrice">{regPrice}</span>
                                                </span>
                                            }
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
                                            3,000원 <br />
                                        </div>
                                        <div className="delivery-info">
                                            평일 오후 13:00 이전 결제시 당일 발송 <br />
                                            ( 단, 주문량 증가 시 달라질 수 있습니다. )
                                        </div>
                                    </Col>
                                </Row>
                                {/* 옵션 있는 경우만 출력 */}
                                { choices.length !== 0 
                                ?   <Row>
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
                                                        (choice, index) => 
                                                        !choice.content.includes("품절") &&
                                                        <option value={choice.content + "\t" + choice.choiceId + "\t" + choice.extraCost} key={index}>
                                                            {choice.content}
                                                        </option>
                                                )}
                                            </select>
                                        </Col> 
                                        <Col>

                                        {/* 선택 옵션 */}
                                        {options.length !== 0 &&
                                            <div className="option-wrapper">
                                            {
                                                options.map((option, idx) => {
                                                return (
                                                    <ShopItemOption 
                                                    key={idx}
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
                                    onClick={() => { if(sum === 0) alert("수량을 선택하세요.");
                                                     else setSessionStorage(); }}
                                    
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
                                    상품정보
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
                        < Reviews productId={productId} toggle={toggle}/>
                    </TabPane>
                    <TabPane tabId="3">
                        < ProductInquiry productId={productId} />
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