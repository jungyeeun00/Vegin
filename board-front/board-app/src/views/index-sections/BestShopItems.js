import React, { Component } from 'react';
import ShopItems from "./ShopItems";
import "../../assets/scss/paper-kit/_shop-page.scss";
import {
    NavLink,
} from "reactstrap";

class BestShopItems extends Component {
    render() {
        return (
            <>
                <ul className="shop-best-table">
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

export default BestShopItems;