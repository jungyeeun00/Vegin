package com.example.board.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "recipe")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "servings")
    private String servings;

    @Column(name = "time")
    private String time;

    @Column(name = "difficulty")
    private String difficulty;

    @Column(name = "category")
    private String category;

    @Column(name = "views")
    private Integer views;

    @Column(name = "img")
    private String img;

}