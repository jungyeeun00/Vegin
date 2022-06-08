package com.example.board.service;

import com.example.board.exception.ResourceNotFoundException;
import com.example.board.model.*;
import com.example.board.repository.*;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ReviewService {
    @NonNull
    private ShopRepository shopRepository;
    @NonNull
    private ReviewRepository reviewRepository;
    @NonNull
    private MemberRepository memberRepository;

    /* ��ǰ �ı� ��� */
    public Review createReview(Review review, String memberId, int productId) {
        Optional<Product> product = this.shopRepository.findById(productId);
        Optional<Member> member = this.memberRepository.findById(memberId);
        product.ifPresent(re->{
            review.changeProduct(re);
        });
        member.ifPresent(re->{
            review.changeAuthor(re);
        });
        System.out.println(review);
        return this.reviewRepository.save(review);
    }

    /* ��ǰ �ı� ���� */
    public ResponseEntity<Review> updateReview(Integer id, Review updatedReview) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Review Data by id : [" + id + "]"));
        review.setImg_src(updatedReview.getImg_src());
        review.setText(updatedReview.getText());
        review.setLast_modified_date((new Timestamp(System.currentTimeMillis())).toString());

        Review endUpdatedReview = reviewRepository.save(review);
        return ResponseEntity.ok(endUpdatedReview);
    }

    /* ��ǰ �ı� ��� */
    @Transactional(readOnly = true)
    public List<Review> Listreviews(int productId) {
        return this.reviewRepository.getReviewsOfProduct(productId);
    }

    /* ��ǰ �ı� ���� */
    @Transactional
    public List<Review> Deletereview(int reviewId, int productId) {
        this.reviewRepository.deleteById(reviewId);
        return this.reviewRepository.getReviewsOfProduct(productId);
    }

}
