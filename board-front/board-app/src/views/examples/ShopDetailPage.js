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
                <div className="btn-list">
                    <button type="button" class="btn-round btn"
                        onClick={() => this.props.history.goBack()}> 목록 </button>
                </div>
                <VeginFooter />
            </>
        );
    }
}

export default ProductDetailPage;