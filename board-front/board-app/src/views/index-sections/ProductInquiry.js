import React, { Component } from 'react';
import { Button } from 'reactstrap';
import ShopService from 'service/ShopService';
import MemberService from 'service/MemberService';

class ProductInquiry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productId: this.props.productId,
            inquirys: [],
            text: '',
            updating: {
                now: false,
                inquiryId: ''
            },
            details: []
        }

        // this.goToUpdate = this.goToUpdate.bind(this);
        this.changetextHandler = this.changetextHandler.bind(this);
    }

    componentDidMount() {
        ShopService.getInquirys(this.state.productId).then(res => {
            this.setState({ inquirys: res.data });
            console.log(res.data);
        })
    }

    returnCurrentMember() {
        let currentMember = null;
        if (MemberService.getCurrentMember() == null)
            currentMember = "문의 작성 시 로그인 필요";
        else
            currentMember = MemberService.getCurrentMember();

        return currentMember;
    }

    goToList() {
        this.props.history.goBack();
    }

    goToUpdate = (event) => {
        event.preventDefault();
        this.props.history.push(`/create-inquiry/${this.state.productId}`);
    }

    changeUpdating = (inquiryId) => {
        this.setState({
            updating: {
                now: !this.state.updating.now,
                inquiryId: inquiryId
            }
        });
    }

    changetextHandler = (event) => {
        this.setState({ text: event.target.value });
    }

    createInquiry = () => {
        if (MemberService.getCurrentMember() != null) {
            let inquiry = {
                productId: this.state.productId,
                memberId: MemberService.getCurrentMember(),
                text:this.state.text
            };
            console.log("inquiry => " + JSON.stringify(inquiry));
            ShopService.createInquiry(inquiry).then(res => {
                window.location.reload();
            });
        } else
            alert("로그인 후 이용 바랍니다.")
    }

    updateInquiry = (inquiryId) => {
        let inquiry = {
            productId: this.state.productId,
            memberId: MemberService.getCurrentMember(),
            text: this.state.text
        };
        console.log("inquiry => " + JSON.stringify(inquiry));
        ShopService.updateInquiry(inquiryId, inquiry).then(res => {
            window.location.reload();
        });
    }

    deleteInquiry = async function (inquiryId) {
        if (window.confirm("정말로 문의를 삭제하시겠습니까?\n삭제된 문의는 복구할 수 없습니다")) {
            ShopService.deleteInquiry(inquiryId).then(res => {
                console.log("delete result => " + JSON.stringify(res));
                if (res.status == 200) {
                    window.location.reload();
                } else {
                    alert("문의 삭제가 실패했습니다.");
                }
            });
        }
    }

    deleteAnswer = async function (inquiryId) {
        if (window.confirm("정말로 답변을 삭제하시겠습니까?\n삭제된 답변은 복구할 수 없습니다")) {
            ShopService.deleteAnswer(this.state.productId, inquiryId).then(res => {
                console.log("delete result => " + JSON.stringify(res));
                if (res.status == 200) {
                    window.location.reload();
                } else {
                    alert("답변 삭제가 실패했습니다.");
                }
            });
        }
    }

    openDetail = (inquiryId) => {
        // this.setState({ details: this.state.details.push(inquiryId) });
        this.state.details.push(inquiryId);
    }

    render() {
        return (
            <>
                <div className="inq-main">
                    <div className="inq-title">
                        <h5 className="text-center">Q&A</h5>
                    </div>
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
                                        <tr className="inquiry-item" onClick={this.openDetail(inquiry.id)}>
                                            <td scope="row">{inquiry.id}</td>
                                            {/* <td>{inquiry.title}</td> */}
                                            {/* <td>{inquiry.member.id}</td> */}
                                            <td></td>
                                            <td></td>
                                            <td>{inquiry.created_date.substring(0, 16)}</td>
                                            <td>{inquiry.answer!='' ? "완료" : "미완료"}</td>
                                        </tr>
                                        {
                                            this.state.details.includes(inquiry.id) &&
                                            <tr>
                                                <div className='inquiry-wrapper'>
                                                    <hr />
                                                    <div className='inquiry-text' dangerouslySetInnerHTML={{ __html: inquiry.text }} />
                                                    <br /><br />
                                                    {/* {MemberService.getCurrentMember() == inquiry.member.id &&
                                                        <div className='inquiry-btn'>
                                                            <Button className="inquiry-btn-edit btn-round ml-1" type="button" onClick={this.goToUpdate}>
                                                                수정
                                                            </Button>
                                                                <Button className="inquiry-btn-cancel btn-round ml-1" type="button" onClick={() => this.deleteInquiry(inquiry.id)}>
                                                                삭제
                                                            </Button>
                                                        </div>
                                                    } */}
                                                    <hr />
                                                    {/* 여기서부터 댓글 */}
                                                    <div className='inquiry-writeanswer-wrapper'>
                                                        &nbsp;<span className='inquiry-writeanswer-name'>{this.returnCurrentMember()}</span>
                                                        <textarea
                                                            id='inquiry-writeanswer'
                                                            placeholder='답변을 입력하세요.'
                                                            onChange={this.changetextHandler}>
                                                        </textarea>
                                                        <div className='inquiry-answerwrite-btn-wrapper'>
                                                            <Button className="inquiry-answerwrite-btn btn-round ml-1" type="button" onClick={() => this.createAnswer()}>
                                                                등록
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className='inquiry-answer-wrapper'>
                                                        {
                                                            inquiry.answer!=null &&
                                                            <div className='inquiry-answer'>
                                                                <hr />
                                                                <div className='inquiry-answer-text'>
                                                                    <span className='inquiry-answer-text'>{inquiry.answer}</span>
                                                                </div>
                                                                {/* {MemberService.getCurrentMember() == inquiry.member.id &&
                                                                    <div className='inquiry-answer-btn-wrapper'>
                                                                        <Button className="inquiry-answer-btn-cancel btn-round ml-1" type="button" onClick={() => this.deleteAnswer(inquiry.id)}>삭제</Button>
                                                                    </div>
                                                                } */}
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </tr>
                                        }
                                    </tbody>
                                ))
                            }
                            {/* <tr>
                                    <td scope="row">1</td>
                                    <td>문의 제목</td>
                                    <td>편주혜</td>
                                    <td>2022.04.11</td>
                                    <td>미완료</td>
                                </tr>
                                <tr>
                                    <td scope="row">2</td>
                                    <td>문의 제목2</td>
                                    <td>편주혜</td>
                                    <td>2022.04.11</td>
                                    <td>미완료</td>
                                </tr> */}
                        </table>
                    </div>
                </div>
            </>
        );
    }
}

export default ProductInquiry;