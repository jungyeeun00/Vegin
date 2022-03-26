import React, { Component } from 'react';
import ShopItems from './ShopItems';

class FeaturedShopItems extends Component {
    render() {
        return (
            <>
                <ShopItems/>
                <ShopItems/>
                <ShopItems/>
                <ShopItems/>
            </>
        );
    }
}

export default FeaturedShopItems;