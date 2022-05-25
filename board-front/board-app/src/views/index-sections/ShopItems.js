import React, { Component } from 'react';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class ShopItems extends Component {
    render() {
        return (
            <>
                {/* 상품 아이템 */}
                <div id="shopItem" className="item" align="center">
                    {/* 상품 이미지 */}
                    <img id="shopImg" className="item-img" alt="shop_img" src={require("assets/img/shop_item.jpg")} />
                    <div className="like">  {/* 관심 상품 버튼 */}
                        <button id="shopLike" type="button" className="like-button" title="like">
                            <FontAwesomeIcon icon={faHeart} />
                        </button>
                    </div>
                    <p id="shopTitle" className="item-title">상품명</p>                                  {/* 상품명 */}
                    <span id="shopPer" className="shop-per shop-text">25%</span>                         {/* 할인율 */}
                    <span id="shopPrice" className="shop-price shop-text">￦15000</span>                 {/* 할인 O: 할인가, 할인 X: 정가 */}
                    <span id="shopStrikePrice" className="shop-strike-price shop-text">￦20000</span>    {/* 할인 O: 정가 */}
                </div>
            </>
        );
    }
}

export default ShopItems;