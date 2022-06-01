package com.example.board.service;

import com.example.board.exception.ResourceNotFoundException;
import com.example.board.model.Likes;
import com.example.board.model.LikeId;
import com.example.board.model.Product;
import com.example.board.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    public Likes createLike(String memberId, Integer productId) {
        Likes likes = new Likes(memberId, productId);
        return likeRepository.save(likes);
    }

    public ResponseEntity<List<Product>> getLike(String memberId) {
        List<Product> product = likeRepository.findByMember(memberId);
        return ResponseEntity.ok(product);
    }

    public ResponseEntity<List<Integer>> getLikeId(String memberId) {
        List<Integer> idList = likeRepository.findLikeId(memberId);
        return ResponseEntity.ok(idList);
    }

    public ResponseEntity<Map<String, Boolean>> deleteLike(String memberId, Integer productId) {
        Likes likes = likeRepository.findById(new LikeId(memberId, productId))
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Like Data by : [" + memberId + "]"));

        likeRepository.delete(likes);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Canceled Like by id : [" + memberId  + ", " + productId + "]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
