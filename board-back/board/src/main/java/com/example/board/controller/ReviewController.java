package com.example.board.controller;

import com.example.board.dto.ReviewDto;
import com.example.board.model.Recipe;
import com.example.board.model.Review;
import com.example.board.repository.MemberRepository;
import com.example.board.service.ReviewService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/review")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ReviewController {

    @NonNull
    MemberRepository memberRepository;
    @NonNull
    ReviewService reviewService;

    /* ��ǰ �ı� ��� */
    @PostMapping("/add")
    public Review addReview(@RequestBody ReviewDto reviewDto) { //, Principal principal){
        return this.reviewService.createReview(new Review(reviewDto.getStar(), reviewDto.getImgSrc(), reviewDto.getText()), reviewDto.getMemberId(), reviewDto.getProductId());
    }

    /* ��ǰ �ı� ��� ��ȸ */
    @GetMapping("/list/{productId}")
    public ResponseEntity<List<Review>> addReview(@PathVariable int productId){
        return new ResponseEntity<>(this.reviewService.Listreviews(productId),HttpStatus.CREATED);
    }

    /* ��ǰ �ı� ���� */
    @PutMapping("/update/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable int reviewId, @RequestBody ReviewDto reviewDto) {
        return this.reviewService.updateReview(reviewId, new Review(reviewDto.getStar(), reviewDto.getImgSrc(), reviewDto.getText()));
    }

    /* ��ǰ �ı� ���� */
    @DeleteMapping("/delete/{productId}/{reviewId}")
    public ResponseEntity<List<Review>> addReview(@PathVariable int productId,@PathVariable int reviewId) {
        return new ResponseEntity<>(this.reviewService.Deletereview(reviewId, productId),HttpStatus.CREATED);
    }

    @GetMapping("/sentiment/{productId}")
    public ResponseEntity<List<Float>> addSentiment(@PathVariable int productId){
        return new ResponseEntity<>(this.reviewService.ListSentiments(productId),HttpStatus.CREATED);
    }

    @GetMapping("/sentiment")
    public void addSentiment(){
        this.reviewService.createSentiment();
    }
}
