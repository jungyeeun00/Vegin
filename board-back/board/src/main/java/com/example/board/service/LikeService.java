package com.example.board.service;

import com.example.board.exception.ResourceNotFoundException;
import com.example.board.model.Board;
import com.example.board.model.Like;
import com.example.board.model.LikeId;
import com.example.board.model.Product;
import com.example.board.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    public Like createLike(String memberId, Integer productId) {
        Like like = new Like();
        like.setMemberId(memberId);
        like.setProductId(productId);
        return likeRepository.save(like);
    }

    public ResponseEntity<List<Product>> getLike(String memberId) {
        List<Product> product = likeRepository.findByMember(memberId);
        return ResponseEntity.ok(product);
    }

    public ResponseEntity<Map<String, Boolean>> deleteLike(String memberId, Integer productId) {
        Like like = likeRepository.findById(new LikeId(memberId, productId))
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Like Data by : [" + memberId + "]"));

        likeRepository.delete(like);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Canceled Like by id : [" + memberId  + ", " + productId + "]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
