package com.example.board.repository;

import com.example.board.model.Comment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment,Integer> {

    /* 자유게시판 댓글 목록 */
    @Query("SELECT c from Comment c where c.board.no=:boardNo and c.id>0 order by c.id ASC")
    public List<Comment> getCommentsOfBoard(@Param("boardNo") Integer boardNo);


}
