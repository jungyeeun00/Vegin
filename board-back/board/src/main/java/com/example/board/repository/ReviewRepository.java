package com.example.board.repository;

import com.example.board.model.Review;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends CrudRepository<Review, Integer> {

    /* ��ǰ �ı� ��� */
    @Query("SELECT r from Review r where r.product.productId=:productId and r.id>0 order by r.id ASC")
    public List<Review> getReviewsOfProduct(@Param("productId") Integer productId);

}
