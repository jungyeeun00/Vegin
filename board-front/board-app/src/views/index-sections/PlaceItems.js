import React, { Component } from 'react';
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PlaceItems extends Component {
    render() {
        return (
            <>
                <div id="placeItem" className="item" align="center">
                    <img id="placeImg" className="item-img" alt="place_img" src={require("assets/img/place_item.jpg")} />
                    <p id="placeTitle" className="item-title">음식점명</p>
                    <div className="place-text">
                        <span id="placeType" className="place-text">카페</span>|
                        <span id="placeAddr" className="place-text"> 서울특별시 성북구 삼선동 삼선교로16길 116</span>
                    </div>
                    <div id="placeIntro" className="place-text">비건이 만드는 비건 케이크 & 빵</div>
                    <div id="placeTime" className="place-text">
                        <FontAwesomeIcon icon={faClock} /> 11:00 - 20:00
                    </div>
                </div>
            </>
        );
    }
}

export default PlaceItems;