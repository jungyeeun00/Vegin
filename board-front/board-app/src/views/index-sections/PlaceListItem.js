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
import PlaceItem from './PlaceItem';

function PlaceListItem() {
    const [searchClick, setSearchClick] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [open, setOpen] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [dir, setDir] = useState('next');

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

    const [xPosition, setX] = useState('-741');

    // button 클릭 시 토글
    const toggleMenu = () => {
        if (xPosition > -1125) {
            setX('-1125');
            setOpen(true);
            setDir('back');
        } else {
            setX('-741');
            setOpen(false);
            setDir('next');
        }
    };

    const changeShowDetail = () => {
        setShowDetail(!showDetail);
        console.log(showDetail);
    }

    return (
        <>
            {showDetail && <PlaceDetailItem changeShowDetail={changeShowDetail} />}
            {!showDetail &&
            <div className="pl-side" style={{ transform: `translatex(${-xPosition}px)` }}>
                <button
                    className='place-list-imgbtn'
                    type='button'
                    onClick={toggleMenu}
                    aria-controls="place-list-main"
                    aria-expanded={open}
                >
                    <img
                        className='place-list-prevBtn'
                        src={require(`assets/img/${dir}.png`)}
                    />
                </button>
                <div id="place-list-main" className="place-list-main">
                    <div className="place-search-bar">
                        <span className='place-search-icon'> <FontAwesomeIcon icon={faMagnifyingGlass} /> </span>
                        <input type="search" placeholder="검색하기" value={searchInput}
                            onFocus={searchOnHandler} onBlur={searchOffHandler} onChange={setSearchHandler} />
                        {searchInput.length !== 0 &&
                            <button className="btn-clear" onClick={searchInputRemoveHandler}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        }
                    </div>
                    <Container>
                        <PlaceItem changeShowDetail={changeShowDetail}/>
                        <PlaceItem changeShowDetail={changeShowDetail}/>
                        <PlaceItem changeShowDetail={changeShowDetail}/>
                        <PlaceItem changeShowDetail={changeShowDetail}/>
                        <PlaceItem changeShowDetail={changeShowDetail}/>
                        <PlaceItem changeShowDetail={changeShowDetail}/>
                        <PlaceItem changeShowDetail={changeShowDetail}/>
                        <PlaceItem changeShowDetail={changeShowDetail}/>
                        <PlaceItem changeShowDetail={changeShowDetail}/>
                    </Container>
                </div>
            </div>
            }
        </>
    );
}

export default PlaceListItem;