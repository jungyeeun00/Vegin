import React, { Component } from 'react';
import ShopItems from "../index-sections/ShopItems";
import {
    NavLink,
} from "reactstrap";

class BestItems extends Component {
    render() {
        return (
            <>
                <div className="shop-best">
                    <h3>BEST</h3>
                </div>
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

export default BestItems;