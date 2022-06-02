import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import ShopService from 'service/ShopService';

function BestShopItems(props) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        ShopService.getFeatured().then((res) => {
            setProducts(res.data);
        })
    }, []);

    return (
        <>
            <div className='shop-featured'>
                <ul className="shop-best-table">
                    {
                        products.map(
                            product =>
                                <li key={product.productId}>
                                    <Link
                                        className="pt-0 mt-0"
                                        data-placement="bottom"
                                        title="Featured Shop Items"
                                        to={{
                                            pathname: `/shop-detail-page/${product.productId}`,
                                            state: {
                                                productName: `${product.productName}`,
                                                soldPrice: `${product.soldPrice}`,
                                                regPrice: `${product.regPrice}`,
                                                saleRate: `${product.saleRate}`,
                                                imgSrc: `${product.imgSrc}`,
                                                detail: `${product.detail}`
                                            }
                                        }}
                                    >
                                        <div id="shopItem" className="item" align="center"
                                            onClick={() => this.readProduct(product.productId)} >
                                            {/* 상품 이미지 */}
                                            <img id="shopImg" className="item-img" alt="shop_img" src={product.imgSrc} />
                                            <p id="shopTitle" className="item-title">{product.productName}</p>                                  {/* 상품명 */}
                                            {product.saleRate === 0
                                                ? null
                                                : <span id="shopPer" className="shop-per shop-text">{product.saleRate}%</span>}                         {/* 할인율 */}
                                            <span id="shopPrice" className="shop-price shop-text">₩{product.soldPrice}</span>            {/* 할인 O: 할인가, 할인 X: 정가 */}
                                            {product.regPrice === product.soldPrice
                                                ? null
                                                : <span id="shopStrikePrice" className="shop-strike-price shop-text">₩{product.regPrice}</span>}   {/* 할인 O: 정가 */}
                                        </div>
                                    </Link>
                                </li>
                        )}
                </ul>
            </div>
        </>
    );
}


export default BestShopItems;