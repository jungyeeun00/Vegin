package com.example.board.service;

import com.example.board.exception.ResourceNotFoundException;
import com.example.board.model.CommentDiary;
import com.example.board.model.Diary;
import com.example.board.model.Member;
import com.example.board.repository.CommentDiaryRepository;
import com.example.board.repository.DiaryRepository;
import com.example.board.repository.MemberRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CommentDiaryService {

    @NonNull
    private DiaryRepository boardRepository;
    @NonNull
    private CommentDiaryRepository commentRepository;
    @NonNull
    private MemberRepository memberRepository;

    // ��� ���
    public CommentDiary createComment(CommentDiary comment, String memberId, int boardNo) {
        Optional<Diary> board = this.boardRepository.findById(boardNo);
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

    // ��� ����
    public ResponseEntity<CommentDiary> updateComment(Integer id, CommentDiary updatedComment) {
        CommentDiary comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Comment Data by id : [" + id + "]"));
        comment.setContent(updatedComment.getContent());
        comment.setLast_modified_date((new Timestamp(System.currentTimeMillis())).toString());

        CommentDiary endUpdatedComment = commentRepository.save(comment);
        return ResponseEntity.ok(endUpdatedComment);
    }

    //��� ����Ʈ
    @Transactional(readOnly = true)
    public List<CommentDiary> Listcomments(int boardNo) {
        return this.commentRepository.getCommentsOfBoard(boardNo);
    }

    // ��� ����
    @Transactional
    public List<CommentDiary> Deletecomment(int commentNo, int boardNo) {
        this.commentRepository.deleteById(commentNo);
        return this.commentRepository.getCommentsOfBoard(boardNo);
    }

}
