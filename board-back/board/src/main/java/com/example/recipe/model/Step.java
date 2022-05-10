package com.example.recipe.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@Entity
@IdClass(StepId.class)
@Table(name = "step")
@ToString(exclude = "recipe")
public class Step {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "no")
    private Integer no;

    @Id
//    @ManyToOne
//    @JoinColumn(name = "recipe_id")
    @Column(name = "recipe_id")
    private Integer recipeId;

    @Column(name = "content")
    private String content;

    @Column(name = "img")
    private String img;
}
