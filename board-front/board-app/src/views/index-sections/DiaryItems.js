import React, { Component } from 'react';

class DiaryItems extends Component {
    constructor(props){
        super(props)

        const ddd = this.props.board.contents.split(/<.*?>/).join('').split(/&.*?;/).join()
        this.state = {
            filteredContents:ddd
        }
    }
    
    render() {
        return (
            <>
                {/* 다이어리 아이템 */}
                <div id="commItem" className="item" align="center">
                    {/* 다이어리 이미지 */}
                    <img id="commImg" className="item-img" alt="community_img" src={require("assets/img/community_item.jpg")} />
                    <p id="commType" className="community-type">다이어리</p>    {/* 커뮤니티 유형 */}
                    <p id="commTitle" className="item-title">{this.props.board.title}</p>        {/* 글 제목 */}
                    <div id="commContent" className="community-text">{this.state.filteredContents}</div> {/* 글 내용 */}
                    <div className="community-text">
                        <span id="commWriter" className="community-text">{this.props.board.memberId}</span> |      {/* 작성자 */}
                        <span id="commDate" className="community-text">{this.props.board.createdTime}</span> |  {/* 작성일 */}
                        <span id="commType2" className="community-text">다이어리</span>      {/* 커뮤니티 유형 */}
                    </div>
                </div>
            </>
        );
    }
}

export default DiaryItems;