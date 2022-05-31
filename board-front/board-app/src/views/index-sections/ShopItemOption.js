import React from 'react';
import "../../assets/scss/paper-kit/_shop-page.scss";
import { Link } from "react-router-dom"
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "assets/scss/paper-kit/_aboutvegan.scss";

function ShopItemOption(props) {

    return (
        <>
             <div className="option-content">
                <div className="option-name">{props.option.text}</div>
                <div className="quantity-wrapper">
                    <div className="option-delete">
                        <button
                            onClick={() => props.deleteOption(props.option)}
                            className="quantity-remove-btn"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="buttonsAndPrice">
                        <div className="twoButtonsBox">
                            <button
                                onClick={() => props.minusQuantity(props.option)}
                                className="quantity-btn minus"
                            >
                            -
                            </button>
                            <div className="calculator">{props.option.num}</div>
                            <button
                                onClick={() => props.plusQuantity(props.option)}
                                className="quantity-btn plus"
                            >
                            +
                            </button>
                        </div>
                        <div className="price-total">
                            {props.option.sum}원
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}


export default ShopItemOption;