import React, { Component } from 'react';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class ShopItems extends Component {
    render() {
        return (
            <>
                <div id="shopItem" className="item" align="center">
                    <img id="shopImg" className="item-img" alt="shop_img" src={require("assets/img/shop_item.jpg")} />
                    <div class="like">
                        <button id="shopLike" type="button" class="like-button" title="like">
                            <FontAwesomeIcon icon={faHeart} />
                        </button>
                    </div>
                    <p id="shopTitle" className="item-title">상품명</p>
                    <span id="shopPer" className="shop-per shop-text">25%</span>
                    <span id="shopPrice" className="shop-price shop-text">￦15000</span>
                    <span id="shopStrikePrice" className="shop-strike-price shop-text">￦20000</span>
                </div>
            </>
        );
    }
}

export default ShopItems;