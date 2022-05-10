import React, { Component } from 'react';
import IndexNavbar from 'components/Navbars/IndexNavbar';
// import RecipeItems from "../index-sections/RecipeItems";
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VeginFooter from 'components/Footers/VeginFooter';
import BestRecipeItems from 'views/index-sections/BestRecipeItems';

// from RecipeItems.js
import VeginService from '../../service/VeginService';
import { faUser, faHourglass, faEye } from "@fortawesome/free-regular-svg-icons";

import { Link } from 'react-router-dom';

const cateData = {
    cat0: '전체',
    cat1: '밑반찬',
    cat2: '메인반찬',
    cat3: '국/탕',
    cat4: '찌개',
    cat5: '빵/디저트/과자',
    cat6: '면/만두',
    cat7: '밥/죽/떡',
    cat8: '샐러드',
    cat9: '스프',
    cat10: '차/음료/술',
    cat11: '양식',
    cat12: '양념/소스/잼',
    cat13: '김치/젓갈/장류',
    cat14: '퓨전',
    cat15: '기타'
}

class RecipePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchClick: false,
            searchInput: '',
            searchCancel: false,
            recipes: [],
            curCate: 'cat0',
            // curCate: sessionStorage.getItem('curCate'),
            p_num: 1,
            paging: {},
            pagePrev: 0
        };
    }

    componentDidMount() {
        VeginService.getRecipes(cateData[this.state.curCate], this.state.searchInput, this.state.p_num).then((res) => {
            this.setState({
                recipes: res.data.list,
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData
            });
        });
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
        this.listRecipe(this.state.curCate, '', 1);
    };

    // enter 이벤트 처리 (검색)
    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            this.listRecipe(this.state.curCate, this.state.searchInput, 1);
        }
    };

    changeCate = (e) => {
        this.setState({
            curCate: e.target.id,
            p_num: 1,
            searchInput: ''
        });
        this.listRecipe(e.target.id, '', 1);
    };

    // paging
    listRecipe(curCate, searchInput, p_num) {
        VeginService.getRecipes(cateData[curCate], searchInput, p_num).then((res) => {
            res.data.list != null
                ? this.setState({
                    p_num: res.data.pagingData.currentPageNum,
                    paging: res.data.pagingData,
                    recipes: res.data.list,
                    pagePrev: p_num
                })
                : this.setState({
                    p_num: 0,
                    paging: {},
                    recipes: [],
                    pagePrev: p_num
                })
        });
        {this.state.pagePrev == 0 ?
        document.getElementById("1").classList.remove('active')
        : document.getElementById(this.state.pagePrev.toString()).classList.remove('active')};

        window.scrollTo(0, 0);
    }

    viewPaging() {
        const pageNums = [];

        for (let i = this.state.paging.pageNumStart; i <= this.state.paging.pageNumEnd; i++) {
            pageNums.push(i);
        }

        return (pageNums.map((page) =>
            <li className={`page-item ${this.state.paging.currentPageNum == page ? 'active' : ''}`} key={page.toString()} id={page.toString()}>
                <a className="page-link" onClick={() => this.listRecipe(this.state.curCate, this.state.searchInput, page)}>{page}</a>
            </li>
        ));
    }

    isPagingPrev() {
        if (this.state.paging.isPrev) {
            return (
                <li className="page-item" id="page-prev">
                    <a className="page-link" onClick={() => this.listRecipe(this.state.curCate, this.state.searchInput, (this.state.paging.currentPageNum - 1))} tabIndex="-1">
                        <i aria-hidden="true" class="fa fa-angle-left"></i>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
            );
        }
    }

    isPagingNext() {
        if (this.state.paging.isNext) {
            return (
                <li className="page-item " id="page-next">
                    <a className="page-link" onClick={() => this.listRecipe(this.state.curCate, this.state.searchInput, (this.state.paging.currentPageNum + 1))} tabIndex="-1">
                        <i aria-hidden="true" class="fa fa-angle-right"></i>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            );
        }
    }

    isMoveToFirstPage() {
        if (this.state.p_num != 1) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.listRecipe(this.state.curCate, this.state.searchInput, 1)} tabIndex="-1">
                        <i aria-hidden="true" class="fa fa-angle-double-left"></i>
                        <span class="sr-only">Move to First Page</span>
                    </a>
                </li>
            );
        }
    }

    isMoveToLastPage() {
        if (this.state.p_num != this.state.paging.pageNumCountTotal) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.listRecipe(this.state.curCate, this.state.searchInput, (this.state.paging.pageNumCountTotal))} tabIndex="-1">
                        <i aria-hidden="true" class="fa fa-angle-double-right"></i>
                        <span class="sr-only">LastPage({this.state.paging.pageNumCountTotal})</span>
                        {/* LastPage({this.state.paging.pageNumCountTotal}) */}
                    </a>
                </li>
            );
        }
    }

    render() {

        return (
            <>
                <IndexNavbar />
                <div className="recipe-main">
                    <div>
                        <ul className="recipe-search-table">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="type-buttons">
                                        <button
                                            id="cat0"
                                            type="button"
                                            className={`ml-1 btn ${this.state.curCate === 'cat0' ? 'active' : ''}`}
                                            onClick={this.changeCate}
                                        >
                                            {cateData['cat0']}
                                        </button>
                                        <button
                                            id="cat1"
                                            type="button"
                                            className={`ml-1 btn ${this.state.curCate === 'cat1' ? 'active' : ''}`}
                                            onClick={this.changeCate}
                                        >
                                            {cateData['cat1']}
                                        </button>
                                        <button
                                            id="cat2"
                                            type="button"
                                            className={`ml-1 btn ${this.state.curCate === 'cat2' ? 'active' : ''}`}
                                            onClick={this.changeCate}
                                        >
                                            {cateData['cat2']}
                                        </button>
                                        <button
                                            id="cat3"
                                            type="button"
                                            className={`ml-1 btn ${this.state.curCate === 'cat3' ? 'active' : ''}`}
                                            onClick={this.changeCate}
                                        >
                                            {cateData['cat3']}
                                        </button>
                                        <button
                                            id="cat4"
                                            type="button"
                                            className={`ml-1 btn ${this.state.curCate === 'cat4' ? 'active' : ''}`}
                                            onClick={this.changeCate}
                                        >
                                            {cateData['cat4']}
                                        </button>
                                        <button
                                            id="cat5"
                                            type="button"
                                            className={`ml-1 btn ${this.state.curCate === 'cat5' ? 'active' : ''}`}
                                            onClick={this.changeCate}
                                        >
                                            {cateData['cat5']}
                                        </button>
                                        <button
                                            id="cat6"
                                            type="button"
                                            className={`ml-1 btn ${this.state.curCate === 'cat6' ? 'active' : ''}`}
                                            onClick={this.changeCate}
                                        >
                                            {cateData['cat6']}
                                        </button>
                                        <button
                                            id="cat7"
                                            type="button"
                                            className={`ml-1 btn ${this.state.curCate === 'cat7' ? 'active' : ''}`}
                                            onClick={this.changeCate}
                                        >
                                            {cateData['cat7']}
                                        </button>
                                        <button
                                            id="cat8"
                                            type="button"
                                            className={`ml-1 btn ${this.state.curCate === 'cat8' ? 'active' : ''}`}
                                            onClick={this.changeCate}
                                        >
                                            {cateData['cat8']}
                                        </button>
                                        <button
                                            id="cat9"
                                            type="button"
                                            className={`ml-1 btn ${this.state.curCate === 'cat9' ? 'active' : ''}`}
                                            onClick={this.changeCate}
                                        >
                                            {cateData['cat9']}
                                        </button>
                                        <button
                                            id="cat10"
                                            type="button"
                                            className={`ml-1 btn ${this.state.curCate === 'cat10' ? 'active' : ''}`}
                                            onClick={this.changeCate}
                                        >
                                            {cateData['cat10']}
                                        </button>
                                        <button
                                            id="cat11"
                                            type="button"
                                            className={`ml-1 btn ${this.state.curCate === 'cat11' ? 'active' : ''}`}
                                            onClick={this.changeCate}
                                        >
                                            {cateData['cat11']}
                                        </button>
                                        <button
                                            id="cat12"
                                            type="button"
                                            className={`ml-1 btn ${this.state.curCate === 'cat12' ? 'active' : ''}`}
                                            onClick={this.changeCate}
                                        >
                                            {cateData['cat12']}
                                        </button>
                                        <button
                                            id="cat13"
                                            type="button"
                                            className={`ml-1 btn ${this.state.curCate === 'cat13' ? 'active' : ''}`}
                                            onClick={this.changeCate}
                                        >
                                            {cateData['cat13']}
                                        </button>
                                        <button
                                            id="cat14"
                                            type="button"
                                            className={`ml-1 btn ${this.state.curCate === 'cat14' ? 'active' : ''}`}
                                            onClick={this.changeCate}
                                        >
                                            {cateData['cat14']}
                                        </button>
                                        <button
                                            id="cat15"
                                            type="button"
                                            className={`ml-1 btn ${this.state.curCate === 'cat15' ? 'active' : ''}`}
                                            onClick={this.changeCate}
                                        >
                                            {cateData['cat15']}
                                        </button>
                                    </div>
                                    <div className="search-bar">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        <input type="search" placeholder="재료명 / 요리명" value={this.state.searchInput}
                                            onFocus={this.searchOnHandler} onBlur={this.searchOffHandler} onChange={this.setSearchHandler} onKeyPress={this.handleKeyPress} />
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
                    <hr className="recipe-hr" />

                    {/* 정렬 버튼 */}
                    <div className="recipe-content-bar">
                        <ul className="recipe-sort-list">
                            <li className="orderItem orderItem10 active"><a>인기순</a></li>
                            <li className="orderItem orderItem01"><a>추천순</a></li>
                        </ul>
                    </div>

                    {this.state.recipes.length == 0
                        ? <p style={{ textAlign: 'center' }}>검색 결과가 없습니다.</p>
                        :
                        <div>
                            {/* 아이템 나열 부분 */}
                            <ul className="recipe-items-table">
                                {this.state.recipes.map(
                                    recipe =>
                                        <li key={recipe.id}>
                                            <Link
                                                className="pt-0 mt-0"
                                                data-placement="bottom"
                                                title="View Detail"
                                                to={{
                                                    pathname: `/recipe-detail-page/${recipe.id}`,
                                                    state: {
                                                        recipe: { recipe }
                                                    }
                                                }}
                                                onClick={()=>VeginService.setViews(recipe.id)}
                                            >
                                                {/* <RecipeItems /> */}
                                                {/* 레시피 아이템 */}
                                                <div id="recipeItem" className="item" align="center">
                                                    {/* 레시피 이미지 */}
                                                    <img id="recipeImg" alt="recipe_img" src={recipe.img} />
                                                    <p id="recipeTitle" className="item-title">{recipe.name}</p>   {/* 요리명 */}
                                                    <span id="recipeServing" className="recipe-text">       {/* 인분 수 */}
                                                        <FontAwesomeIcon icon={faUser} /> {recipe.servings}
                                                    </span>
                                                    <span id="recipeTime" className="recipe-text">          {/* 조리 시간 */}
                                                        <FontAwesomeIcon icon={faHourglass} /> {recipe.time}
                                                    </span>
                                                    <span id="recipeViews" className="recipe-text">         {/* 조회 수 */}
                                                        <FontAwesomeIcon icon={faEye} /> {recipe.views}
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                )}
                            </ul>
                            <div className="rc-page-row">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        {
                                            this.isMoveToFirstPage()
                                        }
                                        {
                                            this.isPagingPrev()
                                        }
                                        {
                                            this.viewPaging()
                                        }
                                        {
                                            this.isPagingNext()
                                        }
                                        {
                                            this.isMoveToLastPage()
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    }
                </div>
                <VeginFooter />
            </>
        );
    }
}

export default RecipePage;