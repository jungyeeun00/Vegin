import React, { Component } from 'react';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import BestItems from "../index-sections/BestItems";
import AllItems from 'views/index-sections/AllItems';

class ShopPage extends Component {
    render() {
        return (
            <>
                <IndexNavbar />
                <div className="shop-main">
                    {/* BEST ITEM 부분 */}
                    < BestItems />

                    {/* 정렬 및 아이템 나열 부분 */}
                    < AllItems />
                </div>
            </>
        );
    }
}

export default ShopPage;