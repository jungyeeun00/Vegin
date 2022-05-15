import React, { Component } from 'react';
import { NavItem, NavLink, Nav, TabContent, TabPane } from "reactstrap";
import IndexNavbar from 'components/Navbars/IndexNavbar';
import VeginFooter from 'components/Footers/VeginFooter'
import BoardService from '../../service/BoardService';
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ListBoardComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            p_num: 1,
            paging: {},
            boards: []
        }

        this.createBoard = this.createBoard.bind(this);
    }

    componentDidMount() {
        BoardService.getBoards(this.state.p_num).then((res) => {
            this.setState({
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list
            });
        });
    }

    createBoard() {
        this.props.history.push("/create-board/_create");
    }

    readBoard(no) {
        this.props.history.push(`/read-board/${no}`)
    }

    listBoard(p_num) {
        console.log("pageNum : " + p_num);
        BoardService.getBoards(p_num).then(res => {
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
        if (this.state.paging.prev) {
            return (
                <li className='page-itmem'>
                    <a className='page-link' onClick={() => this.listBoard((this.state.paging.currentPageNum - 1))} tabIndex="-1">Previous</a>
                </li>
            )
        }
    }

    isPagingNext() {
        if (this.state.paging.next) {
            return (
                <li className='page-itmem'>
                    <a className='page-link' onClick={() => this.listBoard((this.state.paging.currentPageNum + 1))} tabIndex="-1">Next</a>
                </li>
            );
        }
    }

    isMoveToFirstPage() {
        if (this.state.p_num != 1) {
            return (
                <li className='page-item'>
                    <a className='page-link' onClick={() => this.listBoard(1)} tabIndex="-1">Move to First Page</a>
                </li>
            );
        }
    }

    isMoveToLastPage() {
        if (this.state.p_num != this.state.paging.pageNumCountTotal) {
            return (
                <li className='page-item'>
                    <a className='page-link' onClick={() => this.listBoard(this.state.paging.pageNumCountTotal)} tabIndex="-1">LastPage({this.state.paging.pageNumCountTotal})</a>
                </li>
            );
        }
    }

    render() {
        return (
            <>
                <IndexNavbar />
                <div className="community-main">
                <h3 id="commLabel">커뮤니티</h3>
                {/* <div className="community-navtab">
                    <Nav id="tabs" role="tablist" tabs>
                        <NavItem>
                            <NavLink id="free"
                            >
                                자유게시판
                            </NavLink>
                        </NavItem>
                        <text> | </text>
                        <NavItem>
                            <NavLink id="diary"
                            >
                                다이어리
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div> */}
                <div className="community-pl-main">
                    <div className="community-pl-title">
                        <h5 className="text-center">자유게시판</h5>
                    </div>
                    <div className="community-pl-search-bar">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input type="search" placeholder="글 제목 / 본문" value={this.state.searchInput}
                            onFocus={this.searchOnHandler} onBlur={this.searchOffHandler} onChange={this.setSearchHandler} />
                    </div>

                    <div>
                        <div className="community-pl-tb-wrap">
                            <table className="community-pl-tb table">
                                <thead className="community-pl-thead">
                                    <tr>
                                        <th scope="col" style={{ width: "8%" }}>글 번호</th>
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
                                                    <td className="community-post-title"><a onClick={() => this.readBoard(board.no)}>{board.title}</a></td>
                                                    <td>{board.memberId}</td>
                                                    <td>{board.createdTime}</td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="community-pl-bottom">
                            <div className='row'>
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

export default ListBoardComponent;