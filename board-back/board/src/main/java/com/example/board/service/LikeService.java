package com.example.board.service;

import com.example.board.dto.ProductDto;
import com.example.board.exception.ResourceNotFoundException;
import com.example.board.model.Likes;
import com.example.board.model.LikeId;
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

    /* 찜한 상품 likes 테이블에 추가 */
    public Likes createLike(String memberId, Integer productId) {
        Likes likes = new Likes(memberId, productId);
        return likeRepository.save(likes);
    }

    /* 찜한 상품(my page에서 찜한 목록 나타내기 위함) */
    public ResponseEntity<List<ProductDto>> getLike(String memberId) {
        List<ProductDto> product = likeRepository.findByMemberId(memberId);

        return ResponseEntity.ok(product);
    }

    /* 찜한 상품 아이디(shop page에서 채워진 하트 나타내기 위함) */
    public ResponseEntity<List<Integer>> getLikeId(String memberId) {
        List<Integer> idList = likeRepository.findLikeId(memberId);
        return ResponseEntity.ok(idList);
    }

    /* 찜 취소한 상품 likes 테이블에서 삭제 */
    public ResponseEntity<Map<String, Boolean>> deleteLike(String memberId, Integer productId) {
        Likes likes = likeRepository.findById(new LikeId(memberId, productId))
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Like Data by : [" + memberId + "]"));

        likeRepository.delete(likes);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Canceled Like by id : [" + memberId  + ", " + productId + "]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
