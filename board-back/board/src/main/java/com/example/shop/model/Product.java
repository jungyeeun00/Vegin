package com.example.shop.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Table(name = "product")

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "reg_price")
    private Integer regPrice;

    @Column(name = "sold_price")
    private Integer soldPrice;

    @Column(name = "sale_rate")
    private Integer saleRate;

    @Column(name = "category")
    private String category;

    @Column(name = "img_src")
    private String imgSrc;

    @Column(name = "detail")
    private String detail;

//    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
//    private List<Choice> choice = new ArrayList<>();
}
