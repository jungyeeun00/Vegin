/* global kakao */
import VeginFooter from 'components/Footers/VeginFooter';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import React, { Component, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import PlaceListItem from "../index-sections/PlaceListItem";
import PlaceDetailItem from 'views/index-sections/PlaceDetailItem';
import axios from 'axios';

const PlacePage = () => {
    const [places, setPlaces] = useState(null);
    useEffect(() => {
        axios
            .get('http://openapi.seoul.go.kr:8088/41497a6663656b6634335950466b78/json/CrtfcUpsoInfo/1/1000/')
            .then((response) => {
                const res = response['data']['CrtfcUpsoInfo']['row'];

                const result = res.filter(it => it.CRTFC_GBN === '14')
                setPlaces(result);
            });

        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(37.582872968256936, 127.00946831534178),
            level: 3
        };
        var map = new kakao.maps.Map(container, options);

        if (!places) {
            return null;
        }
        places.map(element => {
            // console.log(element.CRTFC_GBN);
            const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(element.Y_DNTS, element.X_CNTS),
                title: element.UPSO_NM,
            });
            kakao.maps.event.addListener(
                marker,
                "click",
                ()=>showPlaceDetail(element)
            )
        });
    }, []);

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