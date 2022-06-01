/*!

=========================================================
* Paper Kit React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Row, Container } from "reactstrap";

function VeginFooter() {
  return (
    <footer className="footer footer-black footer-white">
      <hr></hr>
      {/* <Container> */}
      {/* <Row> */}
      <nav className="footer-nav">
        <ul className="footer-inner">
          <div className="foot_left">
            <ul>
              <li className="footer-title">
                <span>CS</span>
              </li>
              ekfqlc0103@hansung.ac.kr
            </ul>
            <ul>
              <li className="tel">010-1234-5678</li>
              <li>ekfqlc0103@hansung.ac.kr</li>
              <li>
                10:00 ~ 18:00 (평일 및 주말 휴무)<br />
                점심시간 12:00 ~ 13:30
              </li>
            </ul>
          </div>
          <div className="foot_center">
            <ul>
              <li className="footer-title">
                <span>COMPANY</span>
              </li>
              <div>
                <span className="ft-center-title">
                  상호
                </span>
                <span>&nbsp;&nbsp;(주)비긴컴퍼니</span>
                <span className="ft-center-title">
                  대표
                </span>
                <span>&nbsp;&nbsp;정윤이편</span>
                <span className="ft-center-title">
                  사업자등록번호
                </span>
                <span>&nbsp;&nbsp;02-760-8076</span>
                <br />
                <span className="ft-center-title">
                  전화
                </span>
                <span>&nbsp;&nbsp;02-760-8079</span>
                <span className="ft-center-title">
                  주소
                </span>
                <span>&nbsp;&nbsp;서울특별시 성북구 삼선교로16길 116 한성대학교</span>
                <br />
                <span className="ft-center-title">
                  개인정보관리책임자
                </span>
                <span>&nbsp;&nbsp;정예은 (ekfqlc0103@naver.com)</span>
              </div>
            </ul>
          </div>
          <div className="foot_right">
            <ul>
              <li className="footer-title">
                <span>BANK</span>
              </li>
            </ul>
            <ul>
              <li>
                <span>기업은행</span>
                <br />
                <span>505-044752-01-012</span>
                <br />
                <span>정예은</span>
              </li>
            </ul>
          </div>
        </ul>
      </nav>
    </footer>
  );
}

export default VeginFooter;
