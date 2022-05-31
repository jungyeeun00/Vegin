package com.example.board.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "like")
@IdClass(LikeId.class)
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Integer productId;

    @Id
    @Column(name = "member_id")
    private String memberId;

}
