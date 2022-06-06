package com.example.board.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@IdClass(StepId.class)
@Table(name = "step")
public class Step {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "no")
    private Integer no;

    @Id
    @Column(name = "recipe_id")
    private Integer recipeId;

    @Column(name = "content")
    private String content;

    @Column(name = "img")
    private String img;
}
