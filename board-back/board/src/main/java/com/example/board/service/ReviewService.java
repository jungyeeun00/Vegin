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

import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;

import java.io.ByteArrayOutputStream;
import java.sql.Timestamp;
import java.util.*;

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

    public List<String> ListSentiments(int productId) {
        List<String> result = new ArrayList<>();
        List<Review> reviewList = this.reviewRepository.getReviewsOfProduct(productId);
        for(Review review : reviewList) {
            String str = predictReview(review.getText()) + '\t';
            result.add(str);
        }

        return result;
    }

    public String predictReview(String sentence) {
        String score = null;
        try {
            /* 파이썬에서 퍼센트 받아오기 */
            String[] command = new String[3];
            command[0] = "python";
            command[1] = "./review/predict.py";
            command[2] = sentence;

            score = execPython(command);


        } catch (Exception e) {
            e.printStackTrace();
        }

        return score;
    }

    /* 리뷰 파이썬 실행 */
    public static String execPython(String[] command) {
        String score = null;
        try {
            CommandLine commandLine = CommandLine.parse(command[0]);
            for (int i = 1, n = command.length; i < n; i++) {
                commandLine.addArgument(command[i]);
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(outputStream);
            DefaultExecutor executor = new DefaultExecutor();
            executor.setStreamHandler(pumpStreamHandler);
            int result = executor.execute(commandLine);

            score = new String(outputStream.toByteArray());

        } catch (Exception e) {
            e.printStackTrace();
        }

        return score;
    }
}
