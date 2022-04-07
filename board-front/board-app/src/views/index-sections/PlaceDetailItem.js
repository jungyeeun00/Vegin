import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from 'react';
import { faClock } from '@fortawesome/free-regular-svg-icons';

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
        const { UPSO_NM, COB_CODE_NM, CRTFC_GBN_NM, RDN_CODE_NM, TEL_NO, FOOD_MENU } = this.props.place;
        var menus = FOOD_MENU.split(", ");
        menus = menus.slice(-9);
        return (
            <>
                <div className="place-dt-wrap">
                    <button className='place-dt-imgbtn' type='button' onClick={this.setHidden} hidden={this.state.isHidden}><img className='place-dt-prevBtn' src={require("assets/img/close_btn.png")} /></button>
                    {!this.state.isHidden &&
                        <div style={{ background: 'lightgray' }}>
                            <div className='place-dt-item-main'>
                                <div className='place-dt-top'>
                                    <div className='place-dt-imgbox'>
                                        <img id="placeImg" className="place-dt-item-img" alt="place_img" src={require("assets/img/place_item.jpg")} />
                                    </div>
                                    <div className='place-dt-detail'>
                                        <div className='place-dt-inner'>
                                            <h2 className='place-dt-inner-title'>{UPSO_NM}</h2>
                                            <span>{COB_CODE_NM}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='place-dt-info'>
                                    <span className='place-dt-intro'>{CRTFC_GBN_NM}</span>
                                    <hr className='place-dt-hr' />
                                    <h6 className='place-dt-info-title'>상세 정보</h6>
                                    <div className='place-dt-infobox'>
                                        <span className='place-dt-location-icon'> <FontAwesomeIcon icon={faLocationDot} /> </span>
                                        <span className='place-dt-info-ds'>{RDN_CODE_NM}</span>
                                    </div>
                                    <div className='place-dt-infobox'>
                                        <span className='place-dt-location-icon'> <FontAwesomeIcon icon={faClock} /> </span>
                                        <span className='place-dt-info-ds'>00:00 ~ 00:00</span>
                                    </div>
                                    <div className='place-dt-infobox'>
                                        <span className='place-dt-location-icon'> <FontAwesomeIcon icon={faPhone} /> </span>
                                        <span className='place-dt-info-ds'>{TEL_NO}</span>
                                    </div>
                                    <hr className='place-dt-hr' />
                                    <h6 className='place-dt-info-title'>메뉴</h6>
                                    {
                                        menus.map((it) => (
                                            <div className='place-dt-infobox'>
                                                <span className='place-dt-location-icon'> <FontAwesomeIcon icon={faCheck} /> </span>
                                                <span className='place-dt-info-ds'>{it}</span>
                                            </div>
                                        ))
                                    }
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