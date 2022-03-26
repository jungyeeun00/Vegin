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
import React from "react";

// reactstrap components
import {
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
} from "reactstrap";

// core components

function SectionProgress() {
    const [activeTab, setActiveTab] = React.useState("1");
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
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
                        <p>
                            Larger, yet dramatically thinner. More powerful, but
                            remarkably power efficient. With a smooth metal surface that
                            seamlessly meets the new Retina HD display.
                        </p>
                    </TabPane>
                    <TabPane tabId="2">
                        <p>Here is your profile.</p>
                    </TabPane>
                    <TabPane tabId="3">
                        <p>Here are your messages.</p>
                    </TabPane>
                </TabContent>
            </div>{" "}
        </>
    );
}

export default SectionProgress;
