import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircle, faCircleH, faInfoCircle, faList, faList12, faListCheck, faListDots, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from 'react';
import { faClock, faDotCircle, faListAlt, faSquare } from '@fortawesome/free-regular-svg-icons';

class PlaceDetailItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: false
        };
    }

    setHidden = (e) => {
        this.setState({
            isHidden: true
        });
        this.props.changeShowDetail();
    }

    render() {
        return (
            <>
            <div className="place-dt-wrap">
            <button className='place-dt-imgbtn' type='button' onClick={this.setHidden} hidden={this.state.isHidden}><img className='place-dt-prevBtn' src={require("assets/img/close_btn.png")}/></button>
            {!this.state.isHidden &&
            <div style={{background:'lightgray'}}>
                <div className='place-dt-item-main'>
                    <div className='place-dt-top'>
                        <div className='place-dt-imgbox'>
                            <img id="placeImg" className="place-dt-item-img" alt="place_img" src={require("assets/img/place_item.jpg")} />
                            <button className='place-dt-imgbtn' type='button'><img className='place-dt-prevBtn' src={require("assets/img/close_btn.png")} /></button>
                        </div>
                        <div className='place-dt-detail'>
                            <div className='place-dt-inner'>
                                <h2 className='place-dt-inner-title'>오이지</h2>
                                <span>한식</span>
                            </div>
                        </div>
                    </div>
                    <div className='place-dt-info'>
                        <span className='place-dt-intro'>혜화역 분위기 좋은 어쩌구</span>
                        <hr className='place-dt-hr' />
                        <h6 className='place-dt-info-title'>상세 정보</h6>
                        <div className='place-dt-infobox'>
                            <span className='place-dt-location-icon'> <FontAwesomeIcon icon={faLocationDot} /> </span>
                            <span className='place-dt-info-ds'>서울 종로구 대학로 9길</span>
                        </div>
                        <div className='place-dt-infobox'>
                            <span className='place-dt-location-icon'> <FontAwesomeIcon icon={faClock} /> </span>
                            <span className='place-dt-info-ds'>00:00 ~ 00:00</span>
                        </div>
                        <div className='place-dt-infobox'>
                            <span className='place-dt-location-icon'> <FontAwesomeIcon icon={faPhone} /> </span>
                            <span className='place-dt-info-ds'>02-673-1234</span>
                        </div>
                        <hr className='place-dt-hr' />
                        <h6 className='place-dt-info-title'>메뉴</h6>
                        <div className='place-dt-infobox'>
                            <span className='place-dt-location-icon'> <FontAwesomeIcon icon={faCheck} /> </span>
                            <span className='place-dt-info-ds'>차돌짬뽕</span>
                        </div>
                        <div className='place-dt-infobox'>
                            <span className='place-dt-location-icon'> <FontAwesomeIcon icon={faCheck} /> </span>
                            <span className='place-dt-info-ds'>짬뽕</span>
                        </div>
                        <div className='place-dt-infobox'>
                            <span className='place-dt-location-icon'> <FontAwesomeIcon icon={faCheck} /> </span>
                            <span className='place-dt-info-ds'>짜장면</span>
                        </div>
                    </div>
                </div>
            </div>
            }
            </div>
            </>
        );

    }
}

export default PlaceDetailItem;