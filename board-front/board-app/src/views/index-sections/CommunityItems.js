import React, { Component } from 'react';

class CommunityItems extends Component {
    render() {
        return (
            <>
                {/* 커뮤니티 아이템 */}
                <div id="commItem" className="item" align="center">
                    {/* 커뮤니티 이미지 */}
                    <img id="commImg" className="item-img" alt="community_img" src={require("assets/img/community_item.jpg")} />
                    <p id="commType" className="community-type">다이어리</p>    {/* 커뮤니티 유형 */}
                    <p id="commTitle" className="item-title">글 제목</p>        {/* 글 제목 */}
                    <div id="commContent" className="community-text">비건이 된 지 1주차! 오늘 나의 식단은</div> {/* 글 내용 */}
                    <div className="community-text">
                        <span id="commWriter" className="community-text">비긴</span>|       {/* 작성자 */}
                        <span id="commDate" className="community-text">2022.03.22</span>|   {/* 작성일 */}
                        <span id="commType" className="community-text">다이어리</span>       {/* 커뮤니티 유형 */}
                    </div>
                </div>
            </>
        );
    }
}

export default CommunityItems;