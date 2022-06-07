import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import VeginFooter from 'components/Footers/VeginFooter';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import BoardService from '../../service/BoardService';

class CreateDiaryComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            no: this.props.match.params.no,
            type: '',
            title: '',
            contents: '',
            memberId: '',
            editorConfiguration: {
                toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "blockQuote", "insertTable", "|", "undo", "redo"]
            }
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentsHandler = this.changeContentsHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);
    }

    /* 타이틀 입력 */
    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }

    /* 내용 입력 */
    changeContentsHandler = (event) => {
        this.setState({ contents: event });
    }

    /* 글 생성 */
    createBoard = (event) => {
        event.preventDefault();
        let board = {
            type: this.state.type,
            title: this.state.title,
            contents: this.state.contents,
            memberId: localStorage.getItem("member")
        };
        console.log("board => " + JSON.stringify(board));
        if (this.state.no === '_create') {
            /* 새 글 생성 */
            BoardService.createDiary(board).then(res => {
                this.props.history.push('/diary');
            });
        } else {
            /* 기존 글 수정 */
            BoardService.updateDiary(this.state.no, board).then(res => {
                this.props.history.push('/read-diary/' + this.state.no);
            });
        }
    }

    /* 취소버튼 클릭 시 목록으로 이동 */
    cancel() {
        this.props.history.push('/diary');
    }

    componentDidMount() {
        if (this.state.no === '_create') {
            return;
        } else {
            /* 수정 시 기존 글 내용 불러옴 */
            BoardService.getOneDiary(this.state.no).then(res => {
                let board = res.data;
                console.log("board => " + JSON.stringify(board));

                this.setState({
                    type: board.type,
                    title: board.title,
                    contents: board.contents,
                    memberId: board.memberId
                });
            });
        }
    }

    render() {
        return (
            <>
                <IndexNavbar />
                <div>
                    <div className='wp-wrapper'>
                        <div className='row'>
                                <div className='card-body'>
                                    <form>
                                        <div className='form-group'>
                                            <label>Title</label>
                                            <input type="text" placeholder='title' name='title' className='form-control' value={this.state.title} onChange={this.changeTitleHandler} />
                                        </div>
                                        <div className='form-group'>
                                            <label>MemberId</label>
                                            <input placeholder='memberId' name='memberId' className='form-control' value={localStorage.getItem("member")} style={{pointerEvents:'none'}}/>
                                        </div>
                                        <div className='form-group'>
                                            <label>Contents</label>
                                            <CKEditor
                                                className='wp-editor'
                                                editor={ClassicEditor}
                                                config={this.state.editorConfiguration}
                                                value={this.state.contents}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    this.changeContentsHandler(data);
                                                }}
                                                onReady={(editor) => {
                                                    editor.setData(this.state.contents);
                                                  }}
                                            />
                                        </div>
                                        <div className='wp-post-btn-wrapper'>
                                            <Button className="wp-post-btn btn-round ml-1" type='button' onClick={this.createBoard}>등록</Button>
                                            <Button className="wp-post-btn btn-round ml-1" type='button' onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>취소</Button>
                                        </div>
                                    </form>
                                </div>
                        </div>
                    </div>
                </div>
                <VeginFooter />
            </>
        );
    }
}

export default CreateDiaryComponent;