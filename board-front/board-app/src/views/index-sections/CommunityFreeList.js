import React, { Component } from 'react';
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from './Pagination';
import { Paginate } from './Paginate';

class CommunityFreePostList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchClick: false,
            searchInput: '',
            searchCancel: false,

            posts: {
                data: [
                    { id: 24, title: "글 제목24", writer: "윤사장", date: "2022.02-09" },
                    { id: 23, title: "글 제목23", writer: "정대표", date: "2022.01.03" },
                    { id: 22, title: "글 제목22", writer: "편상무", date: "2022.03.03" },
                    { id: 21, title: "글 제목21", writer: "이이사", date: "2022.08.01" },
                    { id: 20, title: "글 제목20", writer: "윤사장", date: "2022.02-09" },
                    { id: 19, title: "글 제목19", writer: "정대표", date: "2022.01.03" },
                    { id: 18, title: "글 제목18", writer: "편상무", date: "2022.03.03" },
                    { id: 17, title: "글 제목17", writer: "이이사", date: "2022.08.01" },
                    { id: 16, title: "글 제목16", writer: "윤사장", date: "2022.02-09" },
                    { id: 15, title: "글 제목15", writer: "정대표", date: "2022.01.03" },
                    { id: 14, title: "글 제목14", writer: "편상무", date: "2022.03.03" },
                    { id: 13, title: "글 제목13", writer: "이이사", date: "2022.08.01" },
                    { id: 12, title: "글 제목12", writer: "윤사장", date: "2022.02-09" },
                    { id: 11, title: "글 제목11", writer: "정대표", date: "2022.01.03" },
                    { id: 10, title: "글 제목10", writer: "편상무", date: "2022.03.03" },
                    { id: 9, title: "글 제목9", writer: "이이사", date: "2022.08.01" },
                    { id: 8, title: "글 제목8", writer: "윤사장", date: "2022.02-09" },
                    { id: 7, title: "글 제목7", writer: "정대표", date: "2022.01.03" },
                    { id: 6, title: "글 제목6", writer: "편상무", date: "2022.03.03" },
                    { id: 5, title: "글 제목5", writer: "이이사", date: "2022.08.01" },
                    { id: 4, title: "글 제목4", writer: "윤사장", date: "2022.02-09" },
                    { id: 3, title: "글 제목3", writer: "정대표", date: "2022.01.03" },
                    { id: 2, title: "글 제목2", writer: "편상무", date: "2022.03.03" },
                    { id: 1, title: "글 제목1", writer: "이이사", date: "2022.08.01" },
                ], // 글 정보
                pageSize: 10, // 한 페이지에 보여줄 아이템(글 목록) 개수
                currentPage: 1 // 현재 활성화된 페이지 위치
            },
        };
    }

    searchOnHandler = () => { // onFocus 이벤트
        this.setState({
            searchClick: true,
            searchCancel: true
        });
    };
    searchOffHandler = () => { // onBlur 이벤트
        this.setState({
            searchClick: false
        });
    };
    setSearchHandler = (e) => { // input 창에 onChange 이벤트
        this.setState({
            searchInput: e.target.value
        });
    };
    searchInputRemoveHandler = () => {
        this.setState({
            searchInput: '',
            searchCancel: false
        });
    };
    handlePageChange = (page) => {
        this.setState({
            posts: {
                data: this.state.posts.data,
                pageSize: this.state.posts.pageSize,
                currentPage: page
            }
        });
    };
    handlePagePrevious = () => {
        if (this.state.posts.currentPage > 5) {
            this.setState({
                posts: {
                    data: this.state.posts.data,
                    pageSize: this.state.posts.pageSize,
                    currentPage: this.state.posts.currentPage % 5 == 0 ?
                        parseInt(this.state.posts.currentPage / 5) * 5 - 5 : parseInt(this.state.posts.currentPage / 5) * 5 - 4
                }
            });
        }
    }
    handlePageNext = () => {
        if (parseInt(this.state.posts.currentPage / 6) * 5 + 6 <= Math.ceil(this.state.posts.data.length / this.state.posts.pageSize)) {
            this.setState({
                posts: {
                    data: this.state.posts.data,
                    pageSize: this.state.posts.pageSize,
                    currentPage: parseInt(this.state.posts.currentPage / 6) * 5 + 6
                }
            });
        }
    }
    pagedPosts = () => {
        return Paginate(this.state.posts.data, this.state.posts.currentPage, this.state.posts.pageSize);
    }

    render() {
        return (
            <>
                <div className="community-pl-main">
                    <div className="community-pl-title">
                        <h5 className="text-center">자유게시판</h5>
                    </div>
                    <div className="community-pl-search-bar">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input type="search" placeholder="글 제목 / 본문" value={this.state.searchInput}
                            onFocus={this.searchOnHandler} onBlur={this.searchOffHandler} onChange={this.setSearchHandler} />
                        {this.state.searchInput.length !== 0 &&
                            <button className="btn-clear" onClick={this.searchInputRemoveHandler}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        }
                    </div>
                    <div className="community-pl-tb-wrap">
                        <table className="community-pl-tb table">
                            <thead className="community-pl-thead">
                                <tr>
                                    <th scope="col" style={{ width: "8%" }}> 번호</th>
                                    <th scope="col" style={{ width: "66%" }}> 제목 </th>
                                    <th scope="col" style={{ width: "10%" }}> 작성자 </th>
                                    <th scope="col" style={{ width: "10%" }}> 작성일 </th>
                                </tr>
                            </thead>
                            <tbody className="community-pl-tbody">
                                {this.pagedPosts().map((post) => (
                                    <tr key={post.id}>
                                        <td scope="row">{post.id}</td>
                                        <td className="community-post-title">{post.title}</td>
                                        <td>{post.writer}</td>
                                        <td>{post.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="community-pl-bottom">
                            <div>
                                <Pagination
                                    pageSize={this.state.posts.pageSize}
                                    itemsCount={this.state.posts.data.length}
                                    currentPage={this.state.posts.currentPage}
                                    onPageChange={this.handlePageChange}
                                    onPagePrevious={this.handlePagePrevious}
                                    onPageNext={this.handlePageNext}
                                />
                            </div>
                            <div className="btn-write">
                                <button type="button" href="/community-write-post-page" class="btn-round btn"> 글 작성 </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CommunityFreePostList;