import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import VeginFooter from 'components/Footers/VeginFooter';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import BoardService from '../../service/BoardService';

class CreateBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            no: this.props.match.params.no,
            type: '',
            title: '',
            contents: '',
            memberId: ''
        }

        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentsHandler = this.changeContentsHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);
    }

    changeTypeHandler = (event) => {
        this.setState({ type: event.target.value });
    }

    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }

    changeContentsHandler = (event) => {
        this.setState({ contents: event });
    }

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
            BoardService.createBoard(board).then(res => {
                this.props.history.push('/board');
            });
        } else {
            BoardService.updateBoard(this.state.no, board).then(res => {
                this.props.history.push('/board');
            });
        }
    }

    cancel() {
        this.props.history.push('/board');
    }

    componentDidMount() {
        if (this.state.no === '_create') {
            return;
        } else {
            BoardService.getOneBoard(this.state.no).then(res => {
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
                                            {/* <textarea placeholder='contents' name='contents' className='form-control' value={this.state.contents} onChange={this.changeContentsHandler} /> */}
                                            <CKEditor
                                                className='wp-editor'
                                                editor={ClassicEditor}
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

export default CreateBoardComponent;