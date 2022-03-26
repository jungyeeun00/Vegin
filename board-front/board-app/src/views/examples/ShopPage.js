import React, { Component } from 'react';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import ShopItems from "../index-sections/ShopItems";
import "assets/scss/paper-kit/_shop-page.scss";

class ShopPage extends Component {
    render() {
        return (
            <>
                <IndexNavbar />
                <div className="shop-main">

                    {/* BEST ITEM 부분 */}
                    <div className="shop-best">
                        <h3>BEST</h3>
                    </div>
                    <ul className="shop-best-table">
                        <li><ShopItems /></li>
                        <li><ShopItems /></li>
                        <li><ShopItems /></li>
                        <li><ShopItems /></li>
                    </ul>

                    {/* 정렬 버튼 */}
                    <div className="shop-content-bar">
                        <ul className="shop-sort-list">
                            <li className="orderItem orderItem10 active"><a>인기순</a></li>
                            <li className="orderItem orderItem01"><a>추천순</a></li>
                        </ul>
                    </div>

                    {/* 아이템 나열 부분 */}
                    <ul className="shop-items-table">
                        <li><ShopItems /></li>
                        <li><ShopItems /></li>
                        <li><ShopItems /></li>
                        <li><ShopItems /></li>
                        <li><ShopItems /></li>
                        <li><ShopItems /></li>
                        <li><ShopItems /></li>
                        <li><ShopItems /></li>
                        <li><ShopItems /></li>
                        <li><ShopItems /></li>
                        <li><ShopItems /></li>
                        <li><ShopItems /></li>
                        <li><ShopItems /></li>
                        <li><ShopItems /></li>
                        <li><ShopItems /></li>
                    </ul>
                </div>
            </>
        );
    }
}

export default ShopPage;