import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

const PlaceItem = ({place, changeShowDetail}) => {
    const { UPSO_NM, COB_CODE_NM, CRTFC_GBN_NM, RDN_CODE_NM, TEL_NO } = place;
    const [img, setImg] = useState('assets/img/place_item.jpg');
    var image = null;

    const Kakao = axios.create({
        baseURL: 'https://dapi.kakao.com', // 공통 요청 경로를 지정해준다.
        headers: {
          Authorization: 'KakaoAK 11a1559feddfabd645cb5d5bb075dd14',
        },
      });

      useEffect(() => {
        //   bookSearchHttpHandler(query); // 컴포넌트 마운트 후에, 함수를 호출한다.
        imageSearchHttpHandler(UPSO_NM);
      }, []);

      // search image api
      const imageSearch = (params) => {
        return Kakao.get('/v2/search/image', { params });
      };

      const imageSearchHttpHandler = async (query) => {
        // Parameter 설정
        const params = {
          query: query,
          sort: 'accuracy', // accuracy | recency 정확도 or 최신
          page: 1, // 페이지번호
          size: 10, // 한 페이지에 보여 질 문서의 개수
        };
    
        const { data } = await imageSearch(params); // api 호출
        setImg(data.documents[0].image_url);
        image=data.documents[0].image_url
        console.log(query +":"+ data.documents[0].image_url+"\n"+image);
      };

      const getImg = () => {
        return image;
      }

    return (
        <>
            <Row>
                <Col md="4" className="list-img-col">
                    {/* <img className="list-img" alt="place_img" src={require("assets/img/place_item.jpg")} /> */}
                    { <img className="list-img" alt="place_img" src={img} />}
                </Col>
                <Col>
                    <Row className="name-category">
                        <div className='place-name' onClick={changeShowDetail}>{UPSO_NM}</div>
                        <div className='place-category'>{COB_CODE_NM}</div>
                    </Row>
                    <div className="place-address">{RDN_CODE_NM}</div>
                    <div className="place-time">
                        <span><FontAwesomeIcon icon={faPhone} /></span>
                        <span>{TEL_NO}</span>
                    </div>
                </Col>
            </Row>
        </>
    );

}

export default PlaceItem;