package com.example.board.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "likes")
@IdClass(LikeId.class)
public class Likes {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productId")
    private Integer productId;

    @Id
    @Column(name = "memberId")
    private String memberId;



    public Likes(String memberId, Integer productId) {
        this.memberId = memberId;
        this.productId = productId;
    }

    public Likes() {

    }

}
