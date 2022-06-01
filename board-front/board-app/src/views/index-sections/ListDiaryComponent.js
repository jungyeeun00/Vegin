import React, { Component } from 'react';
import { NavItem, NavLink, Nav, TabContent, TabPane } from "reactstrap";
import IndexNavbar from 'components/Navbars/IndexNavbar';
import VeginFooter from 'components/Footers/VeginFooter'
import BoardService from '../../service/BoardService';
import Pagination from './Pagination';
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BestCommunityDiaryItems from './BestCommunityDiaryItems';

class ListDiaryComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchClick:false,
            searchInput:'',
            orgBoards:[],
            p_num: 1,
            paging: {},
            boards: [],
            posts: {
                data: [],
                pageSize: 10,
                currentPage: 1
            }
        }

        this.createBoard = this.createBoard.bind(this);
    }

    componentDidMount() {
        BoardService.getDiarys(this.state.p_num).then((res) => {
            this.setState({
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list,
                orgBoards: res.data.list,
            });
        });
    }

    searchOnHandler = () => {
        this.setState({
            searchClick:true
        })
    }
    searchOffHandler = () => {
        this.setState({
            searchClick:false
        })
    }

    setSearchHandler = (e) => { // input 창에 onChange 이벤트
        this.setState({
            searchInput:e.target.value
        })
    }

    setSearchContent = (e) => { //테이블 제목과 검색 결과 비교&필터링
        console.log(this.state.searchInput);
        var n_boards = this.state.boards.filter(it => {
            return it.title.includes(this.state.searchInput);
        })
        this.setState({
            boards:n_boards
        })
    }

    searchInputRemoveHandler = () => {
        this.setState({
            searchInput:'',
            boards:this.state.orgBoards
        })
    }


    createBoard() {
        this.props.history.push("/create-diary/_create");
    }

    readBoard(no) {
        this.props.history.push(`/read-diary/${no}`)
    }

    listBoard(p_num) {
        console.log("pageNum : " + p_num);
        BoardService.getDiarys(p_num).then(res => {
            console.log(res.data);
            this.setState({
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list
            });
        });
    }

    viewPaging() {
        const pageNums = [];

        for (let i = this.state.paging.pageNumStart; i <= this.state.paging.pageNumEnd; i++) {
            pageNums.push(i);
        }

        return (pageNums.map(page =>
            <li className='page-item' key={page.toString()}>
                <a className='page-link' onClick={() => this.listBoard(page)}>{page}</a>
            </li>
        ));
    }

    isPagingPrev() {
        return (
            <li className='page-itmem'>
                <a className='page-link' onClick={() => this.listBoard((this.state.paging.currentPageNum - 1))} tabIndex="-1">
                    <i aria-hidden="true" className="fa fa-angle-left"></i>
                </a>
            </li>
        )
    }

    isPagingNext() {
        return (
            <li className='page-itmem'>
                <a className='page-link' onClick={() => this.listBoard((this.state.paging.currentPageNum + 1))} tabIndex="-1">
                    <i aria-hidden="true" className="fa fa-angle-right"></i>
                </a>
            </li>
        );
    }

    isMoveToFirstPage() {
        return (
            <li className='page-item'>
                <a className='page-link' onClick={() => this.listBoard(1)} tabIndex="-1">
                    <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                </a>
            </li>
        );
    }

    isMoveToLastPage() {
        return (
            <li className='page-item'>
                <a className='page-link' onClick={() => this.listBoard(this.state.paging.pageNumCountTotal)} tabIndex="-1">
                    <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                </a>
            </li>
        );

    }

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
                    <div className="community-best">
                        <h3>BEST</h3>
                    </div>
                        {this.state.boards.length != 0 && <BestCommunityDiaryItems diarys={this.state.orgBoards} />}
                        <hr className="community-hr" />
                        <div className="community-pl-title">
                            <h5 className="text-center">다이어리</h5>
                        </div>
                        <div className="community-pl-search-bar">
                            <span className='place-search-icon' onClick={this.setSearchContent} style={{cursor: 'pointer'}}> <FontAwesomeIcon icon={faMagnifyingGlass} /> </span>
                            <input type="search" placeholder="글 제목 / 본문" value={this.state.searchInput}
                                onFocus={this.searchOnHandler} onBlur={this.searchOffHandler} onChange={this.setSearchHandler} />
                            {this.state.searchInput.length !== 0 &&
                                <button className="btn-clear" onClick={this.searchInputRemoveHandler}>
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </button>
                            }  
                        </div>
                        <div>
                            <div className="community-pl-tb-wrap">
                                <table className="community-pl-tb table">
                                    <thead className="community-pl-thead">
                                        <tr>
                                            <th scope="col" style={{ width: "8%" }}>번호</th>
                                            <th scope="col" style={{ width: "66%" }}>제목</th>
                                            <th scope="col" style={{ width: "10%" }}>작성자</th>
                                            <th scope="col" style={{ width: "10%" }}>작성일</th>
                                        </tr>
                                    </thead>
                                    <tbody className="community-pl-tbody">
                                        {
                                            this.state.boards.map(
                                                board =>
                                                    <tr key={board.no}>
                                                        <td>{board.no}</td>
                                                        <td className="community-post-title" onClick={() => this.readBoard(board.no)}>{board.title}</td>
                                                        <td>{board.memberId}</td>
                                                        <td>{board.createdTime}</td>
                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="community-pl-bottom">
                                <div className='btn-pagination'>
                                    <nav aria-label='Page navigation example'>
                                        <ul className='pagination justify-content-center'>
                                            {this.isMoveToFirstPage()}
                                            {this.isPagingPrev()}
                                            {this.viewPaging()}
                                            {this.isPagingNext()}
                                            {this.isMoveToLastPage()}
                                        </ul>
                                    </nav>
                                </div>
                                <div className='btn-write'>
                                    <button className='btn-round btn' onClick={this.createBoard}>글 작성</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <VeginFooter />
            </>
        );
    }
}

export default ListDiaryComponent;