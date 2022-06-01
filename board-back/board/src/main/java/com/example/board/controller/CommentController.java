package com.example.board.controller;

import com.example.board.dto.CommentDto;
import com.example.board.model.Comment;
import com.example.board.repository.MemberRepository;
import com.example.board.service.CommentService;
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
@RequestMapping("/comment")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CommentController {

    @NonNull
    MemberRepository memberRepository;
    @NonNull
    CommentService commentService;

    // CREATE
    @PostMapping("/add")
    public Comment addComment(@RequestBody CommentDto commentDto) { //, Principal principal){
         return this.commentService.createComment(new Comment(commentDto.getContent()), commentDto.getMemberId(), commentDto.getBoardNo());
    }

    // READ
    @GetMapping("/list/{boardNo}")
    public ResponseEntity<List<Comment>> addComment(@PathVariable int boardNo){
        return new ResponseEntity<>(this.commentService.Listcomments(boardNo),HttpStatus.CREATED);
    }

    // UPDATE
    @PutMapping("/update/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable int commentId, @RequestBody CommentDto commentDto) { //, Principal principal){
        return this.commentService.updateBoard(commentId, new Comment(commentDto.getContent()));
    }

    //DELETE
    @DeleteMapping("/delete/{boardNo}/{commentNo}")
    public ResponseEntity<List<Comment>> addComment(@PathVariable int boardNo,@PathVariable int commentNo) {
        return new ResponseEntity<>(this.commentService.Deletecomment(commentNo, boardNo),HttpStatus.CREATED);
    }

    //UPDATE
    @PutMapping("/modify/{boardNo}/{commentNo}")
    public ResponseEntity<List<Comment>> modifyComment(@PathVariable int boardNo,@PathVariable int commentNo,@RequestBody CommentDto commentDto,Principal principal) {
        return new ResponseEntity<>(this.commentService.Modifycomment(new Comment(commentDto.getContent()),commentNo, boardNo),HttpStatus.CREATED);
    }

}
