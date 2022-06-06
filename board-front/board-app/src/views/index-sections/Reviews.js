import React, { Component } from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import ShopService from 'service/ShopService';
import MemberService from 'service/MemberService';

class Reviews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productId: this.props.key,
            reviews: [],
            content: '',
            updating: {
                now: false,
                reviewId: ''
            }
        }

        this.goToUpdate = this.goToUpdate.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
    }

    componentDidMount() {
        ShopService.getReviews(this.state.productId).then(res => {
            this.setState({ reviews: res.data });
        })
    }

    returnCurrentMember() {
        let currentMember = null;
        if (MemberService.getCurrentMember() == null)
            currentMember = "리뷰 작성 시 로그인 필요";
        else
            currentMember = MemberService.getCurrentMember();

        return currentMember;
    }

    changeUpdating = (reviewId) => {
        this.setState({
            updating: {
                now: !this.state.updating.now,
                reviewId: reviewId
            }
        });
    }

    changeContentHandler = (event) => {
        this.setState({ content: event.target.value });
    }

    createReview = () => {
        if (MemberService.getCurrentMember() != null) {
            let review = {
                productId: this.state.productId,
                memberId: MemberService.getCurrentMember(),
                content: this.state.content
            };
            console.log("review => " + JSON.stringify(review));
            ShopService.createReview(review).then(res => {
                window.location.reload();
            });
        } else
            alert("로그인 후 이용 바랍니다.")
    }

    updateReview = (reviewId) => {
        let review = {
            productId: this.state.productId,
            memberId: MemberService.getCurrentMember(),
            content: this.state.content
        };
        console.log("review => " + JSON.stringify(review));
        ShopService.updateReview(reviewId, review).then(res => {
            window.location.reload();
        });
    }

    deleteReview = async function (reviewId) {
        if (window.confirm("정말로 리뷰를 삭제하시겠습니까?\n삭제된 리뷰는 복구할 수 없습니다")) {
            ShopService.deleteReview(this.state.productId, reviewId).then(res => {
                console.log("delete result => " + JSON.
                stringify(res));
                if (res.status == 200) {
                    window.location.reload();
                } else {
                    alert("리뷰 삭제가 실패했습니다.");
                }
            });
        }
    }

    render() {
        return (
            <>
                {/* 리뷰리스트 */}
                <ul className="review-list">
                    {
                        this.state.reviews.map((review) => (
                            <li className="review-item">
                                <Container>
                                    <Row style={{ height: '30px' }}>
                                        <Col md="3" className="review-user">
                                            <div><span>{review.member.id}</span>님의 리뷰입니다</div>
                                        </Col>
                                        <Col className="review-star">
                                            <div className="star-wrap">
                                                <div className="star-rating">
                                                    <span style={{ width: "60%" }}></span>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col className='review-created-date'>
                                            <div><span>{review.created_date.substring(0, 16)}</span>님의 리뷰입니다</div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3">
                                        </Col>
                                        <Col className="review-content">
                                            <div className="review-img">
                                                <img alt="review_img" src={require("assets/img/eva.jpg")} />
                                            </div>
                                            <div className="review-text">
                                                {!this.state.updating.now && <span className='shop-review-text'>{review.text}</span>}
                                                {this.state.updating.now && this.state.updating.reviewId == review.id &&
                                                    <div className='shop-updatereview-wrapper'>
                                                        <textarea
                                                            id='shop-updatereview'
                                                            placeholder='불쾌감을 주는 욕설과 악플은 삭제될 수 있습니다.'
                                                            defaultValue={review.ctext}
                                                            onChange={this.changeContentHandler}>
                                                        </textarea>
                                                        <div className='shop-reviewupdate-btn-wrapper'>
                                                            <Button className="shop-reviewupdate-btn btn-round ml-1" type="button" onClick={() => this.updateReview(review.id)}>
                                                                등록
                                                            </Button>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            {MemberService.getCurrentMember() == review.member.id && !this.state.updating.now &&
                                                <div className='shop-review-btn-wrapper'>
                                                    <Button className="shop-review-btn-edit btn-round ml-1" type="button" onClick={() => this.changeUpdating(review.id)}>수정</Button>
                                                    <Button className="shop-review-btn-cancel btn-round ml-1" type="button" onClick={() => this.deleteReview(review.id)}>삭제</Button>
                                                </div>
                                            }
                                        </Col>
                                    </Row>
                                </Container>
                            </li>
                        ))
                    }
                    {/* <li className="review-item">
                        <Container>
                            <Row style={{ height: '30px' }}>
                                <Col md="3" className="review-user">
                                    <div><span>홍**</span>님의 리뷰입니다</div>
                                </Col>
                                <Col className="review-star">
                                    <div className="star-wrap">
                                        <div className="star-rating">
                                            <span style={{ width: "60%" }}></span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3">
                                </Col>
                                <Col className="review-content">
                                    <div className="review-img">
                                        <img alt="review_img" src={require("assets/img/eva.jpg")} />
                                    </div>
                                    <div className="review-text">
                                        나쁘지 않은듯? 아마도?
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </li>
                    <li className="review-item">
                        <Container>
                            <Row style={{ height: '30px' }}>
                                <Col md="3" className="review-user">
                                    <div><span>김**</span>님의 리뷰입니다</div>
                                </Col>
                                <Col className="review-star">
                                    <div className="star-wrap">
                                        <div className="star-rating">
                                            <span style={{ width: "100%" }}></span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3">
                                </Col>
                                <Col className="review-content">
                                    <div className="review-text">
                                        진짜 최고. 여러분 제발 여기 사이트 이용하세요. 특히 이 제품.<br />
                                        한 번 이거 산 뒤로 계속 이 제품만 사용하는 중입니다.<br />
                                        쓸 말 고갈. 진짜 우리 사이트 최고 짱짱맨<br />
                                        최고의 비건 사이트 비긴~ 야호~<br />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </li> */}
                </ul>
            </>
        );
    }
}

export default Reviews;