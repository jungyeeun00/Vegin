import VeginFooter from 'components/Footers/VeginFooter';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button } from 'reactstrap';
import MemberService from 'service/MemberService';
import BoardService from '../../service/BoardService';

class ReadBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            no: this.props.match.params.no,
            board: {},
            comments: [],
            content: ''
        }

        this.goToUpdate = this.goToUpdate.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
    }

    componentDidMount() {
        BoardService.getOneBoard(this.state.no).then(res => {
            this.setState({ board: res.data });
        })

        BoardService.getComments(this.state.no).then(res => {
            this.setState({ comments: res.data });
        })
    }

    returnBoardType(typeNo) {
        let type = null;
        if (typeNo == 1) {
            type = "자유게시판";
        } else if (typeNo == 2) {
            type = "다이어리";
        } else {
            type = "type 미지정";
        }

        return (
            <div className='row'>
                <label>Board Type : </label>{type}
            </div>
        )
    }

    returnCurrentMember() {
        let currentMember = null;
        if (MemberService.getCurrentMember() == null)
            currentMember = "댓글 작성 시 로그인 필요";
        else
            currentMember = MemberService.getCurrentMember();
        
        return currentMember;
    }

    goToList() {
        this.props.history.push('/board');
    }

    goToUpdate = (event) => {
        event.preventDefault();
        this.props.history.push(`/create-board/${this.state.no}`);
    }

    changeContentHandler = (event) => {
        this.setState({ content: event.target.value });
    }

    deleteView = async function () {
        if (window.confirm("정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구할 수 없습니다")) {
            BoardService.deleteBoard(this.state.no).then(res => {
                console.log("delete result => " + JSON.stringify(res));
                if (res.status == 200) {
                    this.props.history.push('/board');
                } else {
                    alert("글 삭제가 실패했습니다.");
                }
            });
        }
    }

    createComment = (event) => {
        //event.preventDefault();
        let comment = {
            boardNo: this.state.no,
            memberId: MemberService.getCurrentMember(),
            content: this.state.content
        };
        console.log("comment => " + JSON.stringify(comment));
        BoardService.createComment(comment).then(res => {
            window.location.reload();
        });
        // if (this.state.comment_no === '_create') {
        //     BoardService.createComment(comment).then(res => {
        //         window.location.reload();
        //     });
        // } else {
        //     BoardService.updateComment(this.state.no, comment).then(res => {
        //         window.location.reload();
        //     });
        // }
    }

    deleteComment = async function (commentId) {
        if (window.confirm("정말로 댓글을 삭제하시겠습니까?\n삭제된 댓글은 복구할 수 없습니다")) {
            BoardService.deleteComment(this.state.no, commentId).then(res => {
                console.log("delete result => " + JSON.stringify(res));
                window.location.reload();
            }).catch(error => alert("댓글 삭제가 실패했습니다."));
        }
    }

    returnDate(cTime){
        console.log(typeof(cTime));
    }

    render() {
        return (
            <>
                <IndexNavbar />
                <div className='post-wrapper'>
                    <div className='post-header'>
                        <h3 className='post-title'>
                            {this.state.board.title}
                        </h3>
                        <span className='post-nickname'>{this.state.board.memberId}</span>&nbsp;&nbsp;
                        <span className='post-date'>{this.returnDate(this.state.board.createdTime)}{this.state.board.createdTime}</span>
                        <hr />
                    </div>
                    <div className='post-contents'>
                        {this.state.board.contents}
                    </div>
                    <br /><br />
                    <div className='post-btn'>
                        <Button className="post-btn-edit btn-round ml-1" type="button" onClick={this.goToUpdate}>
                            수정
                        </Button>
                        <Button className="post-btn-cancel btn-round ml-1" type="button" onClick={() => this.deleteView()}>
                            삭제
                        </Button>
                    </div>
                    <hr />
                    {/* 여기서부터 댓글 */}
                    <div className='post-writecomment-wrapper'>
                        &nbsp;<span className='post-writecomment-name'>{this.returnCurrentMember()}</span>
                        <textarea
                            id='post-writecomment'
                            placeholder='불쾌감을 주는 욕설과 악플은 삭제될 수 있습니다.'
                            onChange={this.changeContentHandler}>
                        </textarea>
                        <div className='post-commentwrite-btn-wrapper'>
                            <Button className="post-commentwrite-btn btn-round ml-1" type="button" onClick={() => this.createComment()}>
                                등록
                            </Button>
                        </div>
                    </div>
                    <div className='post-comment-wrapper'>
                        {
                            this.state.comments.map((comment) => (
                                <div className='post-comment'>
                                    <hr />
                                    <div className='post-comment-header'>
                                        <span className='post-comment-name'>{comment.member.name}</span>&nbsp;&nbsp;
                                        <span className='post-comment-date'>{comment.created_date.substring(0, 16)}</span>
                                    </div>
                                    <div className='post-comment-contents'>
                                        <span className='post-comment-content'>{comment.content}</span>
                                    </div>
                                    {MemberService.getCurrentMember() == comment.member.id &&
                                        <div className='post-comment-btn-wrapper'>
                                            <Button className="post-comment-btn-edit btn-round ml-1" type="button">수정</Button>
                                            <Button className="post-comment-btn-cancel btn-round ml-1" type="button" onClick={() => this.deleteComment(comment.id)}>삭제</Button>
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <div className='post-gotolist-btn-wrapper'>
                        <Button className="post-gotolist-btn btn-round ml-1"
                            type="button"
                            onClick={this.goToList.bind(this)}>
                            목록
                        </Button>
                    </div>
                </div>
                <VeginFooter />
            </>
        );
    }
}

export default ReadBoardComponent;