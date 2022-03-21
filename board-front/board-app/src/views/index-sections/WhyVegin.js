import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';

class WhyVegin extends Component {
    render() {
        return (
            <>
                <div className="typography-line">
                    <h1>
                        WHY VEGIN?
                    </h1>
                </div>
                <div id="images">
                    <Container>
                        <Row>
                            <Col className="mr-auto ml-auto" md="2" sm="4">
                                <img
                                    alt="..."
                                    className="img-circle img-no-padding img-responsive"
                                    src={require("assets/img/faces/kaci-baum-2.jpg")}
                                />
                                <p className="text-center">접근성</p>
                                <div className='image-explanation'>
                                    <p>
                                        성별과 연령에 무관하게 불편함 없이 이용할 수 있도록 서비스 제공
                                    </p>
                                </div>
                            </Col>
                            <Col className="mr-auto ml-auto" md="2" sm="4">
                                <img
                                    alt="..."
                                    className="img-circle img-no-padding img-responsive"
                                    src={require("assets/img/faces/kaci-baum-2.jpg")}
                                />
                                <p className="text-center">정보</p>
                                <div className='image-explanation'>
                                    <p>
                                        성별과 연령에 무관하게 불편함 없이 이용할 수 있도록 서비스 제공
                                    </p>
                                </div>
                            </Col>
                            <Col className="mr-auto ml-auto" md="2" sm="4">
                                <img
                                    alt="..."
                                    className="img-circle img-no-padding img-responsive"
                                    src={require("assets/img/faces/kaci-baum-2.jpg")}
                                />
                                <p className="text-center">소통</p>
                                <div className='image-explanation'>
                                    <p>
                                        성별과 연령에 무관하게 불편함 없이 이용할 수 있도록 서비스 제공
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

export default WhyVegin;