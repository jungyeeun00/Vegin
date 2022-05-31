/* global kakao */
import VeginFooter from 'components/Footers/VeginFooter';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import PlaceDetailItem from 'views/index-sections/PlaceDetailItem';
import PlaceService from 'service/PlaceService';
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlaceItem from 'views/index-sections/PlaceItem';

const PlacePage = () => {
    const [tables, setTables] = useState([]);
    const [map, setMap] = useState();
    const [searchClick, setSearchClick] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [open, setOpen] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [dir, setDir] = useState('next');
    const [table, setTable] = useState(null);
    const [xPosition, setX] = useState('-741');
    const [orgTable, setorgTable] = useState([]);

    useEffect(() => {
        //place_info table 불러오기
        PlaceService.getPlaces().then((res) => {
            setTables(res.data);
            setorgTable(res.data);
        })

        //kakao map 생성
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(37.58201688858207, 127.00191330927217),
            level: 3
        };
        setMap(new kakao.maps.Map(container, options));

        if (!tables) {
            return null;
        }
    }, []);

    //마커 표시
    function showMarkers() {
        tables.map(element => {
            const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(element.y_DNTS, element.x_CNTS),
                title: element.upso_NM,
            });
            // 마커에 표시할 인포윈도우를 생성 
            var infowindow = new kakao.maps.InfoWindow({
                content: `
                <div style='width:max-content'>
                <div style='color: black; font-size:17px; font-weight:bold; margin:5px 5px 0 5px'>${element.upso_NM}</div>
                <div style='margin:0px 5px; font-weight:bold; font-size:13px;'>☎${element.tel_NO}</div>
                <div style='font-size:12px; margin:0px 5px 5px 5px'>${element.rdn_CODE_NM}</div>
                </div>
                `
            });
            kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
            kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
            kakao.maps.event.addListener(marker, 'click', function () {
                changeShowDetail(element);
            });
        });
    }
    showMarkers();

    function makeOverListener(map, marker, infowindow) {
        return function () {
            infowindow.open(map, marker);
        };
    }

    function makeOutListener(infowindow) {
        return function () {
            infowindow.close();
        };
    }

    //지도 위치 이동
    const moveMapCenter = (el) => {
        // 이동할 위도 경도 위치를 생성
        var moveLatLon = new kakao.maps.LatLng(el.y_DNTS, el.x_CNTS);
        // 지도 중심을 이동
        map.setCenter(moveLatLon);
    }

    const searchOnHandler = () => {
        setSearchClick(true);
    }
    const searchOffHandler = () => {
        setSearchClick(false);
    }

    const setSearchHandler = () => { // input 창에 onChange 이벤트
        var n_tables = orgTable.filter(it => {
            return it.upso_NM.includes(searchInput);
        });
        setTables(n_tables);    //필터가 여러번 되면서 걸러짐
    }

    const setSearchContent = (e) => {
        setSearchInput(e.target.value);
    }

    const searchInputRemoveHandler = () => {
        setSearchInput('');
        setTables(orgTable);
    }

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

    //PlaceDetailItem 보이기
    const changeShowDetail = (data) => {
        if (!showDetail) {
            moveMapCenter(data);

            var n_y_DNTS = 0.0003 + parseFloat(data.y_DNTS);

            var iwContent = `
            <div style='width:max-content'>
            <div style='color: black; font-size:17px; font-weight:bold; margin:5px 5px 0 5px'>${data.upso_NM}</div>
            <div style='margin:0px 5px; font-weight:bold; font-size:13px;'>☎${data.tel_NO}</div>
            <div style='font-size:12px; margin:0px 5px 5px 5px'>${data.rdn_CODE_NM}</div>
            </div>
            `,
                iwPosition = new kakao.maps.LatLng(n_y_DNTS, data.x_CNTS), //인포윈도우 표시 위치
                iwRemoveable = true; //인포윈도우를 닫을 수 있는 x버튼이 표시

            // 인포윈도우를 생성하고 지도에 표시
            var infowindow = new kakao.maps.InfoWindow({
                map: map, // 인포윈도우가 표시될 지도
                position: iwPosition,
                content: iwContent,
                removable: iwRemoveable
            });
            infowindow.open(map);
        }
        setTable(data)
        setShowDetail(true);
    }

    const isshowDetail = () => {
        setShowDetail(false);
    }

    return (
        <>
            <IndexNavbar />
            <h3 className='pp-title'>플레이스</h3>
            <hr className='pp-title-bar' />
            <Container className='pp-box'>
                <div className='pp-map' id="map" style={{ width: "100%", height: "800px" }}>
                </div>
                {showDetail && <PlaceDetailItem changeShowDetail={isshowDetail} place={table} />}
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
                                <span className='place-search-icon' onClick={setSearchHandler} style={{cursor: 'pointer'}}> <FontAwesomeIcon icon={faMagnifyingGlass} /> </span>
                                <input type="search" placeholder="검색하기" value={searchInput}
                                    onFocus={searchOnHandler} onBlur={searchOffHandler} onChange={setSearchContent} />
                                {searchInput.length !== 0 &&
                                    <button className="btn-clear" onClick={searchInputRemoveHandler}>
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                    </button>
                                }
                            </div>
                            <Container>
                                {
                                    tables.map(
                                        table =>
                                            <PlaceItem key={table.id} changeShowDetail={() => changeShowDetail(table)} place={table} />
                                    )
                                }
                            </Container>
                        </div>
                    </div>
                }
            </Container>
            <div className='pp-footer'>
                <VeginFooter />
            </div>
        </>
    );
}

export default PlacePage;