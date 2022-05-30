// import React, { useRef } from 'react';
// import { NavItem, NavLink, Nav, TabContent, TabPane } from "reactstrap";
// import IndexNavbar from 'components/Navbars/IndexNavbar';
// import BestCommunityFreeItems from 'views/index-sections/BestCommunityFreeItems';
// import BestCommunityDiaryItems from 'views/index-sections/BestCommunityDiaryItems';
// import CommunityFreeList from "../index-sections/CommunityFreeList";
// import CommunityDiaryList from "../index-sections/CommunityDiaryList";
// import VeginFooter from 'components/Footers/VeginFooter';
// import ListBoardComponent from 'views/index-sections/ListBoardComponent';

// function CommunityPageProgress(props) {
//     const [activeTab, setActiveTab] = React.useState(props.tab);
//     //const commRef = useRef(null);
//     const toggle = (tab) => {
//         if (activeTab !== tab) {
//             setActiveTab(tab);
//         }
//     }
    
//     return (
//         <>
//             <IndexNavbar />

//             <div className="community-main">
//                 <h3 id="commLabel">커뮤니티</h3>

//                 <div className="community-navtab">
//                     <Nav id="tabs" role="tablist" tabs>
//                         <NavItem>
//                             <NavLink id="free"
//                                 className={activeTab === "1" ? "active" : ""}
//                                 onClick={() => {
//                                     toggle("1");
//                                 }}
//                             >
//                                 자유게시판
//                                 </NavLink>
//                         </NavItem>
//                         <text> | </text>
//                         <NavItem>
//                             <NavLink id="diary"
//                                 className={activeTab === "2" ? "active" : ""}
//                                 onClick={() => {
//                                     toggle("2");
//                                 }}
//                             >
//                                 다이어리
//                                 </NavLink>
//                         </NavItem>
//                     </Nav>
//                 </div>

//                 <TabContent activeTab={activeTab} className="text-center">
//                     <div className="community-best">
//                         <h3>BEST</h3>
//                     </div>
//                     <TabPane tabId="1">
//                         <BestCommunityFreeItems />
//                         <hr className="community-hr" />
//                         <CommunityFreeList />
//                     </TabPane>
//                     <TabPane tabId="2">
//                         <BestCommunityDiaryItems />
//                         <hr className="community-hr" />
//                         <CommunityDiaryList />
//                     </TabPane>
//                     <ListBoardComponent/>
//                 </TabContent>
//             </div>

//             <VeginFooter />
//         </>
//     );
// }

// export default CommunityPageProgress;