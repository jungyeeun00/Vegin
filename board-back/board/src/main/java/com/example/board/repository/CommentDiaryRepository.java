package com.example.board.repository;

import com.example.board.model.CommentDiary;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentDiaryRepository extends CrudRepository<CommentDiary,Integer> {

    /* 다이어리 댓글 목록 */
    @Query("SELECT c from CommentDiary c where c.board.no=:boardNo and c.id>0 order by c.id ASC")
    public List<CommentDiary> getCommentsOfBoard(@Param("boardNo") Integer boardNo);


}
