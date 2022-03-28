import React, { Component } from 'react';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import ShopNavTab from "../index-sections/ShopNavTab";
import ShopInfo from "../index-sections/ShopInfo";

class ProductDetailPage extends Component {
    render() {
        return (
            <>
                <IndexNavbar />
                <ShopInfo />
                <ShopNavTab />
            </>
        );
    }
}

export default ProductDetailPage;