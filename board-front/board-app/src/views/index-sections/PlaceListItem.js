import React, { Component } from 'react';
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    Container,
    Row,
    Col
 } from 'reactstrap';
class PlaceListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchClick: false,
            searchInput: '',
        };
    }

    searchOnHandler = () => { // onFocus 이벤트
        this.setState({
            searchClick: true,
        });
    };
    searchOffHandler = () => { // onBlur 이벤트
        this.setState({
            searchClick: false
        });
    };
    setSearchHandler = (e) => { // input 창에 onChange 이벤트
        this.setState({
            searchInput: e.target.value
        });

    };
    searchInputRemoveHandler = () => {
        this.setState({
            searchInput: '',
        });
    };

    render() {
        return (
            <>
                <div className="place-list-main">
                    <div className="place-search-bar">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input type="search" placeholder="검색하기" value={this.state.searchInput}
                            onFocus={this.searchOnHandler} onBlur={this.searchOffHandler} onChange={this.setSearchHandler} />
                        {this.state.searchInput.length !== 0 &&
                            <button className="btn-clear" onClick={this.searchInputRemoveHandler}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        }
                    </div>
                    <Container>
                        <Row>
                            <Col md="4" className="list-img-col">
                                <img className="list-img" alt="place_img" src={require("assets/img/place_item.jpg")} />
                            </Col>
                            <Col>
                                <Row className="name-category">
                                    <Col></Col>
                                    <Col xs="auto" className="place-name">
                                        <div>음식점명</div>
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

                        <Row>
                            <Col md="4" className="list-img-col">
                                <img className="list-img" alt="place_img" src={require("assets/img/place_item.jpg")} />
                            </Col>
                            <Col>
                                <Row className="name-category">
                                    <Col></Col>
                                    <Col xs="auto" className="place-name">
                                        <div>음식점명</div>
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

                        <Row>
                            <Col md="4" className="list-img-col">
                                <img className="list-img" alt="place_img" src={require("assets/img/place_item.jpg")} />
                            </Col>
                            <Col>
                                <Row className="name-category">
                                    <Col></Col>
                                    <Col xs="auto" className="place-name">
                                        <div>음식점명</div>
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

                        <Row>
                            <Col md="4" className="list-img-col">
                                <img className="list-img" alt="place_img" src={require("assets/img/place_item.jpg")} />
                            </Col>
                            <Col>
                                <Row className="name-category">
                                    <Col></Col>
                                    <Col xs="auto" className="place-name">
                                        <div>음식점명</div>
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

                        <Row>
                            <Col md="4" className="list-img-col">
                                <img className="list-img" alt="place_img" src={require("assets/img/place_item.jpg")} />
                            </Col>
                            <Col>
                                <Row className="name-category">
                                    <Col></Col>
                                    <Col xs="auto" className="place-name">
                                        <div>음식점명</div>
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

                        <Row>
                            <Col md="4" className="list-img-col">
                                <img className="list-img" alt="place_img" src={require("assets/img/place_item.jpg")} />
                            </Col>
                            <Col>
                                <Row className="name-category">
                                    <Col></Col>
                                    <Col xs="auto" className="place-name">
                                        <div>음식점명</div>
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

                        <Row>
                            <Col md="4" className="list-img-col">
                                <img className="list-img" alt="place_img" src={require("assets/img/place_item.jpg")} />
                            </Col>
                            <Col>
                                <Row className="name-category">
                                    <Col></Col>
                                    <Col xs="auto" className="place-name">
                                        <div>음식점명</div>
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

                        <Row>
                            <Col md="4" className="list-img-col">
                                <img className="list-img" alt="place_img" src={require("assets/img/place_item.jpg")} />
                            </Col>
                            <Col>
                                <Row className="name-category">
                                    <Col></Col>
                                    <Col xs="auto" className="place-name">
                                        <div>음식점명</div>
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

                        <Row>
                            <Col md="4" className="list-img-col">
                                <img className="list-img" alt="place_img" src={require("assets/img/place_item.jpg")} />
                            </Col>
                            <Col>
                                <Row className="name-category">
                                    <Col></Col>
                                    <Col xs="auto" className="place-name">
                                        <div>음식점명</div>
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
                    </Container>
                </div>
            </>
        );
    }
}

export default PlaceListItem;