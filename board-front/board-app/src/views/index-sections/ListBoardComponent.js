import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VeginFooter from 'components/Footers/VeginFooter';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from "reactstrap";
import MemberService from 'service/MemberService';
import BoardService from '../../service/BoardService';
import BestCommunityFreeItems from './BestCommunityFreeItems';

class ListBoardComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchClick:false,
            searchInput:'',
            orgBoards:[],
            p_num: 1,
            paging: {},
            boards: [],
            best: [],
            search_p_num: 1,
            search_boards: [],
            search_paging: {},
        }

        this.createBoard = this.createBoard.bind(this);
    }

    componentDidMount() {
        /* 서버에서 글 목록 가져오기 */
        BoardService.getBoards(this.state.p_num).then((res) => {
            this.setState({
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list,
                orgBoards: res.data.list,
            });
        });
        /* 서버에서 best 글 목록 가져오기 */
        BoardService.getBestBoards().then((res)=>{
            this.setState({
                best: res.data
            })
        })
    }

    /* input 창에 onChange 이벤트 */
    setSearchHandler = (e) => {
        this.setState({
            searchInput:e.target.value
        })
    }

    /* 찾기 버튼 클릭 시 글 제목과 검색 결과 비교 & 필터링 */
    setSearchContent = (e) => { 
        BoardService.getSearchBoards(this.state.searchInput, 1).then((res) => {
            this.setState({
                boards: res.data.list,
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                search_boards: res.data.list,
                search_p_num: res.data.pagingData.currentPageNum,
                search_paging: res.data.pagingData
            })
        });
    }

    /* enter 입력 시 글 제목과 검색 결과 비교 & 필터링 */
    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            BoardService.getSearchBoards(this.state.searchInput, 1).then((res) => {
                this.setState({
                    boards: res.data.list,
                    p_num: res.data.pagingData.currentPageNum,
                    paging: res.data.pagingData,
                    search_boards: res.data.list,
                    search_p_num: res.data.pagingData.currentPageNum,
                    search_paging: res.data.pagingData
                })
            });
        }
    };

    /* x버튼 클릭 시 내용 지우기 */
    searchInputRemoveHandler = () => {
        this.setState({
            searchInput:'',
            search_boards: [],
            boards:this.state.orgBoards
        })
    }

    /* 새 글 작성 페이지로 이동 */
    createBoard() {
        /* 로그인 상태가 아닐 경우 알람창 */
        if (MemberService.getCurrentMember() == null)
            return alert("로그인 후 이용 바랍니다.");
        this.props.history.push("/create-board/_create");
    }

    /* 글 상세보기로 이동 */
    readBoard(no) {
        /* 조회수 증가 */
        BoardService.setCounts(no);
        this.props.history.push(`/read-board/${no}`);
    }

    /* 현재 페이지에 맞게 목록 초기화 */
    listBoard(p_num) {
        console.log("pageNum : " + p_num);
        /* 검색한 결과 데이터가 있는 경우 */
        if(this.state.search_boards.length !== 0){
            BoardService.getSearchBoards(this.state.searchInput, p_num).then((res) => {
                this.setState({
                    boards: res.data.list,
                    p_num: res.data.pagingData.currentPageNum,
                    paging: res.data.pagingData,
                    search_boards: res.data.list,
                    search_p_num: res.data.pagingData.currentPageNum,
                    search_paging: res.data.pagingData
                })
            });
        } else {
            BoardService.getBoards(p_num).then(res => {
                console.log(res.data);
                this.setState({
                    p_num: res.data.pagingData.currentPageNum,
                    paging: res.data.pagingData,
                    boards: res.data.list
                });
            });
        }
    }

    /* 페이징 버튼 */
    viewPaging() {
        const pageNums = [];
        /* 검색한 결과 데이터가 있는 경우 */
        if(this.state.search_boards.length !== 0){
            for (let i = this.state.search_paging.pageNumStart; i <= this.state.search_paging.pageNumEnd; i++) {
                pageNums.push(i);
            }    
        } else {
            for (let i = this.state.paging.pageNumStart; i <= this.state.paging.pageNumEnd; i++) {
                pageNums.push(i);
            }
        }

        return (pageNums.map(page =>
            <li className='page-item' key={page.toString()}>
                <a className='page-link' onClick={() => this.listBoard(page)}>{page}</a>
            </li>
        ));
    }

    /* 이전 페이지 이동 버튼 */
    isPagingPrev() {
        return (
            <li className='page-itmem'>
                <a className='page-link' onClick={() => this.listBoard((this.state.paging.currentPageNum - 1))} tabIndex="-1">
                    <i aria-hidden="true" className="fa fa-angle-left"></i>
                </a>
            </li>
        )
    }

    /* 다음 페이지 이동 버튼 */
    isPagingNext() {
        return (
            <li className='page-itmem'>
                <a className='page-link' onClick={() => this.listBoard((this.state.paging.currentPageNum + 1))} tabIndex="-1">
                    <i aria-hidden="true" className="fa fa-angle-right"></i>
                </a>
            </li>
        );
    }

    /* 처음 페이지 이동 버튼 */
    isMoveToFirstPage() {
        return (
            <li className='page-item'>
                <a className='page-link' onClick={() => this.listBoard(1)} tabIndex="-1">
                    <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                </a>
            </li>
        );
    }

    /* 마지막 페이지 이동 버튼 */
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
                        <NavItem style={{borderBottom: "3px solid #4A8451"}}>
                            <NavLink id="free" style={
                            {
                                color:'#4A8451',
                                fontWeight:'bold'
                            }
                            }
                            >
                                자유게시판
                            </NavLink>
                        </NavItem>
                        <text> | </text>
                        <NavItem>
                            <NavLink id="diary" href='/diary'
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
                        {this.state.best.length >= 4 && <BestCommunityFreeItems boards={this.state.best} />}
                        {this.state.boards.length < 0 && <h5 style={{textAlign:'center', margin:'60px 0'}}>아직 베스트 글이 없습니다.</h5>}
                        <hr className="community-hr" />
                        <div className="community-pl-title">
                            <h5 className="text-center">자유게시판</h5>
                        </div>
                        <div className="community-pl-search-bar">
                            <span className='place-search-icon' onClick={this.setSearchContent} style={{cursor: 'pointer'}}> <FontAwesomeIcon icon={faMagnifyingGlass} /> </span>
                            <input type="search" placeholder="글 제목 / 본문" value={this.state.searchInput}
                                onChange={this.setSearchHandler} onKeyPress={this.handleKeyPress}/>
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
                                            <th scope="col" style={{ width: "60%" }}>제목</th>
                                            <th scope="col" style={{ width: "10%" }}>작성자</th>
                                            <th scope="col" style={{ width: "10%" }}>작성일</th>
                                            <th scope="col" style={{ width: "6%" }}>조회수</th>
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
                                                        <td>{board.counts}</td>
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

export default ListBoardComponent;