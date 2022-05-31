import React from 'react';

function CartItem(props) {
    return (
        <tr>
            <td scope="row" className="checkbox">
                <input
                    type="checkbox"
                    onChange={(e) => props.handleSingleCheck(e.target.checked, props.item.id)}
                    // checkItems에 data.id가 있으면 체크 아니면 체크 해제
                    checked={props.checkItems.includes(props.item.id) ? true : false}
                />
            </td>
            <td className="item-name">
                <div className="name">
                    {props.item.name}
                </div>
                {props.item.option ?
                <div className="option">
                    {props.item.option}
                </div>
                : null}
            </td>
            <td> {props.item.price} </td>
            <td> {props.item.quantity} </td>
            <td className="total"> {props.item.price * props.item.quantity} </td>
            <td> 
                <button className="item-dlt" onClick={() => props.onRemove(props.item.id)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="ico_delete--3ASzyXvISn">
                    <path d="M14.278 1.12l.722.72-6.278 6.28L15 14.397l-.722.722L8 8.841 1.722 15.12 1 14.397l6.278-6.278L1 1.841l.722-.722L8 7.397l6.278-6.278z" fill="#BDC0C6">
                    </path>
                    </svg>
                </button>
            </td>
        </tr>
    );
}

export default CartItem;