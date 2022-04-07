import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

function PlaceListItem() {
    const [searchClick, setSearchClick] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [open, setOpen] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [dir, setDir] = useState('next');
    const [places ,setPlaces] = useState(null);
    const [place, setPlace] = useState(null);

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

    useEffect(() => {
        axios
        .get('http://openapi.seoul.go.kr:8088/41497a6663656b6634335950466b78/json/CrtfcUpsoInfo/1/1000/')
        .then((response) => {
            // setPlaces(response['data']['CrtfcUpsoInfo']['row']);
            const res = response['data']['CrtfcUpsoInfo']['row'];

            const result = res.filter( it => it.CRTFC_GBN=='14')
            setPlaces(result);
        })
        .catch((e) => {
            console.log(e);
        })
    }, []);
    // console.log(JSON.stringify(places));

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

    const changeShowDetail = (data) => {
        setPlace(data);
        setShowDetail(!showDetail);
    }

    if(!places){
        return null;
    }

    return (
        <>
            {showDetail && <PlaceDetailItem changeShowDetail={changeShowDetail} place={place} />}
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
                        {places.map((place) => (
                            <PlaceItem key={place.CRTFC_UPSO_MGT_SNO} changeShowDetail={() => changeShowDetail(place)} place={place}/>
                        ))}
                    </Container>
                </div>
            </div>
            }
        </>
    );
}

export default PlaceListItem;