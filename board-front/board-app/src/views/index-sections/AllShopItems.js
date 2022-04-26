import React, { Component } from 'react';
import ShopItems from "./ShopItems";
import {
    NavLink,
} from "reactstrap";
import ShopService from 'service/ShopService';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AllShopItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }
    componentDidMount() {
        ShopService.getProducts().then((res) => {
            this.setState({ products: res.data});
        });
    }
    render() {
        return (
            <>
                {/* 정렬 버튼 */}
                < div className="shop-content-bar" >
                    <ul className="shop-sort-list">
                        <li className="orderItem orderItem10 active"><a>인기순</a></li>
                        <li className="orderItem orderItem01"><a>추천순</a></li>
                    </ul>
                </div>

                {/* 아이템 나열 부분 */}
                <ul className="shop-items-table">
                    {
                        this.state.products.map(
                            product =>
                            <li key={product.productId}>
                            
                            <NavLink
                                className="pt-0 mt-0"
                                data-placement="bottom"
                                href="/shop-detail-page"
                                title="View Detail"
                            >  {
                                this.state.products.map(
                                    product =>
                                    <div id="shopItem" className="item" align="center">
                                        {/* 상품 이미지 */}
                                        <img id="shopImg" className="item-img" alt="shop_img" src={require("assets/img/shop_item.jpg")} />
                                        <div className="like">  {/* 관심 상품 버튼 */}
                                            <button id="shopLike" type="button" class="like-button" title="like">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </button>
                                        </div>
                                        <p id="shopTitle" className="item-title">{product.productName}</p>                                  {/* 상품명 */}
                                        <span id="shopPer" className="shop-per shop-text">25%</span>                         {/* 할인율 */}
                                        <span id="shopPrice" className="shop-price shop-text">00</span>                 {/* 할인 O: 할인가, 할인 X: 정가 */}
                                        <span id="shopStrikePrice" className="shop-strike-price shop-text">￦20000</span>    {/* 할인 O: 정가 */}
                                    </div>
                                )
                            }
                            </NavLink>
                        </li>
                      
                        )
                    }
                  
                </ul>
            </>
        );
    }
}

export default AllShopItems;