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
    const [searchInput, setSearchInput] = useState('');
    const [open, setOpen] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [dir, setDir] = useState('next');
    const [table, setTable] = useState(null);
    const [xPosition, setX] = useState('-741');
    const [orgTable, setorgTable] = useState([]);

    useEffect(() => {
        /* place_info table 불러오기 */
        PlaceService.getPlaces().then((res) => {
            setTables(res.data);
            setorgTable(res.data);
        })

        /* kakao map 생성 */
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

    /* 마커 표시 */
    function showMarkers() {
        tables.map(element => {
            const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(element.y_DNTS, element.x_CNTS),
                title: element.upso_NM,
            });
            /* 마커에 표시할 인포윈도우를 생성 */
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

    /* 인포윈도우 생성 */
    function makeOverListener(map, marker, infowindow) {
        return function () {
            infowindow.open(map, marker);
        };
    }

    /* 인포윈도우 닫기 */
    function makeOutListener(infowindow) {
        return function () {
            infowindow.close();
        };
    }

    /* 지도 중심 좌표 이동 */
    const moveMapCenter = (el) => {
        var moveLatLon = new kakao.maps.LatLng(el.y_DNTS, el.x_CNTS);
        map.setCenter(moveLatLon);
    }

    /* 찾기 버튼 클릭시 place 필터링하여 검색 */
    const setSearchHandler = () => { 
        var n_tables = orgTable.filter(it => {
            return it.upso_NM.includes(searchInput);
        });
        setTables(n_tables);
    }

    /* enter 이벤트 처리 (검색) */
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            var n_tables = orgTable.filter(it => {
                return it.upso_NM.includes(searchInput);
            });
            setTables(n_tables);
        }
    };

    /* input 창에 onChange 이벤트 처리 */
    const setSearchContent = (e) => {
        setSearchInput(e.target.value);
        if(e.target.value === ''){
            setTables(orgTable);
        }
    }

    /* x버튼 클릭 시 place 리스트 초기화 */
    const searchInputRemoveHandler = () => {
        setSearchInput('');
        setTables(orgTable);
    }

    /* button 클릭 시 토글 */
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

    /* PlaceDetailItem 보이기 */
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
                iwPosition = new kakao.maps.LatLng(n_y_DNTS, data.x_CNTS),
                iwRemoveable = true;

            /* 인포윈도우를 생성 후 지도에 표시 */
            var infowindow = new kakao.maps.InfoWindow({
                map: map,
                position: iwPosition,
                content: iwContent,
                removable: iwRemoveable
            });
            infowindow.open(map);
        }
        setTable(data)
        setShowDetail(true);
    }

    /* PlaceDetailItem이 보여진 상태인지 체크 */
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
                                <input type="search" placeholder="검색하기" value={searchInput} onKeyPress={handleKeyPress}
                                    onChange={setSearchContent} />
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