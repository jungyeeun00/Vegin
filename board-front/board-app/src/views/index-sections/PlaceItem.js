import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Row } from 'reactstrap';

const PlaceItem = ({place, changeShowDetail}) => {
    const { upso_NM, cob_CODE_NM, rdn_CODE_NM, tel_NO, image } = place;

    return (
        <>
            <Row>
                <Col md="4" className="list-img-col">
                    { <img className="list-img" alt="place_img" src={image} />}
                </Col>
                <Col>
                    <Row className="name-category">
                        <div className='place-name' onClick={changeShowDetail}>{upso_NM}</div>
                        <div className='place-category'>{cob_CODE_NM}</div>
                    </Row>
                    <div className="place-address">{rdn_CODE_NM}</div>
                    <div className="place-time">
                        <span><FontAwesomeIcon icon={faPhone} /></span>
                        <span>{tel_NO}</span>
                    </div>
                </Col>
            </Row>
        </>
    );

}

export default PlaceItem;