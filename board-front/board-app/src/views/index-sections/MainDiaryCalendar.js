import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VeginFooter from 'components/Footers/VeginFooter';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import React, { Component } from 'react';
import { Calendar } from 'react-calendar';
import { Nav, NavItem, NavLink } from "reactstrap";
import MemberService from 'service/MemberService';
import BoardService from '../../service/BoardService';
import BestCommunityDiaryItems from './BestCommunityDiaryItems';
import DiaryCalendar from './DiaryCalendar';

class MainDiaryCalendar extends Component {

    render() {
        return (
            <>
                <IndexNavbar />
                <div className="community-main">
                    <h3 id="commLabel">커뮤니티</h3>
                    <div className="community-navtab">
                    <Nav id="tabs" role="tablist" tabs>
                        <NavItem>
                            <NavLink id="free" href='/board'
                            >
                                자유게시판
                            </NavLink>
                        </NavItem>
                        <text> | </text>
                        <NavItem style={{borderBottom: "3px solid #4A8451"}}>
                            <NavLink id="diary" style={
                            {
                                color:'#4A8451',
                                fontWeight:'bold'
                            }
                            }
                            >
                                다이어리
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
                    <div className="community-pl-main">
                        <div>
                            <DiaryCalendar/>
                        </div>
                    </div>
                </div>
                <VeginFooter />
            </>
        );
    }
}

export default MainDiaryCalendar;