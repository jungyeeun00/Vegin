package com.example.board.controller;

import com.example.board.dto.CommentDiaryDto;
import com.example.board.model.CommentDiary;
import com.example.board.repository.MemberRepository;
import com.example.board.service.CommentDiaryService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/comment-diary")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CommentDiaryController {

    @NonNull
    MemberRepository memberRepository;
    @NonNull
    CommentDiaryService commentService;

    // CREATE
    @PostMapping("/add")
    public CommentDiary addComment(@RequestBody CommentDiaryDto commentDto) { //, Principal principal){
         return this.commentService.createComment(new CommentDiary(commentDto.getContent()), commentDto.getMemberId(), commentDto.getBoardNo());
    }

    // READ
    @GetMapping("/list/{boardNo}")
    public ResponseEntity<List<CommentDiary>> addComment(@PathVariable int boardNo){
        return new ResponseEntity<>(this.commentService.Listcomments(boardNo),HttpStatus.CREATED);
    }

    // UPDATE
    @PutMapping("/update/{commentId}")
    public ResponseEntity<CommentDiary> updateComment(@PathVariable int commentId, @RequestBody CommentDiaryDto commentDto) { //, Principal principal){
        return this.commentService.updateBoard(commentId, new CommentDiary(commentDto.getContent()));
    }

    //DELETE
    @DeleteMapping("/delete/{boardNo}/{commentNo}")
    public ResponseEntity<List<CommentDiary>> addComment(@PathVariable int boardNo,@PathVariable int commentNo) {
        return new ResponseEntity<>(this.commentService.Deletecomment(commentNo, boardNo),HttpStatus.CREATED);
    }

    //UPDATE
    @PutMapping("/modify/{boardNo}/{commentNo}")
    public ResponseEntity<List<CommentDiary>> modifyComment(@PathVariable int boardNo, @PathVariable int commentNo, @RequestBody CommentDiaryDto commentDto, Principal principal) {
        return new ResponseEntity<>(this.commentService.Modifycomment(new CommentDiary(commentDto.getContent()),commentNo, boardNo),HttpStatus.CREATED);
    }

}
