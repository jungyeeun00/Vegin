import React, { Component } from 'react';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VeginFooter from 'components/Footers/VeginFooter';
import RecipeItem from 'views/index-sections/RecipeItem';
import RecipeService from 'service/RecipeService';
import Spinner from '../index-sections/Spinner';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

// recommend slider settings
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
};

let selectCate;
let selectSort;
let selectPnum;

class RecipePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchClick: false,
            searchInput: '',
            searchCancel: false,
            recipes: [],
            recommend: [],
            sort: 0, // 정렬( default: 등록순(id순)(0) )
            curCate: 'cat0',
            p_num: 1,
            paging: {},
            pagePrev: 0,
            isLoading: false // Spinner
        };
        
    }

    /* 저장된 state, 레시피 리스트, 추천 리스트 */
    componentDidMount() {
        selectCate = sessionStorage.getItem("curCate") == null ? 'cat0' : JSON.parse(sessionStorage.getItem("curCate"));
        selectSort = sessionStorage.getItem("sort") == null ? 0 :  JSON.parse(sessionStorage.getItem("sort"));
        selectPnum = sessionStorage.getItem("p_num") == null ? 1 : JSON.parse(sessionStorage.getItem("p_num"));

        RecipeService.getRecipes(selectSort, cateData[selectCate], this.state.searchInput, selectPnum).then((res) => {
            this.setState({
                recipes: res.data.list,
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                isLoading: false,
                p_num: selectPnum,
                curCate: selectCate,
                sort: selectSort,
            }, () => {
                this.handleScrollPosition();
            });
        });
        RecipeService.getRecommend().then((res) => { 
            this.setState({
                recommend: res.data,
                isLoading: true
            })
         });
    }

    /* 스크롤 위치 불러오기 */
    handleScrollPosition = () => {
        const scrollPosition = sessionStorage.getItem("scrollPosition");
        if (scrollPosition) {
          window.scrollTo(0, parseInt(scrollPosition));
          sessionStorage.removeItem("scrollPosition");
        }
    };

    /* 검색바 onFocus 이벤트 */
    searchOnHandler = () => {
        this.setState({
            searchClick: true,
            searchCancel: true
        });
    };

    /* 검색바 onBlur 이벤트 */
    searchOffHandler = () => {
        this.setState({
            searchClick: false
        });
    };

    /* 검색바 input 창 onChange 이벤트 */
    setSearchHandler = (e) => {
        this.setState({
            searchInput: e.target.value
        });
    };

    /* 검색바 x버튼 onClick 이벤트 */
    searchInputRemoveHandler = () => {
        this.setState({
            searchInput: '',
            searchCancel: false,
        });
        this.listRecipe(this.state.sort, this.state.curCate, '', 1);
    };

    /* 검색바 enter 이벤트 */
    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            this.listRecipe(this.state.sort, this.state.curCate, this.state.searchInput, -1);
            this.setState({
                searchClick: false
            })
        };
    };

    /* 검색바 아이콘 onClick 이벤트 */
    handleClick = () => {
        this.listRecipe(this.state.sort, this.state.curCate, this.state.searchInput, -1);
    };

    /* 카테고리 onClick 이벤트. 카테고리 변경 및 sessionStorage에 state 저장 */
    changeCate = (e) => {
        this.setState({
            curCate: e.target.id,
            p_num: 1,
            searchInput: ''
        });
        this.listRecipe(this.state.sort, e.target.id, '', 1);
        sessionStorage.setItem("curCate", JSON.stringify(e.target.id));
    };

    /* 정렬탭 onClick 이벤트. 정렬 변경 및 sessionStorage에 state 저장 */
    clickHandler = (sort) => {
        this.setState({
            sort: sort,
            p_num: 1,
            // 정렬 기준 searchInput 초기화
            searchInput: ''
        });
        this.listRecipe(sort, this.state.curCate, this.state.searchInput, this.state.p_num);
        sessionStorage.setItem("sort", sort);
    }

    /* page별 레시피 리스트 불러오기 */
    listRecipe = (sort, curCate, searchInput, p_num) => {
        RecipeService.getRecipes(sort, cateData[curCate], searchInput, p_num).then((res) => {
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
        // paging 버튼 active 추가 및 제거
        if(this.state.pagePrev === 0 && this.state.paging.currentPageNum !== 1) {
            document.getElementById("1").classList.remove('active');
        }
        else if(this.state.pagePrev !== 0 && this.state.pagePrev !== -1 && this.state.pagePrev !== this.state.paging.currentPageNum) {
            document.getElementById(this.state.pagePrev.toString()).classList.remove('active');
        }
        window.scrollTo(0, 0);
        sessionStorage.setItem("p_num", p_num);
    }

    /* 페이지 클릭 */
    viewPaging = () => {
        const pageNums = [];

        for (let i = this.state.paging.pageNumStart; i <= this.state.paging.pageNumEnd; i++) {
            pageNums.push(i);
        }

        return (pageNums.map((page) =>
            <li className={`page-item ${this.state.paging.currentPageNum === page ? 'active' : ''}`} key={page.toString()} id={page.toString()}>
                <a className="page-link" onClick={() => this.listRecipe(this.state.sort, this.state.curCate, this.state.searchInput, page)}>{page}</a>
            </li>
        ));
    }

    /* 이전 버튼 클릭 */
    isPagingPrev = () => {
        if (this.state.paging.isPrev) {
            return (
                <li className="page-item" id="page-prev">
                    <a className="page-link" onClick={() => this.listRecipe(this.state.sort, this.state.curCate, this.state.searchInput, (this.state.paging.currentPageNum - 10))} tabIndex="-1">
                        <i aria-hidden="true" class="fa fa-angle-left"></i>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
            );
        }
    }

    /* 다음 버튼 클릭 */
    isPagingNext = () => {
        if (this.state.paging.isNext) {
            return (
                <li className="page-item " id="page-next">
                    <a className="page-link" onClick={() => this.listRecipe(this.state.sort, this.state.curCate, this.state.searchInput, (this.state.paging.currentPageNum + 10))} tabIndex="-1">
                        <i aria-hidden="true" class="fa fa-angle-right"></i>
                        <span class="sr-only">Next</span>
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
                                        <input type="search" placeholder="재료명 / 요리명" value={this.state.searchInput}
                                            onFocus={this.searchOnHandler} onBlur={this.searchOffHandler} onChange={this.setSearchHandler} onKeyPress={this.handleKeyPress} />
                                        <FontAwesomeIcon icon={faMagnifyingGlass} className="btn-search" onClick={this.handleClick}/>
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

                    {/* RECOMMENDATION 부분 */}
                    <div className="recipe-best">
                        <h3>RECOMMEND</h3>
                    </div>
                    <div className='bestItem-slider-wrapper'>
                        {this.state.isLoading == false
                            ? <div className='spinner'> <Spinner /> </div>
                            :
                            <Slider {...settings} className='bestItem-slider'>
                                {this.state.recommend.map(
                                    (rec, index) =>
                                        <div className='best-items' key={index}>
                                            < RecipeItem recipe={rec} />
                                        </div>
                                )}
                            </Slider>
                        }
                    </div>
                    <div className="recipe-hr">
                        <hr />
                    </div>

                    {/* 정렬 및 아이템 나열 부분 */}
                    <div className="recipe-content-bar">
                        <button
                            type="button"
                            className={`recipe-sort-btn ${this.state.sort === 0 ? 'active' : ''}`}
                            onClick={() => this.clickHandler(0)}
                        >
                            <a>최신순</a>
                        </button>
                        <button

                            type="button"
                            className={`recipe-sort-btn ${this.state.sort === 1 ? 'active' : ''}`}
                            onClick={() => this.clickHandler(1)}
                        >
                            <a>인기순</a>
                        </button>
                    </div>

                    {this.state.p_num === 0
                        ? <p style={{ textAlign: 'center' }}>검색 결과가 없습니다.</p>
                        :
                        <div>
                            {/* 아이템 나열 부분 */}
                            <ul className="recipe-items-table">
                                {this.state.recipes.map(
                                    recipe =>
                                        <li key={recipe.id}>
                                            < RecipeItem recipe={recipe}/>
                                        </li>
                                )}
                            </ul>
                            <div className="rc-page-row">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        {
                                            this.isPagingPrev()
                                        }
                                        {
                                            this.viewPaging()
                                        }
                                        {
                                            this.isPagingNext()
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