package com.example.board.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Setter
@Getter
public class CommentDiaryDto {
    @NotBlank
    private String content;

    @NotBlank
    private String memberId;

    @NotBlank
    private Integer boardNo;
}
