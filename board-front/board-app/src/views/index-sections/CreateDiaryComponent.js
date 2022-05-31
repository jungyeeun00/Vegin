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
            memberId: ''
        }

        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentsHandler = this.changeContentsHandler.bind(this);
        this.changeMemberNoHandler = this.changeMemberNoHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);
    }

    changeTypeHandler = (event) => {
        this.setState({ type: event.target.value });
    }

    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }

    changeContentsHandler = (event) => {
        // this.setState({ contents: event.target.value });
        console.log(event);
        this.setState({ contents: event });
    }

    changeMemberNoHandler = (event) => {
        this.setState({ memberId: event.target.value });
    }

    createBoard = (event) => {
        event.preventDefault();
        let board = {
            type: this.state.type,
            title: this.state.title,
            contents: this.state.contents,
            memberId: this.state.memberId
        };
        console.log("board => " + JSON.stringify(board));
        if (this.state.no === '_create') {
            BoardService.createDiary(board).then(res => {
                this.props.history.push('/diary');
            });
        } else {
            BoardService.updateDiary(this.state.no, board).then(res => {
                this.props.history.push('/read-diary/' + this.state.no);
            });
        }
    }

    cancel() {
        this.props.history.push('/diary');
    }

    // getTitle() {
    //     if (this.state.no === '_create') {
    //         return <h3 className='text-center'>새 글을 작성해주세요</h3>
    //     } else {
    //         return <h3 className='text-center'>{this.state.no}글을 수정합니다.</h3>
    //     }
    // }

    componentDidMount() {
        if (this.state.no === '_create') {
            return;
        } else {
            BoardService.getOneDiary(this.state.no).then(res => {
                let board = res.data;
                console.log("board => " + JSON.stringify(board));

                this.setState({
                    type: board.type,
                    title: board.title,
                    contents: board.contents,
                    memberNo: board.memberNo
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
                                            <input placeholder='memberId' name='memberId' className='form-control' value={this.state.memberId} onChange={this.changeMemberNoHandler} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Contents</label>
                                            {/* <textarea placeholder='contents' name='contents' className='form-control' value={this.state.contents} onChange={this.changeContentsHandler} /> */}
                                            <CKEditor
                                                // enterMode=CKEDITOR.ENTER_BR
                                                className='wp-editor'
                                                editor={ClassicEditor}
                                                //data='<p>Hello from CKEditor 5!</p>'
                                                value={this.state.contents}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    console.log(data);
                                                    this.changeContentsHandler(data);
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