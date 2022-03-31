/* global kakao */
import VeginFooter from 'components/Footers/VeginFooter';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import React, { Component, useEffect } from 'react';
import { Container } from 'reactstrap';
import PlaceDetailItem from 'views/index-sections/PlaceDetailItem';

const PlacePage = () => {
    useEffect(() => {
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(37.582872968256936, 127.00946831534178),
            level: 3
        };
        var map = new kakao.maps.Map(container, options);
    }, []);

    return (
        <>
            <IndexNavbar />
            <PlaceDetailItem/>
            <Container>
                <div id="map" style={{width:"100%", height:"800px"}}>

                </div>
            </Container>
            <VeginFooter />
        </>
    );
}

export default PlacePage;