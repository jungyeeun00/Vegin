/* global kakao */
import VeginFooter from 'components/Footers/VeginFooter';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import React, { Component, useEffect } from 'react';
import { Container } from 'reactstrap';
import PlaceListItem from "../index-sections/PlaceListItem";
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
            <h3 className='pp-title'>플레이스</h3>
            <hr className='pp-title-bar'/>
            <Container className='pp-box'>
                <div className='pp-map' id="map" style={{ width: "100%", height: "800px" }}>
                </div>
                <div className='pp-place-list-item'>
                    < PlaceListItem />
                    {/* <PlaceDetailItem /> */}
                </div>
            </Container>
            <div className='pp-footer'>
                <VeginFooter />
            </div>
        </>
    );
}

export default PlacePage;