import React, { Component } from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import ShopService from 'service/ShopService';
import MemberService from 'service/MemberService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';

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
            }
        }

        this.changeStarHandler = this.changeStarHandler.bind(this);
        this.changeTextHandler = this.changeTextHandler.bind(this);
    }

    componentDidMount() {
        ShopService.getReviews(this.state.productId).then(res => {
            this.setState({ reviews: res.data });
        })
    }

    /* 현재 사용자 */
    returnCurrentMember() {
        let currentMember = null;
        if (MemberService.getCurrentMember() == null)
            currentMember = "리뷰 작성 시 로그인 필요";
        else
            currentMember = MemberService.getCurrentMember();

        return currentMember;
    }

    /* 수정 중인지 상태 변경 */
    changeUpdating = (reviewId) => {
        this.setState({
            updating: {
                now: !this.state.updating.now,
                reviewId: reviewId
            }
        });
    }

    /* 별점 상태 수정 */
    changeStarHandler = (event) => {
        console.log(event.target.value);
        this.setState({ star: event.target.value });
    }

    /* 텍스트 상태 수정 */
    changeTextHandler = (event) => {
        this.setState({ text: event.target.value });
    }

    /* 리뷰 등록 */
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
                window.location.reload();
            });
        } else
            alert("로그인 후 이용 바랍니다.")
    }

    /* 리뷰 내용 수정 */
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

    /* 리뷰 삭제 */
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
                <div className='shop-writereview-wrapper'>
                    &nbsp;<span className='shop-writereview-name'>{this.returnCurrentMember()}</span>
                    <div className="form-group">
                        &nbsp;<label htmlFor="formStarRating">별점</label>&nbsp;&nbsp;
                        <select id="formStarRating" onChange={this.changeStarHandler}>
                            <option value="1">★</option>
                            <option value="2">★★</option>
                            <option value="3">★★★</option>
                            <option value="4">★★★★</option>
                            <option value="5">★★★★★</option>
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
                        this.state.reviews.map((review) => (
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