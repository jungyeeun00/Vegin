import VeginFooter from 'components/Footers/VeginFooter';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import BoardService from '../../service/BoardService';

class ReadBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            no: this.props.match.params.no,
            board: {},
            memberId:{},
        }

        this.goToUpdate = this.goToUpdate.bind(this);
    }

    componentDidMount() {
        BoardService.getOneBoard(this.state.no).then(res => {
            console.log(res.data)
            this.setState({ 
                board: res.data,
                memberId: res.data.memberId,
             });
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

    goToList() {
        this.props.history.push('/board');
    }

    goToUpdate = (event) => {
        event.preventDefault();
        this.props.history.push(`/create-board/${this.state.no}`);
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
                        <span className='post-nickname'>{this.state.memberId.id}</span>&nbsp;&nbsp;
                        <span className='post-date'>{this.returnDate(this.state.board.createdTime)}{this.state.board.createdTime}</span>
                        <hr />
                    </div>
                    <div className='post-contents' dangerouslySetInnerHTML = {{ __html: this.state.board.contents }} />
                    <br /><br />
                    <div className='post-btn'>
                        <Button className="post-btn-edit btn-round ml-1" color="info" type="button" onClick={this.goToUpdate}>
                            수정
                        </Button>
                        <Button className="post-btn-cancel btn-round ml-1" color="info" type="button" onClick={() => this.deleteView()}>
                            삭제
                        </Button>
                    </div>
                    <hr />
                    {/* 여기서부터 댓글 */}
                    <div className='post-comment-wrapper'>
                        <div className='post-comment'>
                            <hr />
                            <div className='post-comment-header'>
                                <span className='post-comment-name'>냥냥</span>&nbsp;&nbsp;
                                <span className='post-comment-date'>2022.03.30 15:00</span>
                            </div>
                            <div className='post-comment-contents'>
                                정말 멋져요
                                윤소정 이가인 정예은 편주혜
                            </div>
                        </div>
                    </div>
                    <div className='post-writecomment-wrapper'>
                        &nbsp;<span className='post-writecomment-name'>지금 로그인한 계정</span>
                        <textarea
                            id='post-writecomment'
                            placeholder='불쾌감을 주는 욕설과 악플은 삭제될 수 있습니다.'>
                        </textarea>
                        <div className='post-commentwrite-btn-wrapper'>
                            <Button className="post-commentwrite-btn btn-round ml-1" color="info" type="button" >
                                등록
                            </Button>
                        </div>
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