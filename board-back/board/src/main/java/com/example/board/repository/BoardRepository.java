package com.example.board.repository;

import com.example.board.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    public final static String SELECT_BOARD_LIST_PAGED = ""
            + "SELECT "
            + "no,"
            + "title,"
            + "contents,"
            + "member_id,"
            + "created_time,"
            + "updated_time,"
            + "counts"
            + " FROM board WHERE 0 < no "
            + "ORDER BY no DESC LIMIT ?1, ?2";

    public String ADD_COUNTS = "UPDATE Board b SET b.counts = b.counts + 1 WHERE b.no=:no";

    public String SELECT_BEST_BOARD = "SELECT * FROM Board ORDER BY counts DESC, created_time ASC LIMIT 4";

    @Query(value = SELECT_BOARD_LIST_PAGED, nativeQuery = true)
    List<Board> findFromTo(final Integer objectStartNum, final Integer objectCountPerPage);

    @Modifying
    @Query(value = ADD_COUNTS, nativeQuery = true)
    Integer addCounts(final Integer no);

    @Query(value = SELECT_BEST_BOARD, nativeQuery = true)
    List<Board> findTopByCounts();
}
