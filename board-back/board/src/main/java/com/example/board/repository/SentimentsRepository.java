package com.example.board.repository;

import com.example.board.model.Review;
import com.example.board.model.Sentiments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SentimentsRepository extends JpaRepository<Sentiments, Integer> {
    public String SCORE_BY_ID =
            "SELECT s.percent from Sentiments s "
                    + "WHERE s.reviewId in "
                    + "(SELECT r.id FROM Review r WHERE r.product.productId=:productId) "
                    + "order by s.reviewId ASC";

    @Query(value = SCORE_BY_ID)
    public List<Float> getScore(@Param("productId") Integer productId);

    @Query("SELECT r FROM Review r WHERE r.id=:reviewId")
    public Review getLastReview(@Param("reviewId") Integer reviewId);
}
