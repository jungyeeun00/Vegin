import React, { Component } from 'react';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import WhyVegin from 'views/index-sections/WhyVegin';
import VeginFooter from 'components/Footers/VeginFooter';

class AboutVeginPage extends Component {
    render() {
        return (
            <>
                <IndexNavbar />
                <WhyVegin/>
                <VeginFooter/>
            </>
        );
    }
}

export default AboutVeginPage;