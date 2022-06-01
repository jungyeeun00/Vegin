import VeginFooter from 'components/Footers/VeginFooter';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import React, { Component } from 'react';
import BoardService from 'service/BoardService';

class MyPostPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            searchClick:false,
            searchInput:'',
            p_num: 1,
            paging: {},
            boards: [],
            posts: {
                data: [],
                pageSize: 10,
                currentPage: 1
            }
        }
    }

    componentDidMount() {
        BoardService.getBoards(this.state.p_num).then((res) => {
            const myposts = res.data.list.filter(it => {
                return it.memberId===localStorage.getItem("member");
            })
            this.setState({
                boards: myposts,
            });
        });
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
        const totalPage = Math.ceil(this.state.boards.length / 10);
        const pageNums = [];

        for (let i = 1; i <= totalPage; i++) {
            pageNums.push(i);
        }

        return (pageNums.map(page =>
            <li className='page-item' key={page.toString()}>
                <a className='page-link' onClick={() => this.setState({page: page + 1})}>{page}</a>
            </li>
        ));
    }

    isPagingPrev() {
        return (
            <li className='page-itmem'>
                <a className='page-link' onClick={() => this.state.page !== 1 && this.setState({page: this.state.page - 1})} tabIndex="-1">
                    <i aria-hidden="true" className="fa fa-angle-left"></i>
                </a>
            </li>
        )
    }

    isPagingNext() {
        const totalPage = Math.ceil(this.state.boards.length / 10);

        return (
            <li className='page-itmem'>
                <a className='page-link' onClick={() => this.state.page !== totalPage && this.setState({page: this.state.page + 1})} tabIndex="-1">
                    <i aria-hidden="true" className="fa fa-angle-right"></i>
                </a>
            </li>
        );
    }

    isMoveToFirstPage() {
        return (
            <li className='page-item'>
                <a className='page-link' onClick={() => this.setState({page: 1})} tabIndex="-1">
                    <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                </a>
            </li>
        );
    }

    isMoveToLastPage() {
        const totalPage = Math.ceil(this.state.boards.length / 10);

        return (
            <li className='page-item'>
                <a className='page-link' onClick={() => this.setState({page: totalPage})} tabIndex="-1">
                    <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                </a>
            </li>
        );

    }

    render() {
        const offset = (this.state.page - 1) * 10;
        return (
            <>
            <IndexNavbar/>
                <div className="community-main">
                <div className="community-pl-main">
                <h3 id="commLabel">내가 쓴 글</h3>
                <br/>
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
                                    this.state.boards.slice(offset, offset+10).map(
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
                    </div>
                </div>
                </div>
            <VeginFooter/>
            </>
        );
    }
}

export default MyPostPage;