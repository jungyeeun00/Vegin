package com.example.board.controller;

import com.example.board.dto.ProductDto;
import com.example.board.model.Likes;
import com.example.board.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("")
public class LikeController {
    @Autowired
    private LikeService likeService;

    // like
    @GetMapping("/shop-page")
    public Likes createLike(@RequestParam(value = "memberId", required = true) String memberId,
                            @RequestParam(value = "productId", required = true) Integer productId) {

        return likeService.createLike(memberId, productId);
    }

    @DeleteMapping("/shop-page")
    public ResponseEntity<Map<String, Boolean>> deleteLike(
            @RequestParam(value = "memberId", required = true) String memberId,
            @RequestParam(value = "productId", required = true) Integer productId) {
        return likeService.deleteLike(memberId, productId);
    }

    @GetMapping("/shop-page/{category}")
    public ResponseEntity<List<Integer>> getLikeId(@PathVariable String category,
                                                   @RequestParam(value = "memberId", required = true) String memberId) {

        return likeService.getLikeId(memberId);
    }

    @GetMapping("/likes")
    public ResponseEntity<List<ProductDto>> getLike(@RequestParam(value = "memberId", required = true) String memberId) {

        return likeService.getLike(memberId);
    }
}

