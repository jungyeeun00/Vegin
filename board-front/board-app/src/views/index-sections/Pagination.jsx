import React, { useState } from 'react';
import _ from 'lodash';

const Pagination = (props) => {
    // const [last, setLast] = useState(false);
    // const [first, setFirst] = useState(false);

    const { itemsCount, pageSize, currentPage, onPageChange , onPagePrevious, onPageNext } = props; // 각각 아이템(글 목록) 개수, 한 페이지에 보여줄 아이템(글 목록) 개수
    
    const pageCount = Math.ceil(itemsCount / pageSize); // 몇 페이지가 필요한지 계산
    if (pageCount === 1) return null; // 1페이지 뿐이라면 페이지 수를 보여주지 않음

    var pages = _.range(1, pageCount + 1);
    if (pageCount / 5 > 1) {
        if (pageCount % 5 == 0)
            pages = _.range(parseInt(currentPage / 6) * 5 + 1, parseInt(currentPage / 6) * 5 + 6);
        else if (currentPage % 5 == 0)
            pages = _.range(parseInt(currentPage / 6) * 5 + 1, currentPage + 1);
        else if (pageCount - (parseInt(currentPage / 5) * 5 + 1) < 5)
            pages = _.range(parseInt(currentPage / 5) * 5 + 1, pageCount + 1);
        else
            pages = _.range(parseInt(currentPage / 5) * 5 + 1, parseInt(currentPage / 5) * 5 + 6);
    }

    return (
        <nav id="pagination">
            <ul className="pagination">
                <li className="page-item">
                    <a id="prePageItem" aria-label="Previous" className="page-link" onClick={() => onPagePrevious()}>
                        <i aria-hidden="true" className="fa fa-angle-left"></i>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>
                {pages.map(page => (
                    <li id="idPageItem"
                        key={page}
                        className={page === currentPage ? "page-item active" : "page-item"} // Bootstrap을 이용하여 현재 페이지를 시각적으로 표시
                        style={{ cursor: "pointer" }}>
                        <a id="idPageItem" className="page-link" onClick={() => onPageChange(page)}>{page}</a> {/* 페이지 번호 클릭 이벤트 처리기 지정 */}
                    </li>
                ))}
                <li className="page-item">
                    <a id="nextPageItem" aria-label="Next" className="page-link" onClick={() => onPageNext()}>
                        <i aria-hidden="true" className="fa fa-angle-right"></i>
                        <span className="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;