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
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <div className="foot_left">
                <ul>
                  <li>
                    <br />CS
                    <br />ekfqlc0103@hansung.ac.kr
                  </li>
                </ul>
                <ul>
                  <li>010-1234-5678</li>
                  <li>ekfqlc0103@hansung.ac.kr</li>
                  <li>
                    10:00 ~ 18:00<br />
                    점심시간 12:00 ~ 13:30
                  </li>
                </ul>
              </div>
              <div className="foot_center">
                <ul>
                  <li>COMPANY</li>
                  <div>
                    <span>
                      상호
                      <span>(주)비긴컴퍼니</span>
                    </span>
                    <span>
                      대표
                      <span>정윤이편</span>
                    </span>
                    <span>
                      사업자등록번호
                      <span>02-760-8076</span>
                    </span>
                    <br/>
                    <span>
                      전화
                      <span>02-760-8079</span>
                    </span>
                    <span>
                      주소
                      <span>서울특별시 성북구 삼선교로16길 116 한성대학교 상상빌리지</span>
                    </span>
                    <br/>
                    <span>
                      개인정보관리책임자
                      <span>정예은 (ekfqlc0103@naver.com)</span>
                    </span>
                  </div>
                </ul>
              </div>
              <div className="foot_right">
                <ul>
                  <li>BANK</li>
                </ul>
                <ul>
                  <li>
                    <span>기업은행</span>
                    <br/>
                    <span>505-044752-01-012</span>
                    <br/>
                    <span>정예은^^7</span>
                  </li>
                </ul>
              </div>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by Creative Tim
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default VeginFooter;
