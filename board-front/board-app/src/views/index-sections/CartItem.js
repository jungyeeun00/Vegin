import React, { useState } from 'react';

function CartItem(props) {

    const [optionNum, setNum] = useState(props.option.num);
    const [optionSum, setSum] = useState(props.option.sum);
    const [items, setItems] = useState(props.items);

    /* 선택한 옵션의 수량 변경 시 수량 및 가격 반영 */
    const plusQuantity = (option) => {
        option.num += 1;
        option.sum += option.price;
        setNum(option.num);
        setSum(option.sum);
         // 세션 저장
        for(let i = 0; i< items.length; i++) {
            if(items[i].id == option.id) {
                items[i].num = option.num;
                items[i].sum = items[i].num * items[i].price;
                break;
            }
        }
        sessionStorage.setItem("cart", JSON.stringify(items));
        props.changeTotalPrice(option.id);
    };
    const minusQuantity = (option) => {
        if (option.sum > 0 && option.num > 1) {
            option.num -= 1;
            option.sum -= option.sum;
        }
        setNum(option.num);
        setSum(option.sum);
         // 세션 저장
         for(let i = 0; i< items.length; i++) {
            if(items[i].id == option.id) {
                items[i].num = option.num;
                items[i].sum = items[i].num * items[i].price;
                break;
            }
        }
        setItems(items);
        sessionStorage.setItem("cart", JSON.stringify(items));
        props.changeTotalPrice(option.id);
    };

    return (
        <>
        <tr>
            <td scope="row" className="checkbox">
                <input
                    type="checkbox"
                    onChange={(e) => props.handleSingleCheck(e.target.checked, props.option.id)}
                    // checkItems에 data.id가 있으면 체크 아니면 체크 해제
                    checked={props.checkItems.includes(props.option.id) ? true : false}
                />
            </td>
            <td className="item-name">
                <div className="name">
                    {props.option.productName}
                </div>
                {props.option.option ?
                <div className="option">
                    {props.option.option}
                </div>
                : null}
            </td>
            <td> {props.option.price} </td>
            <td> 
                <button
                    onClick={() => minusQuantity(props.option)}
                    className="quantity-btn minus"
                > - 
                </button>
                {optionNum} 
                <button
                    onClick={() => plusQuantity(props.option)}
                    className="quantity-btn plus"
                > +
                </button>
            </td>
            <td className="total"> {props.option.price * optionNum} </td>
            <td> 
                <button className="item-dlt" onClick={() => props.onRemove(props.option.id)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="ico_delete--3ASzyXvISn">
                    <path d="M14.278 1.12l.722.72-6.278 6.28L15 14.397l-.722.722L8 8.841 1.722 15.12 1 14.397l6.278-6.278L1 1.841l.722-.722L8 7.397l6.278-6.278z" fill="#BDC0C6">
                    </path>
                    </svg>
                </button>
            </td>
        </tr>
    </>
    );
}

export default CartItem;