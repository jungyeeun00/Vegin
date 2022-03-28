import React, { Component } from 'react';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import BestShopItems from '../index-sections/BestShopItems';
import AllShopItems from 'views/index-sections/AllShopItems';

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
                    < BestShopItems />
                    <hr className='shop-hr'/>

                    {/* 정렬 및 아이템 나열 부분 */}
                    < AllShopItems />
                </div>
            </>
        );
    }
}

export default ShopPage;