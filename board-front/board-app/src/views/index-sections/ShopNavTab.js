/*!

=========================================================
* Paper Kit React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useParams } from "react-router";
import React, { useState, useEffect} from "react";

// reactstrap components
import {
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
} from "reactstrap";
// core components
import ProductInquiry from "../index-sections/ProductInquiry";
import Reviews from "../index-sections/Reviews";
import ShopService from 'service/ShopService';;



function SectionProgress() {
    const [activeTab, setActiveTab] = useState("1");
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    const productId = useParams().productId;
    const[product, setProduct] = useState({});

    useEffect(() => {
        ShopService.getChoices(productId)
        .then(res => setProduct(res.data[0].product))
    }, []);

    return (
        <>
            <div className="navtab-section">
                <div className="nav-tabs-navigation">
                    <div className="nav-tabs-wrapper">
                        <Nav id="tabs" role="tablist" tabs>
                            <NavItem>
                                <NavLink
                                    className={activeTab === "1" ? "active" : ""}
                                    onClick={() => {
                                        toggle("1");
                                    }}
                                >
                                    상품정보
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={activeTab === "2" ? "active" : ""}
                                    onClick={() => {
                                        toggle("2");
                                    }}
                                >
                                    상품후기
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={activeTab === "3" ? "active" : ""}
                                    onClick={() => {
                                        toggle("3");
                                    }}
                                >
                                    상품문의
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </div>
                <TabContent activeTab={activeTab} className="text-center">
                    <TabPane tabId="1">
                        <p className="snt-detail-wrapper">
                          <div style={{whiteSpace: 'pre-wrap'}}>{product.detail}</div>
                        </p>
                    </TabPane>
                    <TabPane tabId="2">
                        < Reviews />
                    </TabPane>
                    <TabPane tabId="3">
                        < ProductInquiry />
                    </TabPane>
                </TabContent>
            </div>{" "}
        </>
    );
}

export default SectionProgress;
