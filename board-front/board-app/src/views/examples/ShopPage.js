import React, { Component } from 'react';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import BestShopItems from '../index-sections/BestShopItems';
import AllShopItems from '../index-sections/AllShopItems';
import VeginFooter from 'components/Footers/VeginFooter';
import { faMagnifyingGlass, faCircleXmark, faListSquares } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShopService from 'service/ShopService';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom"
import { red } from '@material-ui/core/colors';


const cateData = {
    cat0 : '전체',
    cat1 : '디저트',
    cat2 : '간편식품',
    cat3 : '화장품',
    cat4 : '생활용품',
    cat5 : '패션잡화'
}

const sortBy = {
    
}
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
    
            sort: 0
        };
    }
    componentDidMount() {
        ShopService.getProducts(cateData[this.state.curCate], this.state.searchInput, this.state.sort, this.state.p_num).then((res) => {
            this.setState({ 
                products: res.data.list,
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,

                
             });
        });
       
        // curCate: 'cat0'
        curCate: sessionStorage.getItem('curCate')
    }

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
            console.log(res.data);
            res.data.list == null 
            ? this.setState({
                empty: 1 // 검색 결과 없는 경우 
            }) 
            // 검색 결과 존재하지 않을 때 빈 리스트로 만들기
            : this.setState({ 
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                // products: this.state.activeTab == 0 ? 
                //      res.data.list
                // :   [...res.data.list.sort((a, b) => {
                //     return a.soldPrice - b.soldPrice;
                //     })],
                products: res.data.list,
                pagePrev: p_num, 
                empty: 0
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
    clickHandler = (id) => {
        this.setState({
            sort: id
        });
        console.log(this.state.sort);
        this.listProduct(this.state.curCate, this.state.searchInput, this.state.sort, this.state.p_num);
    }
    

    // // // 최저가순 정렬
    // lowPriceSort = () => {
    //     const products = [...this.state.products.sort((a, b) => {
    //         return a.soldPrice - b.soldPrice;
    // })];
    //     this.setState({
    //         products: products
    //     })
    //     console.log(products);
    //     this.listProduct(this.state.curCate, this.state.searchInput, this.state.p_num);
    // }

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
                    < BestShopItems />
                    <hr className='shop-hr'/>

                    {/* 정렬 및 아이템 나열 부분 */}
                         {/* 정렬 버튼 */}
                {/* < div className="shop-content-bar" >
                    <ul className="shop-sort-list">
                        <li className="orderItem orderItem10 active"><a>인기순</a></li>
                        <button className="orderItem orderItem01" onClick={this.lowPriceSort(this.state.products)}><a>최저가순</a></button>
                    </ul>
                </div> */}


                {/* < div className="shop-content-bar" >            
                    <ul className="shop-sort-list">
                        <li onClick={() => this.clickHandler(0)} style={{backgroundColor:'red'}}>인기순</li>
                        <li onClick={() => this.clickHandler(1)} style={{backgroundColor:'blue'}}>최저가순</li>
                    </ul>
                </div> */}

                <div className="type-buttons">      
                    <button 
                       // id="cat0" 
                        type="button" 
                        //className={`ml-1 btn ${this.state.curCate === 'cat0'? 'active' : ''}`}
                        onClick={() => this.clickHandler(0)}
                    >
                        인기순
                    </button>
                    <button 
                        id="cat0" 
                        type="button" 
                        //className={`ml-1 btn ${this.state.curCate === 'cat0'? 'active' : ''}`}
                        onClick={() => this.clickHandler(1)}
                    >
                        최저가순
                    </button>
                </div>


                { this.state.empty == 1
                ? <p style={{textAlign: 'center'}}>검색 결과가 없습니다.</p>
                :
                
                <div> 
                    <ul className="shop-items-table">
                    {  
                        this.state.products.map(
                            product =>
                            <li key={product.productId}>                   
                                <Link
                                    className="pt-0 mt-0"
                                    data-placement="bottom"
                                    title="View Detail"
                                    to={{
                                        pathname: `/shop-detail-page/${product.productId}`,
                                        state: {
                                            productName: `${product.productName}`,
                                            soldPrice: `${product.soldPrice}`,
                                            imgSrc: `${product.imgSrc}`,
                                            detail: `${product.detail}`
                                        }
                                    }}
                                > 
                                        <div id="shopItem" className="item" align="center"
                                        onClick = {() => this.readProduct(product.productId)} >
                                            {/* 상품 이미지 */}
                                            <img id="shopImg" className="item-img" alt="shop_img" src={product.imgSrc}/>
                                            <div className="like">  {/* 관심 상품 버튼 */}
                                                <button id="shopLike" type="button" className="like-button" title="like">
                                                    <FontAwesomeIcon icon={faHeart} />
                                                </button>
                                            </div>
                                            <p id="shopTitle" className="item-title">{product.productName}</p>                                  {/* 상품명 */}
                                            {product.saleRate === 0
                                            ? null
                                            :  <span id="shopPer" className="shop-per shop-text">{product.saleRate}%</span>}                         {/* 할인율 */}
                                            <span id="shopPrice" className="shop-price shop-text">₩{product.soldPrice}</span>            {/* 할인 O: 할인가, 할인 X: 정가 */}
                                            {product.regPrice === product.soldPrice
                                            ? null
                                            : <span id="shopStrikePrice" className="shop-strike-price shop-text">₩{product.regPrice}</span> }   {/* 할인 O: 정가 */}
                                        </div>
                                </Link>

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