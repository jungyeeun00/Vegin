import React, { Component } from 'react';
import "../../assets/scss/paper-kit/_shop-page.scss";
import {
    NavLink,
} from "reactstrap";
import { Link } from "react-router-dom"
import ShopService from 'service/ShopService';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "assets/scss/paper-kit/_aboutvegan.scss";
import styled from 'styled-components';


function BestShopItems(props) {
    console.log(props.rec);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
      };
      
     
    return (
        <>
        <div className='bestItem-slider-wrapper'>
            <Slider {...settings} className='bestItem-slider'>
                {  
                    props.rec.map(
                        product =>   
                        <div className='best-items'>               
                        <Link
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            title="View Detail"
                            to={{
                                pathname: `/shop-detail-page/${product.productId}`,
                                state: {
                                    productName: `${product.productName}`,
                                    soldPrice: `${product.soldPrice}`,
                                    imgSrc: `${product.imgSrc}`,
                                    detail: `${product.detail}`
                                }
                            }}
                        > 
                            <div id="shopItem" className="item" align="center"
                            onClick = {() => this.readProduct(product.productId)} >
                                {/* 상품 이미지 */}
                                <img id="shopImg" className="item-img" alt="shop_img" src={product.imgSrc}/>
                                <div className="like">  {/* 관심 상품 버튼 */}
                                    <button id="shopLike" type="button" className="like-button" title="like">
                                        <FontAwesomeIcon icon={faHeart} />
                                    </button>
                                </div>
                                <p id="shopTitle" className="item-title">{product.productName}</p>                                  {/* 상품명 */}
                                {product.saleRate === 0
                                ? null
                                :  <span id="shopPer" className="shop-per shop-text">{product.saleRate}%</span>}                         {/* 할인율 */}
                                <span id="shopPrice" className="shop-price shop-text">₩{product.soldPrice}</span>            {/* 할인 O: 할인가, 할인 X: 정가 */}
                                {product.regPrice === product.soldPrice
                                ? null
                                : <span id="shopStrikePrice" className="shop-strike-price shop-text">₩{product.regPrice}</span> }   {/* 할인 O: 정가 */}
                            </div>
                         </Link>
                         </div>
                    )}
                
            </Slider>
         </div>   
        </>
    );
}
  

export default BestShopItems;