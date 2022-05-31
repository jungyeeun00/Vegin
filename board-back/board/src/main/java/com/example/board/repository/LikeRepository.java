package com.example.board.repository;

import com.example.board.model.Board;
import com.example.board.model.Like;
import com.example.board.model.LikeId;
import com.example.board.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, LikeId> {

    public final static String SELECT_LIKE_LIST = ""
            + "SELECT * FROM Product "
            + "WHERE product_id in "
            + "(SELECT DISTINCT l.product_id FROM Like l "
            + "WHERE l.member_id=?1)";

    @Query(value = SELECT_LIKE_LIST, nativeQuery = true)
    List<Product> findByMember(final String memberId);
}
