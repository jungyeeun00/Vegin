package com.example.board.repository;

import com.example.board.model.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Integer> {
    public final static String SELECT_BOARD_LIST_PAGED = ""
            + "SELECT "
            + "no,"
            + "title,"
            + "contents,"
            + "member_id,"
            + "created_time,"
            + "updated_time,"
            + "counts"
            + " FROM diary WHERE 0 < no "
            + "ORDER BY no DESC LIMIT ?1, ?2";

    /* 조회수 증가 */
    public String ADD_COUNTS = "UPDATE Diary b SET b.counts = b.counts + 1 WHERE b.no=:no";

    /* 조회수 높은 글 4개 조회 */
    public String SELECT_BEST_DIARY = "SELECT * FROM Diary ORDER BY counts DESC, created_time ASC LIMIT 4";

    /* 검색 */
    public String SELECT_SEARCH_DIARY = "SELECT * FROM Diary " +
            "WHERE title LIKE %:search% ORDER BY no DESC " +
            "LIMIT :objectStartNum, :objectCountPerPage";
    public String SELECT_SEARCH_COUNT = "SELECT count(*) FROM Diary WHERE title LIKE %:search%";

    @Query(value = SELECT_BOARD_LIST_PAGED, nativeQuery = true)
    List<Diary> findFromTo(final Integer objectStartNum, final Integer objectCountPerPage);

    @Modifying
    @Query(value = ADD_COUNTS, nativeQuery = true)
    Integer addCounts(final Integer no);

    @Query(value = SELECT_BEST_DIARY, nativeQuery = true)
    List<Diary> findTopByCounts();


    @Query(value = SELECT_SEARCH_DIARY, nativeQuery = true)
    List<Diary> findBoardByTitle(final String search, final Integer objectStartNum, final Integer objectCountPerPage);
    @Query(value = SELECT_SEARCH_COUNT, nativeQuery = true)
    Long countBoardsByTitleContains(@Param("search") String search);
}
