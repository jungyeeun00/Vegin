import React, { Component } from 'react';

class DiaryItems extends Component {
    constructor(props){
        super(props)

        if(this.props.board.contents !== null){
            const filteredContents = this.props.board.contents.split(/<.*?>/).join('').split(/&.*?;/).join()
            this.state = {
                filteredContents:filteredContents
            }
        }
    }
    
    render() {
        return (
            <>
                {this.props.board.contents&& 
                <div id="commItem" className="item" align="center">
                    <img id="commImg" className="item-img" alt="community_img" src={require("assets/img/community_item.jpg")} />
                    <p id="commType" className="community-type">다이어리</p>
                    <p id="commTitle" className="item-title">{this.props.board.title}</p> 
                    <div id="commContent" className="community-text">{this.state.filteredContents}</div>
                    <div className="community-text">
                        <span id="commWriter" className="community-text">{this.props.board.memberId}</span> |
                        <span id="commDate" className="community-text">{this.props.board.createdTime}</span> |
                        <span id="commType2" className="community-text">다이어리</span> 
                    </div>
                </div>}
            </>
        );
    }
}

export default DiaryItems;