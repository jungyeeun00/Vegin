/* global kakao */
import VeginFooter from 'components/Footers/VeginFooter';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import React, { Component, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import PlaceListItem from "../index-sections/PlaceListItem";
import PlaceDetailItem from 'views/index-sections/PlaceDetailItem';
import axios from 'axios';
import PlaceService from 'service/PlaceService';

const PlacePage = () => {
    const [places, setPlaces] = useState(null);
    const [tables, setTables] = useState([]);

    useEffect(() => {
        PlaceService.getPlaces().then((res) => {
            setTables(res.data);
            console.log(res.data);
        })
        // axios
        //     .get('http://openapi.seoul.go.kr:8088/41497a6663656b6634335950466b78/json/CrtfcUpsoInfo/1/800/')
        //     .then((response) => {
        //         const res = response['data']['CrtfcUpsoInfo']['row'];

        //         const result = res.filter(it => it.CRTFC_GBN === '14')
        //         setPlaces(result);
        //     });

        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(37.582872968256936, 127.00946831534178),
            level: 3
        };
        var map = new kakao.maps.Map(container, options);

        if (!tables) {
            return null;
        }
        tables.map(element => {
            console.log(element);
            const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(element.y_DNTS, element.x_CNTS),
                title: element.upso_NM,
            });
            // 마커에 표시할 인포윈도우를 생성합니다 
            var infowindow = new kakao.maps.InfoWindow({
                content: `<div style="color: red">element.upso_NM</div>` // 인포윈도우에 표시할 내용
            });
            kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
            kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
            kakao.maps.event.addListener(
                marker,
                'click',
                () => showPlaceDetail(element)
            )
        });
    }, []);

    function makeOverListener(map, marker, infowindow) {
        return function () {
            infowindow.open(map, marker);
        };
    }

    function makeOutListener(infowindow) {
        return function() {
            infowindow.close();
        };
    }

    function showPlaceDetail(clickedData) {
        console.log(clickedData);
    }

    return (
        <>
            <IndexNavbar />
            <h3 className='pp-title'>플레이스</h3>
            <hr className='pp-title-bar' />
            <Container className='pp-box'>
                <div className='pp-map' id="map" style={{ width: "100%", height: "800px" }}>
                </div>
                < PlaceListItem />
            </Container>
            <div className='pp-footer'>
                <VeginFooter />
            </div>
        </>
    );
}

export default PlacePage;