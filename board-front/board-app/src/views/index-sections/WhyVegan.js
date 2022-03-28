import React, { Component } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "assets/scss/paper-kit/_aboutvegan.scss";

class WhyVegan extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
          };
        return (
            <>
            <div className="typography-line"   style={{background : '#F5F5F5', marginBottom: '40px'}}>
                 {/*  vegan 정의 */}
                 <div className='whyvegan-mean-wrapper' style={{marginTop : '0px'}}>
                        <div className='whyvegan-quotes'style={{marginTop : '0px'}}> <br/><br/>" </div>
                            <div className='whyvegan-mean'>
                                타 생물을 위하는 마음으로<br/> 
                                더 나은 환경과 지속 가능한 지구를 위해<br/>
                                <span className='mean-l'>동물성 제품을 지양하는 철학</span>을<br/>
                                <span className='mean-l' style={{fontStyle: 'italic'}}>비건(Vegan)</span> 이라 부릅니다.
                            </div> 
                         <div className='whyvegan-quotes'> " </div>
                    </div>
                    <div className='whyvegan-step-wrapper'>
                        <img 
                            className="whyvegan-step" 
                            alt="step" 
                            src={require("assets/img/vegan-step.png")} 
                        /> 
                    </div>
               
               
                    {/* 세 가지 장점 */}
                    <h1 className='whyvegan-title-main' style={{ marginTop: '0px'}}>
                        WHY VEGAN?
                    </h1>
               
              
                    <div className='whyvegan-wrapper'> 
                        <div className='whyvegan-contents'>      
                            <h4 className='whyvegan-title'>for health</h4>
                            <div className='whyvegan-text'>
                                연간 전체 질병사망자의 71.5%는 육식 관련 질병으로 사망하고 채식은 특정 질병을 예방하고 치료하는데 효과적<br/>
                                <div className='wv-text-source'>-WHO(세계 보건 기구), 미국영양협회</div>
                            </div>
                            <h4 className='whyvegan-title'>for animals</h4>
                            <div className='whyvegan-text'>
                                모든 살아있는 생물에게는 생명과 자유에 대한 권리가 있으며, 비건은 동물 학대와 동물 착취에 반대할 수 있는 가장 분명한 방법 중 하나<br/>
                                <div className='wv-text-source'>-The Vegan Society</div>
                            </div>
                            <h4 className='whyvegan-title'>for environment</h4>
                            <div className='whyvegan-text'>
                                비건은 온실가스 뿐만 아니라 산성화, 토지 사용 , 물 사용 등 지구에 미치는 영향을 줄일 수 있는 가장 크고 쉬운 방법<br/>
                                일주일에 단 한 번의 채식만으로 탄소발자국을 1인당 연간 2200kg 감소시켜 환경문제 부담을 줄일 수 있음
                            </div>
                        </div>
                        <div className='whyvegan-img-wrapper'>
                            <img 
                                className="whyvegan-img" 
                                alt="whyvegan" 
                                src={require("assets/img/whyvegan.jpg")} 
                                style={{ width: '250px' }}
                            />
                        </div>
                    </div>  
                    <hr style={{marginTop: '50px'}}></hr>
            </div>

                <div className="typography-line">
                    
                   
                </div>
                {/* 매거진 */}
                <div className='wva-mz-wrapper'>
                    <div className='wva-mz-title'>
                        MAGAZINE
                    </div>
                    <div className='wva-mz-slider-wrapper'>
                    <Slider {...settings} className='wva-mz-slider'>
                        <div className='wva-mz'>
                            <img 
                                className="wva-mz-img" 
                                alt="magazine" 
                                src= "https://assets.vogue.com/photos/61ae16157c13ee66d47c2972/master/w_1920,c_limit/VO0122_SocialCover_logo.jpg"
                            />
                            <div className='wva-mz-contents'>
                                비건단체 
                            </div>

                        </div>
                        <div>
                            <img 
                                className="wva-mz-img" 
                                alt="magazine" 
                                src= "https://assets.vogue.com/photos/61ae16157c13ee66d47c2972/master/w_1920,c_limit/VO0122_SocialCover_logo.jpg"
                            />
                        </div>
                        <div>
                            <img 
                                className="wva-mz-img" 
                                alt="magazine" 
                                src= "https://assets.vogue.com/photos/61ae16157c13ee66d47c2972/master/w_1920,c_limit/VO0122_SocialCover_logo.jpg"
                            />
                        </div>
                        <div>
                            <img 
                                className="wva-mz-img" 
                                alt="magazine" 
                                src= "https://assets.vogue.com/photos/61ae16157c13ee66d47c2972/master/w_1920,c_limit/VO0122_SocialCover_logo.jpg"
                            />
                        </div>
                        <div>
                            <img 
                                className="wva-mz-img" 
                                alt="magazine" 
                                src= "https://assets.vogue.com/photos/61bd0b4a1b84e62f58b4d5a1/master/w_1920,c_limit/VO0222_Cover_Logo.jpg"
                            />
                        </div>
                        </Slider>
                        </div>
                </div>
            </>
        );
    }
}

export default WhyVegan;