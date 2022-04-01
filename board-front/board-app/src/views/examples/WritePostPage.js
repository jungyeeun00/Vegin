import React from 'react';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import VeginFooter from 'components/Footers/VeginFooter';
import { Button } from 'reactstrap';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import 'assets/scss/paper-kit/_writepost.scss'

const WritePostPage = ({ history }) => {
    return (
        <>
            <IndexNavbar />
            <div className='wp-wrapper'>
                <div className='wp-title-wrapper'>
                    <input className='wp-title'
                            placeholder='제목'/>
                </div>
                <CKEditor
                    className='wp-editor'
                    editor={ClassicEditor}
                    //data='<p>Hello from CKEditor 5!</p>'
                    onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log(data);
                    }}
                />
                <div className='wp-post-btn-wrapper'>
                    <Button className="wp-post-btn btn-round ml-1" type="button"
                        onClick={() => history.goBack()}>
                        취소
                    </Button>
                    <Button className="wp-post-btn btn-round ml-1" type="button" >
                        등록
                    </Button>
                </div>
            </div>
            <VeginFooter/>
        </>
    );
}

export default WritePostPage;