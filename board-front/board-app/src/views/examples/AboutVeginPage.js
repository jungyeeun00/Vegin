import React, { Component } from 'react';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import WhyVegin from 'views/index-sections/WhyVegin';

class AboutVeginPage extends Component {
    render() {
        return (
            <>
                <IndexNavbar />
                <WhyVegin/>
            </>
        );
    }
}

export default AboutVeginPage;