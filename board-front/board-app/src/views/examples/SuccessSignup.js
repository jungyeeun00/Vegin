import VeginFooter from 'components/Footers/VeginFooter';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';

class SuccessSignup extends Component {
    render() {
        return (
            <>
                <IndexNavbar />
                <Container>
                    <div className='signup-box'>
                        <div className='signup-logo'>
                            <img className="login_logo" alt="login_logo" src={require("assets/img/login_logo.png")} style={{ width: '250px' }} />
                        </div>
                        <div className='signup-welcome'>환영합니다</div>
                        <div className='signup-ment'>VEGIN 회원가입이 완료되었습니다</div>
                        <Button className="go-login btn-round ml-1" type="button" onClick={this.goToUpdate}>
                            로그인
                        </Button>
                        <Button className="go-main btn-round ml-1" type="button" onClick={() => this.deleteView()}>
                            메인으로
                        </Button>
                    </div>
                </Container>
                <VeginFooter />
            </>
        );
    }
}

export default SuccessSignup;