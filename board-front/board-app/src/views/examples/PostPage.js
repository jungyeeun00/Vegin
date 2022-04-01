import React from 'react';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import VeginFooter from 'components/Footers/VeginFooter';
import { Button } from 'reactstrap';
import 'assets/scss/paper-kit/_post.scss'

const PostPage = ({ history }) => {
    return (
        <>
            <IndexNavbar />
            <div className='post-wrapper'>
                {/* 여기부터 게시글 */}
                <div>
                    <div className='post-header'>
                        <h3 className='post-title'>
                            이것은 제목
                        </h3>
                        <span className='post-nickname'>냠냠</span>&nbsp;&nbsp;
                        <span className='post-date'>2022.03.30 14:00</span>
                        <hr />
                    </div>
                    <div className='post-contents'>
                        내가 뭘 어쩌겠어 나는 너가 없으면<br />
                        낡은 로봇처럼 맘이 멈추고 늘 차가워<br />
                        우린 뭘 어쩌겠어 너는 내가 없으면 Yeh<br />
                        나랑 똑같이 힘들 텐데 뭘 어쩌겠어 우리 Yeh<br />
                        Baby 우리의 따뜻함을 그대로 간직하고 싶어<br />
                        어떤 누구라도 우리 사이 풀지 못해서<br />
                        Tell me 나의 너 Tell me 나의 너<br />
                        말 좀 해줘 내 안에서<br />
                        난 네 마음 안에서 발버둥 치고 있어<br />
                        덜컥 겁이 나는걸<br />
                        어쩌겠어 난 너가 없으면<br />
                        내 마음 편히 기댈 집이 없어
                    </div>
                    <br /><br />
                    <div className='post-btn'>
                        <Button className="post-btn-edit btn-round ml-1" color="info" type="button">
                            수정
                        </Button>
                        <Button className="post-btn-cancel btn-round ml-1" color="info" type="button">
                            삭제
                        </Button>
                    </div>
                    <hr />
                </div>
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
                        <hr />
                    </div>
                </div>
                <div className='post-writecomment-wrapper'>
                    &nbsp;<span className='post-writecomment-name'>호호</span>
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
                        onClick={() => history.goBack()}>
                        목록
                    </Button>
                </div>
            </div>
            <VeginFooter />
        </>
    );
}

export default PostPage;