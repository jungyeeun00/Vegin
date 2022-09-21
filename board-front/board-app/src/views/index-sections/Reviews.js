import React, { Component } from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import ShopService from 'service/ShopService';
import MemberService from 'service/MemberService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import GenderChart from './GenderChart';
import AgeChart from './AgeChart';
import { isConditionalExpression } from 'typescript';

class Reviews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productId: this.props.productId,
            reviews: [],
            text: '',
            star: 1,
            updating: {
                now: false,
                reviewId: ''
            },
            sentiments: [],
            fCnt : 0,
            mCnt : 0,
            teens: 0, twenties: 0, thirties: 0, forties: 0
        }

        this.changeStarHandler = this.changeStarHandler.bind(this);
        this.changeTextHandler = this.changeTextHandler.bind(this);
    }

    componentDidMount() {
        /* 서버에서 상품 후기 정보 가져오기 */
        ShopService.getReviews(this.state.productId).then(res => {
            this.setState({ 
                reviews: res.data,
                fCnt: res.data.filter(reviews => reviews.member.gender === 'f').length,
                mCnt: res.data.filter(reviews => reviews.member.gender === 'm').length,
                teens: res.data.filter(reviews => parseInt(reviews.member.age / 10) === 1).length,
                twenties: res.data.filter(reviews => parseInt(reviews.member.age / 10) === 2).length,
                thirties: res.data.filter(reviews => parseInt(reviews.member.age / 10) === 3).length,
                forties: res.data.filter(reviews => parseInt(reviews.member.age / 10) > 3).length
            });
        });
        /* 서버에서 후기 별 긍,부정 스코어 가져오기 */
        ShopService.getSentiment(this.state.productId).then(res => {
            console.log("sentiment : " + res.data);
            this.setState({ sentiments: res.data });
        });
    }

    /* 로그인 한 유저 정보 가져오기 */
    returnCurrentMember() {
        let currentMember = null;
        if (MemberService.getCurrentMember() == null)
            currentMember = "리뷰 작성 시 로그인 필요";
        else
            currentMember = MemberService.getCurrentMember();

        return currentMember;
    }

    /* 상품 후기 수정 상태로 업데이트 */
    changeUpdating = (reviewId) => {
        this.setState({
            updating: {
                now: !this.state.updating.now,
                reviewId: reviewId
            }
        });
    }

    /* onChange 이벤트 발생 시 상품 후기 별점 저장 */
    changeStarHandler = (event) => {
        console.log(event.target.value);
        this.setState({ star: event.target.value });
    }

    /* onChange 이벤트 발생 시 상품 후기 내용 저장 */
    changeTextHandler = (event) => {
        this.setState({ text: event.target.value });
    }

    /* 상품 후기 등록 */
    createReview = () => {
        if (MemberService.getCurrentMember() != null) {
            let review = {
                productId: this.state.productId,
                memberId: MemberService.getCurrentMember(),
                star: this.state.star,
                imgSrc: '', 
                text:this.state.text
            };
            console.log("review => " + JSON.stringify(review));
            ShopService.createReview(review).then(res => {
                ShopService.createSentiment().then(res => {
                    window.location.reload();
                });
                // window.location.reload();
            });
        } else
            alert("로그인 후 이용 바랍니다.")
    }

    /* 상품 후기 수정 */
    updateReview = (reviewId) => {
        let review = {
            productId: this.state.productId,
            memberId: MemberService.getCurrentMember(),
            text: this.state.text
        };
        console.log("review => " + JSON.stringify(review));
        ShopService.updateReview(reviewId, review).then(res => {
            window.location.reload();
        });
    }

    /* 상품 후기 삭제 */
    deleteReview = async function (reviewId) {
        if (window.confirm("정말로 리뷰를 삭제하시겠습니까?\n삭제된 리뷰는 복구할 수 없습니다")) {
            ShopService.deleteReview(this.state.productId, reviewId).then(res => {
                console.log("delete result => " + JSON.stringify(res));
                window.location.reload();
            }).catch(error => alert("댓글 삭제가 실패했습니다."));
        }
    }

    render() {
        return (
            <>
                {this.state.reviews.length !== 0 &&
                    <div className='chart-wrapper'>
                         <AgeChart teens={Math.floor(this.state.teens/this.state.reviews.length * 100)}
                                    twenties={Math.round(this.state.twenties/this.state.reviews.length * 100)}
                                    thirties={Math.round(this.state.thirties/this.state.reviews.length * 100)}
                                    forties={Math.round(this.state.forties/this.state.reviews.length * 100)}/>
                        <GenderChart female={Math.floor(this.state.fCnt / (this.state.reviews.length) * 100)} 
                                    male={100 - Math.floor(this.state.fCnt / (this.state.reviews.length) * 100)}/>  
                    </div>
                }
                <div className='shop-writereview-wrapper'>
                    &nbsp;<span className='shop-writereview-name'>{this.returnCurrentMember()}</span>
                    <div className="form-group">
                        &nbsp;<label htmlFor="formStarRating">별점</label>&nbsp;&nbsp;
                        <select id="formStarRating" onChange={this.changeStarHandler}>
                            <option value="1">1</option>
                            <option value="1.5">1.5</option>
                            <option value="2">2</option>
                            <option value="2.5">2.5</option>
                            <option value="3">3</option>
                            <option value="3.5">3.5</option>
                            <option value="4">4</option>
                            <option value="4.5">4.5</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <textarea
                        id='shop-writereview'
                        placeholder='불쾌감을 주는 욕설과 악플은 삭제될 수 있습니다.'
                        onChange={this.changeTextHandler}>
                    </textarea>
                    <div className='shop-reviewwrite-btn-wrapper'>
                        <Button className="shop-reviewwrite-btn btn-round ml-1" type="button" onClick={() => this.createReview()}>
                            등록
                        </Button>
                    </div>
                </div>
                {/* 리뷰리스트 */}
                <ul className="review-list">
                    {this.state.reviews.length === 0 ? <div><br/><br/><br/>등록된 리뷰가 없습니다.</div> : ""}
                    {
                        this.state.reviews.map((review, idx) => (
                            <li className="review-item">
                                <Container>
                                    <Row>
                                        <Col className="review-user" md={2}>
                                            <div><span>{review.member.id}</span>님의 리뷰</div>
                                        </Col>
                                        <Col className="review-star" md={8}>
                                            <div className="star-wrap">
                                                <div className="star-rating">
                                                    <span style={{ width: `${review.star * 20}%` }}></span>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col className='review-created-date' md={2}>
                                            <div><span>{review.created_date.substring(0, 16)}</span></div>
                                            {this.state.sentiments[idx] !== 0 ?
                                                Number(this.state.sentiments[idx]) > 0.5 ? 
                                                    <span>긍정 {(this.state.sentiments[idx]*100).toFixed(2)} %</span> // 긍정
                                                    :  <span>부정 {((1 - this.state.sentiments[idx])*100).toFixed(2)} %</span> // 부정
                                                : null
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={2}>
                                        </Col>
                                        <Col className="review-content" md={8}>
                                            <div className="review-text">
                                                {!this.state.updating.now && <span className='shop-review-text'>{review.text}</span>}
                                                {this.state.updating.now && this.state.updating.reviewId == review.id &&
                                                    <div className='shop-updatereview-wrapper'>
                                                        <textarea
                                                            id='shop-updatereview'
                                                            placeholder='불쾌감을 주는 욕설과 악플은 삭제될 수 있습니다.'
                                                            defaultValue={review.text}
                                                            onChange={this.changeTextHandler}>
                                                        </textarea>
                                                        <div className='shop-reviewupdate-btn-wrapper'>
                                                            <Button className="shop-reviewupdate-btn btn-round ml-1" type="button" onClick={() => this.updateReview(review.id)}>
                                                                등록
                                                            </Button>
                                                            <Button className="shop-reviewupdate-cancel btn-round ml-1" type="button" onClick={() => this.changeUpdating(review.id)}>
                                                                취소
                                                            </Button>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                        <Col className="review-btn align-self-end" md={2}>
                                        {MemberService.getCurrentMember() == review.member.id && !this.state.updating.now &&
                                                <div className='shop-review-btn-wrapper'>
                                                    <Button className="shop-review-btn-edit btn-round ml-1" type="button" onClick={() => this.changeUpdating(review.id)}>
                                                        <FontAwesomeIcon icon={faPencil} />
                                                    </Button>
                                                    <Button className="shop-review-btn-cancel btn-round ml-1" type="button" onClick={() => this.deleteReview(review.id)}>
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    </Button>
                                                </div>
                                        }
                                        </Col>
                                    </Row>
                                </Container>
                            </li>
                        ))
                    }
                </ul>
            </>
        );
    }
}

export default Reviews;