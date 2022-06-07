import VeginFooter from 'components/Footers/VeginFooter';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import React, { Component } from 'react';
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
            content: '',
            updating: {
                now: false,
                commentId: ''
            }
        }

        this.goToUpdate = this.goToUpdate.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
    }

    componentDidMount() {
        /* 서버에서 글 정보 가져오기 */        
        BoardService.getOneBoard(this.state.no).then(res => {
            this.setState({ board: res.data });
        })
        /* 서버에서 댓글 정보 가져오기 */
        BoardService.getComments(this.state.no).then(res => {
            this.setState({ comments: res.data });
        })
    }

    /* 로그인 한 유저 정보 가져오기 */
    returnCurrentMember() {
        let currentMember = null;
        if (MemberService.getCurrentMember() == null)
            currentMember = "댓글 작성 시 로그인 필요";
        else
            currentMember = MemberService.getCurrentMember();
        
        return currentMember;
    }

    /* 목록으로 돌아가기 */
    goToList() {
        this.props.history.goBack();
    }

    /* 글 수정으로 이동 */
    goToUpdate = (event) => {
        event.preventDefault();
        this.props.history.push(`/create-board/${this.state.no}`);
    }

    /* 댓글 수정 상태로 업데이트 */
    changeUpdating = (commentId) => {
        this.setState({
            updating: {
                now: !this.state.updating.now,
                commentId: commentId
            }
        });
    }

    /* onChange 이벤트 발생 시 댓글 내용 저장 */
    changeContentHandler = (event) => {
        this.setState({ content: event.target.value });
    }

    /* 글 삭제 */
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

    /* 댓글 생성 */
    createComment = () => {
        if (MemberService.getCurrentMember() != null) {
            let comment = {
                boardNo: this.state.no,
                memberId: MemberService.getCurrentMember(),
                content: this.state.content
            };
            console.log("comment => " + JSON.stringify(comment));
            BoardService.createComment(comment).then(res => {
                window.location.reload();
            });
        } else
            alert("로그인 후 이용 바랍니다.")
    }

    /* 댓글 수정 */
    updateComment = (commentId) => {
        let comment = {
            boardNo: this.state.no,
            memberId: MemberService.getCurrentMember(),
            content: this.state.content
        };
        console.log("comment => " + JSON.stringify(comment));
        BoardService.updateComment(commentId, comment).then(res => {
            window.location.reload();
        });
    }

    /* 댓글 삭제 */
    deleteComment = async function (commentId) {
        if (window.confirm("정말로 댓글을 삭제하시겠습니까?\n삭제된 댓글은 복구할 수 없습니다")) {
            BoardService.deleteComment(this.state.no, commentId).then(res => {
                console.log("delete result => " + JSON.stringify(res));
                window.location.reload();
            }).catch(error => alert("댓글 삭제가 실패했습니다."));
        }
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
                        <span className='post-date'>{this.state.board.createdTime}</span>
                        <span className='post-view'>조회수 &nbsp;{this.state.board.counts}</span>
                        <hr />
                    </div>
                    <div className='post-contents' dangerouslySetInnerHTML = {{ __html: this.state.board.contents }} />
                    <br /><br />
                    {MemberService.getCurrentMember() == this.state.board.memberId &&
                        <div className='post-btn'>
                            <Button className="post-btn-edit btn-round ml-1" type="button" onClick={this.goToUpdate}>
                                수정
                            </Button>
                            <Button className="post-btn-cancel btn-round ml-1" type="button" onClick={() => this.deleteView()}>
                                삭제
                            </Button>
                        </div>
                    }
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
                                        <span className='post-comment-name'>{comment.member.id}</span>&nbsp;&nbsp;
                                        <span className='post-comment-date'>{comment.created_date.substring(0, 16)}</span>
                                    </div>
                                    <div className='post-comment-contents'>
                                        {!this.state.updating.now && <span className='post-comment-content'>{comment.content}</span>}
                                        {this.state.updating.now && this.state.updating.commentId == comment.id &&
                                            <div className='post-updatecomment-wrapper'>
                                                <textarea
                                                    id='post-updatecomment'
                                                    placeholder='불쾌감을 주는 욕설과 악플은 삭제될 수 있습니다.'
                                                    defaultValue={comment.content}
                                                    onChange={this.changeContentHandler}>
                                                </textarea>
                                                <div className='post-commentupdate-btn-wrapper'>
                                                    <Button className="post-commentupdate-btn btn-round ml-1" type="button" onClick={() => this.updateComment(comment.id)}>
                                                        등록
                                                    </Button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    {MemberService.getCurrentMember() == comment.member.id && !this.state.updating.now &&
                                        <div className='post-comment-btn-wrapper'>
                                            <Button className="post-comment-btn-edit btn-round ml-1" type="button" onClick={() => this.changeUpdating(comment.id)}>수정</Button>
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