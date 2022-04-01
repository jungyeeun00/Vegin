import React, { Component } from 'react';
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FeaturedPlaceItems extends Component {
    render() {
        return (
            <>
                {/* 음식점 아이템 */}
                <div id="placeItem" className="item" align="center">
                    {/* 음식점 이미지 */}
                    <img id="placeImg" className="item-img" alt="place_img" src={require("assets/img/place_item.jpg")} />
                    <p id="placeTitle" className="item-title">음식점명</p>  {/* 음식점명 */}
                    <div className="place-text">
                        <span id="placeType" className="place-text">카페</span>|                                      {/* 음식점 유형 */}
                        <span id="placeAddr" className="place-text"> 서울특별시 성북구 삼선동 삼선교로16길 116</span>   {/* 주소 */}
                    </div>
                    <div id="placeIntro" className="place-text">비건이 만드는 비건 케이크 & 빵</div>    {/* 소개글 */}
                    <div id="placeTime" className="place-text">                                       {/* 영업 시간 */}
                        <FontAwesomeIcon icon={faClock} /> 11:00 - 20:00
                    </div>
                </div>
            </>
        );
    }
}

export default FeaturedPlaceItems;