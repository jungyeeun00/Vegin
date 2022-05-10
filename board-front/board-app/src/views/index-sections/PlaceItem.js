import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

const PlaceItem = ({place, changeShowDetail}) => {
    const { UPSO_NM, COB_CODE_NM, CRTFC_GBN_NM, RDN_CODE_NM, TEL_NO } = place;
    return (
        <>
            <Row>
                <Col md="4" className="list-img-col">
                    <img className="list-img" alt="place_img" src={require("assets/img/place_item.jpg")} />
                </Col>
                <Col>
                    <Row className="name-category">
                        <div className='place-name' onClick={changeShowDetail}>{UPSO_NM}</div>
                        <div className='place-category'>{COB_CODE_NM}</div>
                    </Row>
                    <div className="place-address">{RDN_CODE_NM}</div>
                    <div className="place-time">
                        <span><FontAwesomeIcon icon={faPhone} /></span>
                        <span>{TEL_NO}</span>
                    </div>
                </Col>
            </Row>
        </>
    );

}

export default PlaceItem;