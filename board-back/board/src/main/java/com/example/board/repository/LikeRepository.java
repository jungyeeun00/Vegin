package com.example.board.repository;

import com.example.board.dto.ProductDto;
import com.example.board.model.Likes;
import com.example.board.model.LikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LikeRepository extends JpaRepository<Likes, LikeId> {

    /* Like 누른 상품 */
    public final static String SELECT_LIKE_PRODUCT = ""
            + "SELECT "
            + "p.product_id as productId,"
            + "p.product_name as productName,"
            + "p.reg_price as regPrice,"
            + "p.sold_price as soldPrice,"
            + "p.sale_rate as saleRate,"
            + "p.category as category,"
            + "p.img_src as imgSrc,"
            + "p.detail as detail "
            + "FROM Product p "
            + "WHERE p.product_id in "
            + "(SELECT DISTINCT l.product_id FROM Likes l "
            + "WHERE l.member_id=?1)";

    /* Like 누른 상품 아이디 */
    public final static String SELECT_LIKE_ID = ""
            + "SELECT product_id FROM Likes "
            + "WHERE member_id=?1";

    @Query(value = SELECT_LIKE_PRODUCT, nativeQuery = true)
    List<ProductDto> findByMemberId(final String memberId);

    @Query(value = SELECT_LIKE_ID, nativeQuery = true)
    List<Integer> findLikeId(final String memberId);
}
