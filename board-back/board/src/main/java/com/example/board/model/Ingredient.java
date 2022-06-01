package com.example.board.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "ingredient")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="recipe_id")
    private Integer recipeId;

    @Column(name = "quantity")
    private String quantity;

    @Column(name = "category")
    private String category;

    @Column(name = "name")
    private String name;

}
