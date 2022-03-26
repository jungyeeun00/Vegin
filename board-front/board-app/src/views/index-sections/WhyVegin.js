import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import "assets/scss/paper-kit/_aboutvegin.scss";

class WhyVegin extends Component {
    render() {
        return (
            <>
                <div className="typography-line">
                    <div className='wvi-logo-wrapper'>
                        <img
                            alt="..."
                            className="wvi-main-logo"
                            src={require("assets/img/login_logo.png")}
                        />
                    </div>
                    <div className='wvi-mean'>
                        Vegin은<br/>
                        vegan + begin의 합성어 입니다.<br/><br/><br/><br/>
                    </div>
                    <div className='wvi-contents1'>
                        <span className='mean-l'>Vegin(비긴)</span>은 이 곳을 발판 삼아 <br/>
                        많은 사람들이 비건을 시작하기를 바라는<br/>
                         마음을 담고 있습니다.
                        <br/><br/><br/><br/>
                    </div>
                </div>
                 <div className="typography-line" style={{background : '#F5F5F5'}}>
                    <h1 className='wvi-title-main'>
                       <br/> WHY VEGIN?
                    </h1>
                    <div className='con-wrapper'>
                        <div className="mr-auto ml-auto" md="2" sm="4">
                            <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require("assets/img/wv-web.png")}
                            />
                            <p className="text-center">접근성</p>
                            <div className='image-explanation'>
                                <p>
                                    성별과 연령에 무관하게 불편함 없이 이용할 수 있도록 서비스 제공
                                </p>
                            </div>
                        </div>
                        <div className="mr-auto ml-auto" md="2" sm="4">
                            <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require("assets/img/wv-info.png")}
                            />
                            <p className="text-center">정보</p>
                            <div className='image-explanation'>
                                <p>
                                    비건 라이프 실천을 위한 다양한 비건 관련 정보 제공
                                </p>
                            </div>
                        </div>
                        <div className="mr-auto ml-auto" md="2" sm="4">
                            <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require("assets/img/wv-comm.png")}
                            />
                            <p className="text-center">소통</p>
                            <div className='image-explanation'>
                                <p>
                                    소통을 통해 다양한 의견과 지식 공유
                                </p>
                            </div>
                        </div>
                     
                    </div>
                    <div className='typography-line'>
                        <div className='wvi-contents2'>
                            Do you wanna vegin?<br/>
                            Let’s vegin!
                            <br/><br/><br/>
                        </div>
                    </div>
                </div>
              
            </>
        );
    }
}

export default WhyVegin;