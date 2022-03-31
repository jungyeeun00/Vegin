import React, { Component } from 'react';
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Container,
    Row,
    Col
} from 'reactstrap';
import PlaceItem from './PlaceItem';
class PlaceListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchClick: false,
            searchInput: '',
        };
    }

    searchOnHandler = () => { // onFocus 이벤트
        this.setState({
            searchClick: true,
        });
    };
    searchOffHandler = () => { // onBlur 이벤트
        this.setState({
            searchClick: false
        });
    };
    setSearchHandler = (e) => { // input 창에 onChange 이벤트
        this.setState({
            searchInput: e.target.value
        });

    };
    searchInputRemoveHandler = () => {
        this.setState({
            searchInput: '',
        });
    };

    render() {
        return (
            <>
                <div className="place-list-main">
                    <div className="place-search-bar">
                        <span className='place-search-icon'> <FontAwesomeIcon icon={faMagnifyingGlass} /> </span>
                        <input type="search" placeholder="검색하기" value={this.state.searchInput}
                            onFocus={this.searchOnHandler} onBlur={this.searchOffHandler} onChange={this.setSearchHandler} />
                        {this.state.searchInput.length !== 0 &&
                            <button className="btn-clear" onClick={this.searchInputRemoveHandler}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        }
                    </div>
                    <Container>
                        <PlaceItem/>
                        <PlaceItem/>
                        <PlaceItem/>
                        <PlaceItem/>
                        <PlaceItem/>
                        <PlaceItem/>
                        <PlaceItem/>
                        <PlaceItem/>
                        <PlaceItem/>
                    </Container>
                </div>
            </>
        );
    }
}

export default PlaceListItem;