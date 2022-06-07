package com.example.board.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Setter
@Getter
public class InquiryDto {
    @NotBlank
    private String title;

    @NotBlank
    private String text;

    private String answer;

    private String answerMemberId;

    @NotBlank
    private String memberId;

    @NotBlank
    private Integer productId;
}
