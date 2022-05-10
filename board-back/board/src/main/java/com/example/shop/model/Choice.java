package com.example.shop.model;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "choice")
public class Choice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer choiceId;

    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "content")
    private String content;

    @Column(name = "extra_cost")
    private Integer extraCost;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "product_id")
//    private Product product;
}
