import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import RecipeItems from "../index-sections/RecipeItems";
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VeginFooter from 'components/Footers/VeginFooter';
import BestRecipeItems from 'views/index-sections/BestRecipeItems';

class RecipePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchClick: false,
            searchInput: '',
            searchCancel: false
        };
    }

    searchOnHandler = () => { // onFocus 이벤트
        this.setState({
            searchClick: true,
            searchCancel: true
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
            searchCancel: false,
        });
    };

    render() {
        return (
            <>
                <IndexNavbar />

                <div className="recipe-main">

                    <div>
                        <ul className="recipe-search-table">
                            <div class="row">
                                <div class="col-md-12">
                                    <div className="type-buttons">
                                        <button type="button" class="ml-1 btn"> 전체 </button>
                                        <button type="button" class="ml-1 btn"> 밑반찬 </button>
                                        <button type="button" class="ml-1 btn"> 메인반찬 </button>
                                        <button type="button" class="ml-1 btn"> 국/탕 </button>
                                        <button type="button" class="ml-1 btn"> 찌개 </button>
                                        <button type="button" class="ml-1 btn"> 빵/디저트/과자 </button>
                                        <button type="button" class="ml-1 btn"> 면/만두 </button>
                                        <button type="button" class="ml-1 btn"> 밥/죽/떡 </button>
                                        <button type="button" class="ml-1 btn"> 샐러드 </button>
                                    </div>
                                    <div className="search-bar">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        <input type="search" placeholder="재료명 / 요리명" value={this.state.searchInput}
                                            onFocus={this.searchOnHandler} onBlur={this.searchOffHandler} onChange={this.setSearchHandler} />
                                        {this.state.searchInput.length !== 0 &&
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
                    <div className="recipe-best">
                        <h3>BEST</h3>
                    </div>
                    <BestRecipeItems />
                    <hr className="recipe-hr"/>

                    {/* 정렬 버튼 */}
                    <div className="recipe-content-bar">
                        <ul className="recipe-sort-list">
                            <li className="orderItem orderItem10 active"><a>인기순</a></li>
                            <li className="orderItem orderItem01"><a>추천순</a></li>
                        </ul>
                    </div>

                    {/* 아이템 나열 부분 */}
                    <ul className="recipe-items-table">
                         <li>
                            <NavLink
                                className="pt-0 mt-0"
                                data-placement="bottom"
                                href="/recipe-detail-page"
                                title="View Detail"
                            ><RecipeItems />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="pt-0 mt-0"
                                data-placement="bottom"
                                href="/recipe-detail-page"
                                title="View Detail"
                            ><RecipeItems />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="pt-0 mt-0"
                                data-placement="bottom"
                                href="/recipe-detail-page"
                                title="View Detail"
                            ><RecipeItems />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="pt-0 mt-0"
                                data-placement="bottom"
                                href="/recipe-detail-page"
                                title="View Detail"
                            ><RecipeItems />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="pt-0 mt-0"
                                data-placement="bottom"
                                href="/recipe-detail-page"
                                title="View Detail"
                            ><RecipeItems />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="pt-0 mt-0"
                                data-placement="bottom"
                                href="/recipe-detail-page"
                                title="View Detail"
                            ><RecipeItems />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="pt-0 mt-0"
                                data-placement="bottom"
                                href="/recipe-detail-page"
                                title="View Detail"
                            ><RecipeItems />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="pt-0 mt-0"
                                data-placement="bottom"
                                href="/recipe-detail-page"
                                title="View Detail"
                            ><RecipeItems />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="pt-0 mt-0"
                                data-placement="bottom"
                                href="/recipe-detail-page"
                                title="View Detail"
                            ><RecipeItems />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="pt-0 mt-0"
                                data-placement="bottom"
                                href="/recipe-detail-page"
                                title="View Detail"
                            ><RecipeItems />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="pt-0 mt-0"
                                data-placement="bottom"
                                href="/recipe-detail-page"
                                title="View Detail"
                            ><RecipeItems />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="pt-0 mt-0"
                                data-placement="bottom"
                                href="/recipe-detail-page"
                                title="View Detail"
                            ><RecipeItems />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="pt-0 mt-0"
                                data-placement="bottom"
                                href="/recipe-detail-page"
                                title="View Detail"
                            ><RecipeItems />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="pt-0 mt-0"
                                data-placement="bottom"
                                href="/recipe-detail-page"
                                title="View Detail"
                            ><RecipeItems />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="pt-0 mt-0"
                                data-placement="bottom"
                                href="/recipe-detail-page"
                                title="View Detail"
                            ><RecipeItems />
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <VeginFooter />
            </>
        );
    }
}

export default RecipePage;