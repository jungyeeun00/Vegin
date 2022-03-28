import React, { Component } from 'react';

class ProductInquiry extends Component {
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
                                    <th scope="col" style={{width: "8%"}}> 번호</th>
                                    <th scope="col" style={{width: "66%"}}> 제목 </th>
                                    <th scope="col" style={{width: "10%"}}> 작성자 </th>
                                    <th scope="col" style={{width: "10%"}}> 작성일 </th>
                                    <th scope="col" style={{width: "8%"}}> 답변여부 </th>
                                </tr>
                            </thead>
                            <tbody className="inq-tbody">
                                <tr>
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
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}

export default ProductInquiry;