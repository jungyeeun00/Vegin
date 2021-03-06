import React, { useState, useEffect } from 'react';
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import VeginFooter from "components/Footers/VeginFooter";
import ShopItem from '../index-sections/ShopItem';
import MyPageService from 'service/MyPageService';

const memberId = localStorage.getItem("member");

function LikesPage(props) {
    const [products, setProducts] = useState([])

    /* 찜한 목록 불러옴 */
    useEffect(() => {
        MyPageService.getLikeList(memberId).then((res) => {
            setProducts(res.data);
        })
    }, []);

    /* 취소 시 목록 업데이트(취소한 아이템 제외) */
    const onUpdate = (id) => {
        var newProducts = products;
        newProducts = products.filter(product => product.productId !== id);
        setProducts(newProducts);
    }

    return (
        <>
            <IndexNavbar />
            <div className="like-main">
                <div className="like-list">
                    <h3 id="like-Lbl">관심 상품</h3>
                    <div>
                        <ul className="like-tb">
                            {
                                products.map(
                                    product =>
                                        <li key={product.productId}>
                                            <ShopItem product={product} like={true} isList={true} onUpdate={onUpdate}/>
                                        </li>
                                )}
                        </ul>
                    </div>
                </div>

            </div>
            <VeginFooter />
        </>
    );
}

export default LikesPage;