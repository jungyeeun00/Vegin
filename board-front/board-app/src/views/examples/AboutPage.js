import React, { Component } from 'react';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import WhyVegan from 'views/index-sections/WhyVegan';
import WhyVegin from 'views/index-sections/WhyVegin';

class AboutPage extends Component {
    render() {
        return (
            <>
                <IndexNavbar />
                <WhyVegan />
                <WhyVegin/>
            </>
        );
    }
}

export default AboutPage;