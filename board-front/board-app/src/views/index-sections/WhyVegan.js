import React, { Component } from 'react';

class WhyVegan extends Component {
    render() {
        return (
            <>
                <div className="typography-line">
                    <h1>
                        WHY VEGAN?
                    </h1>
                </div>
                <div className="typography-line">
                    <p>
                    <h6 style={{fontStyle:'italic'}}>for health</h6>
                    연간 전체 질병사망자의 71.5%는 육식 관련 질병으로 사망하고 채식은 특정 질병을 예방하고 치료하는데 효과적<br/>
                    –WHO(세계 보건 기구), 미국영양협회<br/><br/>
                    <h6 style={{fontStyle:'italic'}}>for animals</h6>
                    모든 살아있는 생물에게는 생명과 자유에 대한 권리가 있으며, 비건은 동물 학대와 동물 착취에 반대할 수 있는 가장 분명한 방법 중 하나<br/>
                    -The Vegan Society<br/><br/>
                    <h6 style={{fontStyle:'italic'}}>for environment</h6>
                    비건은 온실가스 뿐만 아니라 산성화, 토지 사용 , 물 사용 등 지구에 미치는 영향을 줄일 수 있는 가장 크고 쉬운 방법<br/>
                    일주일에 단 한 번의 채식만으로 탄소발자국을 1인당 연간 2200kg 감소시켜 환경문제 부담을 줄일 수 있음
                    </p>
                </div>
            </>
        );
    }
}

export default WhyVegan;