import React, { Component } from 'react';
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from '../index-sections/Pagination';
import { Paginate } from '../index-sections/Paginate';
import BoardService from 'service/BoardService';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import VeginFooter from 'components/Footers/VeginFooter';
import { Nav, NavItem, NavLink } from 'reactstrap';

class MyDiaryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: {
                data: [
                ], // 글 정보
                pageSize: 10, // 한 페이지에 보여줄 아이템(글 목록) 개수
                currentPage: 1 // 현재 활성화된 페이지 위치
            },
        };
    }

    componentDidMount(){
        BoardService.getAllDiarys().then((res) => {
            const myposts = res.data.filter(it => {
                return it.memberId===localStorage.getItem("member");
            })
            this.setState({
                posts:{
                    data: myposts,
                    pageSize:10,
                    currentPage:1
                },
            });
        });
    }

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
        if (this.state.posts.currentPage > 1) {
            this.setState({
                posts: {
                    data: this.state.posts.data,
                    pageSize: this.state.posts.pageSize,
                    currentPage: this.state.posts.currentPage - 1
                }
            });
        }
    }

    handlePageNext = () => {
        if(Math.ceil(this.state.posts.data.length / this.state.posts.pageSize) > this.state.posts.currentPage){
            this.setState({
                posts: {
                    data: this.state.posts.data,
                    pageSize: this.state.posts.pageSize,
                    currentPage: this.state.posts.currentPage + 1
                }
            });
        }
    }

    pagedPosts = () => {
        return Paginate(this.state.posts.data, this.state.posts.currentPage, this.state.posts.pageSize);
    }

    readBoard(no) {
        this.props.history.push(`/read-diary/${no}`)
    }

    render() {
        return (
            <>
            <IndexNavbar/>
            <div className="community-main">
                <div className="community-pl-main">
                <h3 id="commLabel">내가 쓴 글</h3>
                <br/>
                <div className="community-navtab">
                <Nav id="tabs" role="tablist" tabs>
                    <NavItem>
                        <NavLink id="free" href='/mypost-page'
                        >
                            자유게시판
                        </NavLink>
                    </NavItem>
                    <text> | </text>
                    <NavItem style={{borderBottom: "3px solid #4A8451"}}>
                        <NavLink id="diary"  style={
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
                                        <td scope="row">{post.no}</td>
                                        <td className="community-post-title" onClick={() => this.readBoard(post.no)}>{post.title}</td>
                                        <td>{post.memberId}</td>
                                        <td>{post.createdTime}</td>
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
                        </div>
                    </div>
                </div>
            </div>
            <VeginFooter/>
            </>
        );
    }
}

export default MyDiaryPage;