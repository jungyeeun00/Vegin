import React, { Component } from 'react';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import ShopItem from '../index-sections/ShopItem';
import Spinner from '../index-sections/Spinner';
import VeginFooter from 'components/Footers/VeginFooter';
import { faMagnifyingGlass, faCircleXmark, faListSquares } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShopService from 'service/ShopService';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "assets/scss/paper-kit/_aboutvegan.scss";

const cateData = {
    cat0 : '전체',
    cat1 : '디저트',
    cat2 : '간편식품',
    cat3 : '화장품',
    cat4 : '생활용품',
    cat5 : '패션잡화'
}
// recommend slider settings
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
 };

class ShopPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchClick: false,
            searchInput: '',
            products: [],
            curCate: 'cat0',
            p_num: 1,
            paging: {},
            pagePrev: 0,
            recommend: [],
            sort: 0, // 정렬( default: 인기순(0) )
            isLoading: false // Spinner
        };
    }
    componentDidMount() {
        ShopService.getProducts(cateData[this.state.curCate], this.state.searchInput, this.state.sort, this.state.p_num).then((res) => {
            this.setState({ 
                products: res.data.list,
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                isLoading: false
            }, () => {
                this.handleScrollPosition();
            });
        });
         ShopService.getRecommend().then((res) => { 
            this.setState({
                recommend: res.data,
                isLoading: true
            })
         });
    }

    handleScrollPosition = () => {
        const scrollPosition = sessionStorage.getItem("scrollPosition");
        if (scrollPosition) {
          window.scrollTo(0, parseInt(scrollPosition));
          sessionStorage.removeItem("scrollPosition");
        }
    };

    changeCate = (e) => {
        this.setState({
            curCate: e.target.id,
            p_num: 1,
            // 카테고리 변경되면 searchInput 초기화
            searchInput: ''
        
        });
        // searchInput 빈 문자열
        this.listProduct(e.target.id, '', this.state.sort, 1);
    };

    // paging
    listProduct(curCate, searchInput, sort, p_num) {
        console.log("pageNum : "+ p_num );
        ShopService.getProducts(cateData[curCate], searchInput, sort, p_num).then((res) => {
            res.data.list != null
                ? this.setState({
                    p_num: res.data.pagingData.currentPageNum,
                    paging: res.data.pagingData,
                    products: res.data.list,
                    pagePrev: p_num
                })
                : this.setState({
                    p_num: 0,
                    paging: {},
                    products: [],
                    pagePrev: p_num
                })
        });
        if(this.state.pagePrev == 0 && this.state.paging.currentPageNum != 1) {
            document.getElementById("1").classList.remove('active');
        }
        else if(this.state.pagePrev != 0 && this.state.pagePrev != -1 && this.state.pagePrev != this.state.paging.currentPageNum) {
            document.getElementById(this.state.pagePrev.toString()).classList.remove('active');
        }
    }

    viewPaging() {
        const pageNums = [];

        for (let i = this.state.paging.pageNumStart; i <= this.state.paging.pageNumEnd; i++ ) {
            pageNums.push(i);
        }
       return (pageNums.map((page) => 
        <li className={`page-item ${this.state.paging.currentPageNum == page ? 'active' : ''}`} id={page.toString()} key={page.toString()} >
            <a className="page-link" onClick = {() => this.listProduct(this.state.curCate, this.state.searchInput, this.state.sort, page)}>{page}</a>
        </li>
        ));
        
    }
    isPagingPrev(){
        if (this.state.paging.prev) {
            return (
                <li className="page-item" id="page-prev">
                    <a className="page-link" onClick = {() => this.listProduct( this.state.curCate, this.state.searchInput, this.state.sort, (this.state.paging.currentPageNum - 10))} tabndex="-1"> &lt; </a>
                </li>
            );
        }
    }
    isPagingNext(){
        if (this.state.paging.next) {
            return (
                <li className="page-item" id="page-next">
                    <a className="page-link" onClick = {() => this.listProduct( this.state.curCate, this.state.searchInput, this.state.sort, (this.state.paging.currentPageNum + 10) )} tabIndex="-1">&gt;</a>
                </li>
            );
        }
    }

    readProduct(productId) {
        this.props.history.push(`/shop-page/shop-detail-page/${productId}`);
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
        this.listProduct(this.state.curCate, '', 1);
    };
    // enter 이벤트 처리 (검색)
    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            this.listProduct(this.state.curCate, this.state.searchInput, this.state.sort, -1);
        }
    };

    // 정렬 탭
    clickHandler = (sort) => {
        this.setState({
            sort: sort,
            p_num: 1,
            // 정렬 기준 searchInput 초기화
            searchInput: ''
        });
        console.log(this.state.sort);
        this.listProduct(this.state.curCate, this.state.searchInput, sort, this.state.p_num);
    }

    render() {
        return (
            <>
                <IndexNavbar />
                <div className="shop-main">

                    {/* 카테고리 및 검색 바 */}
                    <div>
                        <ul className="shop-search-table">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="type-buttons">
                                        <button 
                                            id="cat0" 
                                            type="button" 
                                            className={`ml-1 btn ${this.state.curCate === 'cat0'? 'active' : ''}`}
                                            onClick = {this.changeCate}
                                        >
                                            {cateData['cat0']}
                                        </button>
                                        <button 
                                            id="cat1" 
                                            type="button" 
                                            className={`ml-1 btn ${this.state.curCate === 'cat1'? 'active' : ''}`}
                                            onClick = {this.changeCate}
                                        >
                                            {cateData['cat1']}
                                        </button>
                                        <button 
                                            id="cat2" 
                                            type="button" 
                                            className={`ml-1 btn ${this.state.curCate === 'cat2'? 'active' : ''}`}
                                            onClick = {this.changeCate}
                                        >
                                            {cateData['cat2']}
                                        </button>
                                        <button 
                                            id="cat3" 
                                            type="button" 
                                            className={`ml-1 btn ${this.state.curCate === 'cat3'? 'active' : ''}`}
                                            onClick = {this.changeCate}
                                        >
                                            {cateData['cat3']}
                                        </button>
                                        <button 
                                            id="cat4" 
                                            type="button" 
                                            className={`ml-1 btn ${this.state.curCate === 'cat4'? 'active' : ''}`}
                                            onClick = {this.changeCate}
                                        >
                                            {cateData['cat4']}
                                        </button>
                                        <button 
                                            id="cat5" 
                                            type="button" 
                                            className={`ml-1 btn ${this.state.curCate === 'cat5'? 'active' : ''}`}
                                            onClick = {this.changeCate}
                                        >
                                            {cateData['cat5']}
                                        </button>
                                    </div>
                                    {/* 검색바 */}
                                    <div className="search-bar">
                                        <input type="search" placeholder="검색하기" value={this.state.searchInput}
                                            onFocus={this.searchOnHandler} onBlur={this.searchOffHandler} onChange={this.setSearchHandler} onKeyPress={this.handleKeyPress} />
                                        <FontAwesomeIcon icon={faMagnifyingGlass} className="btn-search" onClick={this.handleClick}/>
                                        {this.state.searchInput.length!==0 && 
                                            <button className="btn-clear" onClick={this.searchInputRemoveHandler}>
                                                <FontAwesomeIcon icon={faCircleXmark} />
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>

                    {/* RECOMMENDATION ITEM 부분 */}
                    <div className="shop-best">
                        <h3>RECOMMEND</h3>
                    </div>

                    <div className='bestItem-slider-wrapper'>
                       { this.state.isLoading == false
                        ? <div className='spinner'> <Spinner /> </div>
                         :

                        <Slider {...settings} className='bestItem-slider'>
                            {  
                                this.state.recommend.map(
                                    product =>   
                                        <ShopItem product={product} key={product.id}/>
                                )
                            } 
                        </Slider>
                        }
                       
                    </div>   
                    
                    <hr className='shop-hr'/>

                {/* 정렬 및 아이템 나열 부분 */}
                <div className="shop-content-bar"> 
                    <button 
                        type="button" 
                        className={`shop-sort-btn ${this.state.sort === 0 ? 'active' : ''}`}
                        onClick={() => this.clickHandler(0)}
                    >
                       <a>인기순</a>
                    </button> 
                    <button 
                        
                        type="button" 
                        className={`shop-sort-btn ${this.state.sort === 1 ? 'active' : ''}`}
                        onClick={() => this.clickHandler(1)}
                    >
                        <a>최저가순</a>
                    </button>
                </div>


                {this.state.p_num === 0
                ? <p style={{textAlign: 'center'}}>검색 결과가 없습니다.</p>
                :
                
                <div> 
                    <ul className="shop-items-table">
                    {  
                        this.state.products.map(
                            product =>
                            <li key={product.productId}>                   
                                 <ShopItem product={product}/>
                            </li> 
                        )}
                        </ul>
                        <div className ="pagination-wrapper">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    { this.isPagingPrev() }
                                    { this.viewPaging() }
                                    { this.isPagingNext() }
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

export default ShopPage;