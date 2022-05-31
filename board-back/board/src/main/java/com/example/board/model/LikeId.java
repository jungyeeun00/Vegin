package com.example.board.model;

import java.io.Serializable;

public class LikeId implements Serializable {
    private String memberId;
    private Integer productId;

    public LikeId(String memberId, Integer productId) {
        this.memberId = memberId;
        this.productId = productId;
    }
}
