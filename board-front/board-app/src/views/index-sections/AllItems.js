import React, { Component } from 'react';
import ShopItems from "../index-sections/ShopItems";
import {
    NavLink,
} from "reactstrap";

class AllItems extends Component {
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
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/shop-detail-page"
                            title="View Detail"
                        ><ShopItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/shop-detail-page"
                            title="View Detail"
                        ><ShopItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/shop-detail-page"
                            title="View Detail"
                        ><ShopItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/shop-detail-page"
                            title="View Detail"
                        ><ShopItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/shop-detail-page"
                            title="View Detail"
                        ><ShopItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/shop-detail-page"
                            title="View Detail"
                        ><ShopItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/shop-detail-page"
                            title="View Detail"
                        ><ShopItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/shop-detail-page"
                            title="View Detail"
                        ><ShopItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/shop-detail-page"
                            title="View Detail"
                        ><ShopItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/shop-detail-page"
                            title="View Detail"
                        ><ShopItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/shop-detail-page"
                            title="View Detail"
                        ><ShopItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/shop-detail-page"
                            title="View Detail"
                        ><ShopItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/shop-detail-page"
                            title="View Detail"
                        ><ShopItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/shop-detail-page"
                            title="View Detail"
                        ><ShopItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/shop-detail-page"
                            title="View Detail"
                        ><ShopItems />
                        </NavLink>
                    </li>
                </ul>
            </>
        );
    }
}

export default AllItems;