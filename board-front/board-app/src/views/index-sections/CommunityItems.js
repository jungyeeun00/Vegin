import React, { Component } from 'react';

class CommunityItems extends Component {
    render() {
        return (
            <>
                <div id="commItem" className="item" align="center">
                    <img id="commImg" className="item-img" alt="community_img" src={require("assets/img/community_item.jpg")} />
                    <p id="commType" className="community-type">다이어리</p>
                    <p id="commTitle" className="item-title">글 제목</p>
                    <div id="commContent" className="community-text">비건이 된 지 1주차! 오늘 나의 식단은</div>
                    <div className="community-text">
                        <span id="commWriter" className="community-text">비긴</span>|
                        <span id="commDate" className="community-text">2022.03.22</span>|
                        <span id="commType" className="community-text">다이어리</span>
                    </div>
                </div>
            </>
        );
    }
}

export default CommunityItems;