import React, { Component } from 'react';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import BestShopItems from '../index-sections/BestShopItems';
import AllShopItems from '../index-sections/AllShopItems';
import VeginFooter from 'components/Footers/VeginFooter';
import { faMagnifyingGlass, faCircleXmark, faListSquares } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class ShopPage extends Component {
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
                <IndexNavbar />


                <div className="shop-main">

                    {/* 카테고리 및 검색 바 */}
                    <div>
                        <ul className="shop-search-table">
                            <div class="row">
                                <div class="col-md-12">
                                    <div className="type-buttons">
                                        <button type="button" class="ml-1 btn"> 전체 </button>
                                        <button type="button" class="ml-1 btn"> 베이커리 </button>
                                        <button type="button" class="ml-1 btn"> 간편식 </button>
                                        <button type="button" class="ml-1 btn"> 화장품 </button>
                                        <button type="button" class="ml-1 btn"> 생활용품 </button>
                                        <button type="button" class="ml-1 btn"> 패션잡화 </button>
                                    </div>
                                    <div className="search-bar">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        <input type="search" placeholder="검색하기" value={this.state.searchInput}
                                            onFocus={this.searchOnHandler} onBlur={this.searchOffHandler} onChange={this.setSearchHandler} />
                                        {this.state.searchInput.length!=0 && 
                                            <button className="btn-clear" onClick={this.searchInputRemoveHandler}>
                                                <FontAwesomeIcon icon={faCircleXmark} />
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>


                    {/* BEST ITEM 부분 */}
                    <div className="shop-best">
                        <h3>BEST</h3>
                    </div>
                    < BestShopItems />

                    {/* 정렬 및 아이템 나열 부분 */}
                    < AllShopItems />
                </div>
                <VeginFooter />
            </>
        );
    }
}

export default ShopPage;