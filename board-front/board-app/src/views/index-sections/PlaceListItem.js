import React, { useState } from 'react';
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Container,
    Row,
    Col
} from 'reactstrap';
import PlaceDetailItem from './PlaceDetailItem';

function PlaceListItem() {
    const [searchClick, setSearchClick] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [open, setOpen] = useState(false);
    const [showDetail, setShowDetail] = useState(false)

    const searchOnHandler = () => {
        setSearchClick(true);
    }

    const searchOffHandler = () => {
        setSearchClick(false);
    }

    const setSearchHandler = (e) => { // input 창에 onChange 이벤트
        setSearchInput(e.target.value);
    }

    const searchInputRemoveHandler = () => {
        setSearchInput('');
    }

    const [xPosition, setX] = useState('-726');

    // button 클릭 시 토글
    const toggleMenu = () => {
        if (xPosition > -1110) {
            setX('-1110');
            setOpen(true);
          } else {
            setX('-726');
            setOpen(false);
          }
    };

    const changeShowDetail = () => {
        setShowDetail(!showDetail);
        console.log(showDetail);
    }

    return (
        <>
        {showDetail && <PlaceDetailItem changeShowDetail={changeShowDetail}/>}
        <div className="pl-side" style={{ transform: `translatex(${-xPosition}px)`}}>
                <button
                    className='place-list-imgbtn'
                    type='button'
                    onClick={toggleMenu}
                    aria-controls="place-list-main"
                    aria-expanded={open}
                >
                    <img
                        className='place-list-prevBtn'
                        src={require("assets/img/close_btn.png")}
                    />
                </button>
                <div id="place-list-main" className="place-list-main">
                    <div className="place-search-bar">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input type="search" placeholder="검색하기" value={searchInput}
                            onFocus={searchOnHandler} onBlur={searchOffHandler} onChange={setSearchHandler} />
                        {searchInput.length !== 0 &&
                            <button className="btn-clear" onClick={searchInputRemoveHandler}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        }
                    </div>
                    <Container>
                        <Row>
                            <Col md="4" className="list-img-col">
                                <img className="list-img" alt="place_img" src={require("assets/img/place_item.jpg")} />
                            </Col>
                            <Col>
                                <Row className="name-category">
                                    <Col></Col>
                                    <Col xs="auto" className="place-name">
                                        <div onClick={changeShowDetail} style={{cursor: 'pointer'}}>음식점명</div>
                                    </Col>
                                    <Col className="place-category">
                                        <div>카페</div>
                                    </Col>
                                </Row>
                                <div className="place-intro">비건이 만드는 비건 케이크 & 빵</div>
                                <div className="place-address">서울 성북구 삼선교로 16길 116</div>
                                <div className="place-time">
                                    <span><FontAwesomeIcon icon={faClock} /></span>
                                    <span>11:00 ~ 20:00</span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                </div>
        </>
    );
}

export default PlaceListItem;