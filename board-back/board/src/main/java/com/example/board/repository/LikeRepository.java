package com.example.board.repository;

import com.example.board.model.Likes;
import com.example.board.model.LikeId;
import com.example.board.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LikeRepository extends JpaRepository<Likes, LikeId> {

    public final static String SELECT_LIKE_PRODUCT = ""
            + "SELECT * FROM Product "
            + "WHERE product_id in "
            + "(SELECT DISTINCT l.product_id FROM Like l "
            + "WHERE l.member_id=?1)";

    public final static String SELECT_LIKE_ID = ""
            + "SELECT product_id FROM Likes "
            + "WHERE member_id=?1";

    @Query(value = SELECT_LIKE_PRODUCT, nativeQuery = true)
    List<Product> findByMember(final String memberId);

    @Query(value = SELECT_LIKE_ID, nativeQuery = true)
    List<Integer> findLikeId(final String memberId);
}
