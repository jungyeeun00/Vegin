import VeginFooter from 'components/Footers/VeginFooter';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import React, { Component } from 'react';
import WhyVegan from 'views/index-sections/WhyVegan';

class AboutVeganPage extends Component {
    render() {
        return (
            <>
              <IndexNavbar/>  
              <WhyVegan/>
              <VeginFooter/>
            </>
        );
    }
}

export default AboutVeganPage;