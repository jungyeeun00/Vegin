import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

class PlaceItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Row>
                    <Col md="4" className="list-img-col">
                        <img className="list-img" alt="place_img" src={require("assets/img/place_item.jpg")} />
                    </Col>
                    <Col>
                        <Row className="name-category">
                            <Col></Col>
                            <Col xs="auto" className="place-name">
                                <div onClick={this.props.changeShowDetail}>음식점명</div>
                            </Col>
                            <Col className="place-category">
                                <div>카페</div>
                            </Col>
                        </Row>
                        <div className="place-intro">비건이 만드는 비건 케이크 & 빵</div>
                        <div className="place-address">서울 성북구 삼선교로 16길 116</div>
                        <div className="place-time">
                            <span><FontAwesomeIcon icon={faClock} /></span>
                            <span>11:00 ~ 20:00</span>
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
}

export default PlaceItem;