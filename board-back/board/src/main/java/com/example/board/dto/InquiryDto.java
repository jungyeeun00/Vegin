package com.example.board.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Setter
@Getter
public class InquiryDto {
    @NotBlank
    private String text;

    private String answer;

    @NotBlank
    private Integer productId;
}
