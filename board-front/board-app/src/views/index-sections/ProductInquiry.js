import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import ShopService from 'service/ShopService';
import MemberService from 'service/MemberService';

class ProductInquiry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productId: this.props.productId,
            inquirys: [],
            title: '',
            text: '',
            answer: '',
            creating: false,
            updating: {
                now: false,
                inquiryId: ''
            },
            details: [],
            role: ''
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeTextHandler = this.changeTextHandler.bind(this);
        this.changeAnswerHandler = this.changeAnswerHandler.bind(this);
    }

    componentDidMount() {
        /* 서버에서 상품 문의 정보 가져오기 */
        ShopService.getInquirys(this.state.productId).then(res => {
            this.setState({ inquirys: res.data });
        })
    }

    /* 로그인 한 유저 정보 가져오기 */
    returnCurrentMember() {
        let currentMember = null;
        if (MemberService.getCurrentMember() === null)
            currentMember = "문의 작성 시 로그인 필요";
        else
            currentMember = MemberService.getCurrentMember();

        return currentMember;
    }

    /* 상품 문의 등록 상태로 업데이트 */
    changeCreating = () => {
        this.setState({
            creating: true
        });
    }

    /* 상품 문의 수정 상태로 업데이트 */
    changeUpdating = (inquiryId) => {
        this.setState({
            updating: {
                now: !this.state.updating.now,
                inquiryId: inquiryId
            }
        });
    }

    /* onChange 이벤트 발생 시 상품 문의 제목 저장 */
    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }

    /* onChange 이벤트 발생 시 상품 문의 내용 저장 */
    changeTextHandler = (event) => {
        this.setState({ text: event.target.value });
    }

    /* onChange 이벤트 발생 시 상품 문의 답변 저장 */
    changeAnswerHandler = (event) => {
        this.setState({ answer: event.target.value });
    }

    /* 상품 문의 삭제 */
    createInquiry = () => {
        if (MemberService.getCurrentMember() !== null) {
            let inquiry = {
                productId: this.state.productId,
                memberId: MemberService.getCurrentMember(),
                title: this.state.title,
                text: this.state.text,
                answer: ''
            };
            console.log("inquiry => " + JSON.stringify(inquiry));
            ShopService.createInquiry(inquiry).then(res => {
                this.setState({
                    creating: false
                })
                window.location.reload();
            });
        } else
            alert("로그인 후 이용 바랍니다.")
    }

    /* 상품 문의 수정 */
    updateInquiry = (inquiryId, title, answer, answerMemberId) => {
        let inquiry = {
            productId: this.state.productId,
            memberId: MemberService.getCurrentMember(),
            title: title,
            text: this.state.text,
            answer: answer,
            answerMemberId: answerMemberId
        };
        console.log("inquiry => " + JSON.stringify(inquiry));
        ShopService.updateInquiry(inquiryId, inquiry).then(res => {
            window.location.reload();
        });
    }

    /* 상품 문의 삭제 */
    deleteInquiry = async function (inquiryId) {
        if (window.confirm("정말로 문의를 삭제하시겠습니까?\n삭제된 문의는 복구할 수 없습니다")) {
            ShopService.deleteInquiry(this.state.productId, inquiryId).then(res => {
                console.log("delete result => " + JSON.stringify(res));
                window.location.reload();
            }).catch((err) => alert("문의 삭제가 실패했습니다."));
        }
    }

    /* 상품 문의 답변 등록 */
    createAnswer = (inquiryId, memberId, title, text) => {
        if (MemberService.getCurrentMember() !== null) {
            let inquiry = {
                productId: this.state.productId,
                memberId: memberId,
                title: title,
                text: text,
                answer: this.state.answer,
                answerMemberId: MemberService.getCurrentMember()
            };
            console.log("inquiry => " + JSON.stringify(inquiry));
            ShopService.updateInquiry(inquiryId, inquiry).then(res => {
                window.location.reload();
            });
        } else
            alert("로그인 후 이용 바랍니다.")
    }

    /* 상품 문의 답변 삭제 */
    deleteAnswer = async function (inquiryId, title, text) {
        if (window.confirm("정말로 답변을 삭제하시겠습니까?\n삭제된 답변은 복구할 수 없습니다")) {
            let inquiry = {
                productId: this.state.productId,
                memberId: MemberService.getCurrentMember(),
                title: title,
                text: text,
                answer: '',
                answerMemberId: null
            };
            console.log("inquiry => " + JSON.stringify(inquiry));
            ShopService.updateInquiry(inquiryId, inquiry).then(res => {
                window.location.reload();
            }).catch((err) => alert("답변 삭제가 실패했습니다."));
        }
    }

    /* 상품 문의 상세 열린 상태로 업데이트 */    
    openDetail = (inquiryId) => {
        if (!this.state.details.includes(inquiryId))
            this.state.details.push(inquiryId);
        else
            this.state.details.pop(inquiryId);
        this.setState({ details: this.state.details });
        this.checkRole();
    }

    /* 상품 문의 답변 등록 및 삭제 권한 검사 */
    checkRole = () => {
        MemberService.getOneMember(MemberService.getCurrentMember()).then((res) => {
            this.setState({ role: res.data.role });
        })
    }

    render() {
        return (
            <>
                <div className="inq-main">
                    {!this.state.creating &&
                        <div className="inq-title">
                            <h5 className="text-center">Q&A</h5>
                        </div>
                    }
                    {!this.state.creating &&
                        <div className="inq-tb-wrap">
                            <table className="inq-tb table">
                                <thead className="inq-thead">
                                    <tr>
                                        <th scope="col" style={{ width: "8%" }}> 번호</th>
                                        <th scope="col" style={{ width: "66%" }}> 제목 </th>
                                        <th scope="col" style={{ width: "10%" }}> 작성자 </th>
                                        <th scope="col" style={{ width: "10%" }}> 작성일 </th>
                                        <th scope="col" style={{ width: "8%" }}> 답변여부 </th>
                                    </tr>
                                </thead>
                                {
                                    this.state.inquirys.map((inquiry) => (
                                        <tbody className="inq-tbody">
                                            <tr className="inquiry-item" onClick={() => this.openDetail(inquiry.id)}>
                                                <td scope="row">{inquiry.id}</td>
                                                <td>{inquiry.title}</td>
                                                <td>{inquiry.member.id}</td>
                                                <td>{inquiry.created_date.substring(0, 10)}</td>
                                                <td>{inquiry.answer !== '' ? "완료" : "미완료"}</td>
                                            </tr>
                                            {
                                                this.state.details.includes(inquiry.id) &&
                                                <tr>
                                                    <td colSpan='5'>
                                                        <div className='inquiry-wrapper'>
                                                            {!this.state.updating.now &&
                                                                <div className='inquiry-content' dangerouslySetInnerHTML={{ __html: inquiry.text }} />
                                                            }
                                                            {this.state.updating.now && this.state.updating.inquiryId === inquiry.id &&
                                                                <div className='shop-updateinquiry-wrapper'>
                                                                    <textarea
                                                                        id='shop-updateinquiry'
                                                                        placeholder='불쾌감을 주는 욕설과 악플은 삭제될 수 있습니다.'
                                                                        defaultValue={inquiry.text}
                                                                        onChange={this.changeTextHandler}>
                                                                    </textarea>
                                                                    <div className='shop-inquiryupdate-btn-wrapper'>
                                                                        <Button className="shop-inquiryupdate-btn btn-round ml-1" type="button" onClick={() => this.updateInquiry(inquiry.id, inquiry.title, inquiry.answer, inquiry.answerMemberId)}>
                                                                            등록
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            }
                                                            {MemberService.getCurrentMember() === inquiry.member.id && !this.state.updating.now &&
                                                                <div className='inquiry-btn'>
                                                                    <Button className="inquiry-btn-edit btn-round ml-1" type="button" onClick={() => this.changeUpdating(inquiry.id)}>
                                                                        수정
                                                                    </Button>
                                                                    <Button className="inquiry-btn-cancel btn-round ml-1" type="button" onClick={() => this.deleteInquiry(inquiry.id)}>
                                                                        삭제
                                                                    </Button>
                                                                </div>
                                                            }
                                                            <hr />
                                                            {/* 여기서부터 답변 */}
                                                            {
                                                                inquiry.answer === '' &&
                                                                this.state.role === "ROLE_ADMIN" &&
                                                                <div className='inquiry-writeanswer-wrapper'>
                                                                    &nbsp;<span className='inquiry-writeanswer-name'>관리자명: {this.returnCurrentMember()}</span>
                                                                    <textarea
                                                                        id='inquiry-writeanswer'
                                                                        placeholder='답변을 입력하세요.'
                                                                        onChange={this.changeAnswerHandler}>
                                                                    </textarea>
                                                                    <div className='inquiry-answerwrite-btn-wrapper'>
                                                                        <Button className="inquiry-answerwrite-btn btn-round ml-1" type="button" onClick={() => this.createAnswer(inquiry.id, inquiry.member.id, inquiry.title, inquiry.text)}>
                                                                            등록
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            }
                                                            <div className='inquiry-answer-wrapper'>
                                                                {
                                                                    inquiry.answer !== '' &&
                                                                    <div className='inquiry-answer'>
                                                                            <div className='inquiry-answer-content'>
                                                                                <Row>
                                                                                    <Col md='2' className='inquiry-answer-member-id'>관리자명: {inquiry.answerMember.id}</Col>
                                                                                    <Col md='8' className='inquiry-answer-text'>{inquiry.answer}</Col>
                                                                                </Row>
                                                                        </div>
                                                                        {MemberService.getCurrentMember() === inquiry.answerMember.id &&
                                                                            <div className='inquiry-answer-btn-wrapper'>
                                                                                <Button className="inquiry-answer-btn-cancel btn-round ml-1" type="button" onClick={() => this.deleteAnswer(inquiry.id, inquiry.title, inquiry.text)}>삭제</Button>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
                                    ))
                                }
                            </table>
                        </div>
                    }
                    {!this.state.creating &&
                        <div className='btn-write'>
                            <button className='btn-round btn' onClick={() => this.changeCreating()}>문의 작성</button>
                        </div>
                    }
                    {this.state.creating &&
                        <div className='wp-wrapper'>
                            <div className='row'>
                                <div className='card-body'>
                                    <form>
                                        <div className='form-group'>
                                            <label>Title</label>
                                            <input type="text" placeholder='title' name='title' className='form-control' value={this.state.title} onChange={this.changeTitleHandler} />
                                        </div>
                                        <div className='form-group'>
                                            <label>MemberId</label>
                                            <input placeholder='memberId' name='memberId' className='form-control' value={localStorage.getItem("member")} style={{ pointerEvents: 'none' }} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Content</label><br/>
                                            <textarea id='shop-createinquiry-content' placeholer='불쾌감을 주는 욕설과 악플은 삭제될 수 있습니다.' onChange={this.changeTextHandler}></textarea>
                                        </div>
                                        <div className='wp-post-btn-wrapper'>
                                            <Button className="wp-post-btn btn-round ml-1" type='button' onClick={() => this.createInquiry()}>등록</Button>
                                            <Button className="wp-post-btn btn-round ml-1" type='button' onClick={this.cancel} style={{ marginLeft: "10px" }}>취소</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </>
        );
    }
}

export default ProductInquiry;