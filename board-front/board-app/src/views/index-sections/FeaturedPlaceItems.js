import React, { Component } from 'react';
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FeaturedPlaceItems extends Component {
    render() {
        return (
            <>
            <ul className='place-best-table'>
                {/* 음식점 아이템 */}
                <li>
                <div id="placeItem" className="item" align="center">
                    {/* 음식점 이미지 */}
                    <a href='https://www.plantcafeseoul.com/about'>
                    <img id="placeImg" className="item-img" alt="place_img" src="https://static.wixstatic.com/media/4832ca_da4104f0dbe845b296c3ad024fd3cede~mv2.jpg/v1/fill/w_750,h_743,al_c,q_85,enc_auto/986B08D6-4CEB-4080-9D97-E84FD78EFD00_JPG.jpg" />
                    <p id="placeTitle" className="item-title">플랜트</p>  {/* 음식점명 */}
                    <div className="place-text">
                        <span id="placeType" className="place-text">카페</span>|                                      {/* 음식점 유형 */}
                        <span id="placeAddr" className="place-text">서울 용산구 보광로 117 2층 </span>   {/* 주소 */}
                    </div>
                    <div id="placeIntro" className="place-text">카페, 빵집, 샌드위치, 케이크</div>    {/* 소개글 */}
                    <div id="placeTime" className="place-text">                                       {/* 영업 시간 */}
                        <FontAwesomeIcon icon={faClock} /> 11:00 - 22:00
                    </div>
                    </a>
                </div>
                </li>
                <li>
                <div id="placeItem" className="item" align="center">
                    {/* 음식점 이미지 */}
                    <a href='http://instagram.com/nammiplantlab'>
                    <img id="placeImg" className="item-img" alt="place_img" src="https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190901_184%2F15673131572767OLad_JPEG%2FwhmdB_x71YRdmdqJiTCymJur.jpg" />
                    <p id="placeTitle" className="item-title">남미플랜트랩</p>  {/* 음식점명 */}
                    <div className="place-text">
                        <span id="placeType" className="place-text">퓨전음식</span>|                                      {/* 음식점 유형 */}
                        <span id="placeAddr" className="place-text">서울 서초구 방배천로4안길 55 2층 </span>   {/* 주소 */}
                    </div>
                    <div id="placeIntro" className="place-text">남미플랜트랩은 "100% 비건" 음식</div>    {/* 소개글 */}
                    <div id="placeTime" className="place-text">                                       {/* 영업 시간 */}
                        <FontAwesomeIcon icon={faClock} /> 12:00 - 21:00
                    </div>
                    </a>
                </div>
                </li>
                <li>
                <div id="placeItem" className="item" align="center">
                    <a href='https://www.instagram.com/godny_cafe'>
                    {/* 음식점 이미지 */}
                    <img id="placeImg" className="item-img" alt="place_img" src="https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210906_193%2F1630885118843Kflas_JPEG%2Fkh9YNNG4OoG2Cfm7LA04N-21.jpeg.jpg" />
                    <p id="placeTitle" className="item-title">고드니</p>  {/* 음식점명 */}
                    <div className="place-text">
                        <span id="placeType" className="place-text">카페,디저트</span>|                                      {/* 음식점 유형 */}
                        <span id="placeAddr" className="place-text">서울 강서구 마곡중앙로 161-1 캐슬파크 2층 220호</span>   {/* 주소 */}
                    </div>
                    <div id="placeIntro" className="place-text">비건, 글루텐프리 재료 사용</div>    {/* 소개글 */}
                    <div id="placeTime" className="place-text">                                       {/* 영업 시간 */}
                        <FontAwesomeIcon icon={faClock} /> 11:00 - 21:00
                    </div>
                    </a>
                </div>  
                </li>
                <li>
                <div id="placeItem" className="item" align="center">
                    {/* 음식점 이미지 */}
                    <a href='https://blog.naver.com/pulmuonefnc'>
                    <img id="placeImg" className="item-img" alt="place_img" src="https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f180_180&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220520_52%2F1653020030776SlSN2_JPEG%2F220518_plantude-13158.jpg" />
                    <p id="placeTitle" className="item-title">플랜튜드</p>  {/* 음식점명 */}
                    <div className="place-text">
                        <span id="placeType" className="place-text">퓨전음식</span>|                                      {/* 음식점 유형 */}
                        <span id="placeAddr" className="place-text">서울 강남구 영동대로 513 스타필드 지하1층 I-111호</span>   {/* 주소 */}
                    </div>
                    <div id="placeIntro" className="place-text">기본에 충실한 식물성 식단</div>    {/* 소개글 */}
                    <div id="placeTime" className="place-text">                                       {/* 영업 시간 */}
                        <FontAwesomeIcon icon={faClock} /> 11:00 - 21:30
                    </div>
                    </a>
                </div>
                </li>
            </ul>
            </>
        );
    }
}

export default FeaturedPlaceItems;