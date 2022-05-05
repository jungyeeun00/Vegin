package com.example.recipe.model;

import java.io.Serializable;

public class StepId implements Serializable {
//    private Recipe recipe; //Step.recipe 연결
    private Integer recipeId;
    private Integer no; //Step.no 연결
}
