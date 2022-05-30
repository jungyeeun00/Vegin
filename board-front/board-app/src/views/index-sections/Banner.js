import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import 'assets/scss/paper-kit/_banner.scss'

class Banner extends Component {
    render() {
        return (
            <>
            <div className='banner' >
                <Link to="/about-vegin-page">
                    <div className='banner-wrap'>
                        <div className='banner-content'>
                            <span> Vegin's story </span>
                            <Button className='button.btn-round.mr-1.btn.btn-outline-default'>
                                about us
                            </Button>
                        </div>
                    </div>
                </Link>
            </div>
            </>
        );
    }
}

export default Banner;