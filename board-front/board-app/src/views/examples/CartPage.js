import React, { useState } from 'react';
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import VeginFooter from "components/Footers/VeginFooter";
import CartItem from 'views/index-sections/CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEquals, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

function CartPage(props) {
    const [checkItems, setCheckItems] = useState([]);
    const [items, setItems] = useState([
        { id: 1, name: "상품 이름 어쩌구 저쩌구1", option: "옵션1 +4000", quantity: 2, price: 18000 },
        { id: 2, name: "상품 이름 어쩌구 저쩌구2", option: "옵션2 +0", quantity: 1, price: 26000 },
        { id: 3, name: "상품 이름 어쩌구 저쩌구3", option: null, quantity: 1, price: 16000 }
    ]);
    const [totalPrice, setTotalPrice] = useState(0);


    /* 선택된 item들 삭제 */
    const onRemoveMul = (checked) => {
        // item.id 가 일치하지 않는 원소만 추출해서 새로운 배열을 만듦
        // item.id 가 id 인 것을 제거
        var item = items;
        item = items.filter(item => {
            return !checked.includes(item.id)
        });
        setItems(item)

        var checkItem = checkItems;
        checkItem = checkItems.filter(check => {
            return !checked.includes(check)
        });
        setCheckItems(checkItem);
        setTotalPrice(0);
    };

    /* 하나의 item 삭제 */
    const onRemoveOne = (id) => {
        var item = items;
        item = items.filter(item => item.id !== id);
        setItems(item)

        var checkItem = checkItems;
        checkItem = checkItems.filter(check => check !== id);
        setCheckItems(checkItem);
    }

    /* 모든 item 삭제 */
    const onRemoveAll = () => {
        setItems([]);
        setCheckItems([]);
    }

    // 체크박스 전체 단일 개체 선택
    const handleSingleCheck = (checked, id) => {
        console.log("single");
        if (checked) {
            setCheckItems([...checkItems, id]);
            calcTotalPrice(id, true);
        } else {
            // 체크 해제
            setCheckItems(checkItems.filter((check) => check !== id));
            calcTotalPrice(id, false);
        }
    };

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        console.log("all");
        if (checked) {
            const idArray = [];
            // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서,
            // 전체 체크 박스 체크
            var sum = 0;
            items.forEach((item) => {
                idArray.push(item.id);
                sum += item.price * item.quantity;
            });
            setCheckItems(idArray);
            setTotalPrice(sum);
        }
        // 반대의 경우 전체 체크 박스 체크 삭제
        else {
            setCheckItems([]);
            setTotalPrice(0);
        }
    };

    // total 값 계산
    const calcTotalPrice = (id, isTrue) => {
        const curPrice = items.reduce((sum, cur, idx) => {
            if (cur.id == id)
                sum = cur.price * cur.quantity;
            return sum;
        }, 0);
        if (isTrue) {
            setTotalPrice(totalPrice + curPrice);
        }
        else {
            setTotalPrice(totalPrice - curPrice);
        }

    }

    return (
        <>
            <IndexNavbar />
            <div className="ct-main">
                <div className="ct-list">
                    <h3 id="ct-Lbl">장바구니</h3>
                    <table className="ct-tb table table-borderless">
                        <thead className="ct-thead">
                            <tr>
                                <th scope="col" style={{ width: "5%" }} className="checkbox">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => handleAllCheck(e.target.checked)}
                                        checked={
                                            checkItems.length != 0 && checkItems.length === items.length
                                                ? true
                                                : false
                                        }
                                    />
                                </th>
                                <th scope="col" style={{ width: "50%" }}> 상품 </th>
                                <th scope="col" style={{ width: "10%" }}> 가격 </th>
                                <th scope="col" style={{ width: "15%" }}> 수량 </th>
                                <th scope="col" style={{ width: "10%" }}> 합계 </th>
                                <th scope="col" style={{ width: "10%" }}> 삭제 </th>
                            </tr>
                        </thead>
                        <tbody className="ct-tbody">
                            {items.map(
                                item =>
                                    <CartItem
                                        item={item}
                                        handleSingleCheck={handleSingleCheck}
                                        checkItems={checkItems}
                                        setCheckItems={setCheckItems}
                                        key={item.id}
                                        onRemove={onRemoveOne}
                                    />
                            )}
                        </tbody>
                    </table>
                    <button
                        type="button"
                        className="ct-dlt btn-round btn float-right"
                        onClick={() => onRemoveAll()}
                    >
                        모든상품 지우기
                    </button>
                    <button
                        type="button"
                        className="ct-dlt btn-round btn float-right"
                        onClick={() => onRemoveMul(checkItems)}
                    >
                        선택상품 지우기
                    </button>
                </div>

                <div className="ct-tot">
                    <div className="ct-tot-line">
                        <div className="ct-tot-area">
                            <div>
                                <span>
                                    선택상품금액
                                </span>
                                <em>
                                    <span>
                                        {totalPrice}원
                                    </span>
                                </em>
                            </div>
                            <span>
                                {/* <i className="fa fa-plus" aria-hidden="true"></i> */}
                                <FontAwesomeIcon icon={faPlus} className="icon"/>
                            </span>
                            <div>
                                <span>
                                    배송비
                                </span>
                                <em>
                                    <span>
                                        3000원
                                    </span>
                                </em>
                            </div>
                            <span>
                                {/* <i className="fa fa-minus" aria-hidden="true"></i> */}
                                <FontAwesomeIcon icon={faMinus} className="icon" />
                            </span>
                            <div>
                                <span>
                                    할인금액
                                </span>
                                <em>
                                    <span>
                                        0원
                                    </span>
                                </em>
                            </div>
                            <span>
                                <FontAwesomeIcon icon={faEquals} className="icon" />
                            </span>
                            <div>
                                <span>
                                    최종금액
                                </span>
                                <em>
                                    <span className="tot-price">
                                        {totalPrice}원
                                    </span>
                                </em>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ct-buy">
                        <button 
                        type="button" 
                        className="btn-round btn"
                        >
                            주문하기
                        </button>
                </div>

            </div>
            <VeginFooter />
        </>
    );
}

export default CartPage;