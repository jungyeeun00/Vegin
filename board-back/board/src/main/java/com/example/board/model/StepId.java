package com.example.board.model;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class StepId implements Serializable {
    private Integer recipeId;
    private Integer no; //Step.no 연결
}
