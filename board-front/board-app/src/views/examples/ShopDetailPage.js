import React, { Component } from 'react';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import ShopNavTab from "../index-sections/ShopNavTab";
import ShopInfo from "../index-sections/ShopInfo";
import VeginFooter from 'components/Footers/VeginFooter';

class ProductDetailPage extends Component {
    render() {
        return (
            <>
                <IndexNavbar />
                <ShopInfo />
                <ShopNavTab />
                <VeginFooter/>
            </>
        );
    }
}

export default ProductDetailPage;