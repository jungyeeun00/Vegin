package com.example.board.service;

import com.example.board.dto.CommentDto;
import com.example.board.model.Board;
import com.example.board.model.Comment;
import com.example.board.model.Member;
import com.example.board.repository.BoardRepository;
import com.example.board.repository.CommentRepository;
import com.example.board.repository.MemberRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CommentService {

    @NonNull
    private BoardRepository boardRepository;
    @NonNull
    private CommentRepository commentRepository;
    @NonNull
    private MemberRepository memberRepository;

    // ´ñ±Û µî·Ï
    public Comment createComment(Comment comment, String memberId, int boardNo) {
        Optional<Board> board = this.boardRepository.findById(boardNo);
        Optional<Member> member = this.memberRepository.findById(memberId);
        board.ifPresent(re->{
            comment.changeBoard(re);
        });
        member.ifPresent(re->{
            comment.changeAuthor(re);
        });
        System.out.println(comment);
        return this.commentRepository.save(comment);
    }

    //´ñ±Û ¸®½ºÆ®
    @Transactional(readOnly = true)
    public List<Comment> Listcomments(int boardNo) {
        return this.commentRepository.getCommentsOfBoard(boardNo);
    }
    // ´ñ±Û »èÁ¦
    @Transactional
    public List<Comment> Deletecomment(int commentNo, int boardNo) {
        this.commentRepository.deleteById(commentNo);
        return this.commentRepository.getCommentsOfBoard(boardNo);
    }

    //´ñ±Û ¼öÁ¤
    @Transactional
    public List<Comment> Modifycomment(Comment comment,int commentNo,int boardNo) {
        Optional<Comment> modifycomment=this.commentRepository.findById(commentNo);
        modifycomment.ifPresent(origin->{
            origin.setContent(comment.getContent());
            this.commentRepository.save(origin);
        });
        return this.commentRepository.getCommentsOfBoard(boardNo);
    }
}
