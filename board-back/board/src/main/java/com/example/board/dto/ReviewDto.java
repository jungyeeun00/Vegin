package com.example.board.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Setter
@Getter
public class ReviewDto {

    @NotBlank
    private Integer star;

    private String imgSrc;

    @NotBlank
    private String text;

    @NotBlank
    private String memberId;

    @NotBlank
    private Integer productId;
}
