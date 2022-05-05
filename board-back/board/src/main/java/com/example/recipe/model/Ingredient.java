package com.example.recipe.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "ingredient")
@ToString(exclude = "recipe")
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

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "recipe_id")
//    private Recipe recipe;

}
