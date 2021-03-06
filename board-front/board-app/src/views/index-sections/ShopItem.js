import React, { useState, useEffect } from 'react';
import "../../assets/scss/paper-kit/_shop-page.scss";
import { Link } from "react-router-dom"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "assets/scss/paper-kit/_aboutvegan.scss";
import ShopService from 'service/ShopService';
import LikeButton from '../index-sections/Like';

function ShopItem(props) {
    // const memberId = JSON.parse(localStorage.getItem("member"));
    const memberId = localStorage.getItem("member");
    const [like, setLike] = useState(props.like);

    useEffect(() => {
        setLike(props.like);
    }, [props.like]);

    const toggleLike = () => {
        setLike(!like);
    }
  
    return (
        <>
            <Link
                className="shop-detil-link pt-0 mt-0"
                data-placement="bottom"
                title="View Detail"
                to={{
                    pathname: `/shop-detail-page/${props.product.productId}`,
                    state: {
                        productName: `${props.product.productName}`,
                        soldPrice: `${props.product.soldPrice}`,
                        regPrice: `${props.product.regPrice}`,
                        saleRate: `${props.product.saleRate}`,
                        imgSrc: `${props.product.imgSrc}`,
                        detail: `${props.product.detail}`
                    }
                }}
                key={props.product.productId}
                onClick= {() => sessionStorage.setItem("scrollPosition", window.pageYOffset)}
                
            > 
                <div id="shopItem" className="item" align="center">
                    {/* 상품 이미지 */}
                    <img id="shopImg" className="item-img" alt="shop_img" src={props.product.imgSrc}/>
                    {/* 관심 상품 버튼, 로그인 했을 때만 나타남 */}
                    {memberId !== null &&
                        <div className="like">
                            <LikeButton like={like} onClick={(e) => {
                                {like ? ShopService.setUnlike(memberId, props.product.productId)
                                    : ShopService.setLike(memberId, props.product.productId)};
                                e.preventDefault();
                                {props.isList ? props.onUpdate(props.product.productId) : toggleLike()};
                            }} />
                        </div>
                    }
                    <p id="shopTitle" className="item-title">{props.product.productName}</p>                                  {/* 상품명 */}
                    {props.product.saleRate === 0
                    ? null
                    :  <span id="shopPer" className="shop-per shop-text">{props.product.saleRate}%</span>}                         {/* 할인율 */}
                    <span id="shopPrice" className="shop-price shop-text">₩{props.product.soldPrice}</span>            {/* 할인 O: 할인가, 할인 X: 정가 */}
                    {props.product.regPrice === props.product.soldPrice
                    ? null
                    : <span id="shopStrikePrice" className="shop-strike-price shop-text">₩{props.product.regPrice}</span> }   {/* 할인 O: 정가 */}
                </div>
            </Link>
            
        </>
    );
}


export default ShopItem;