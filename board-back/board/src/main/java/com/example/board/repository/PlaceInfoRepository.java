package com.example.board.repository;

import com.example.board.model.PlaceInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PlaceInfoRepository extends JpaRepository<PlaceInfo,Long> {
    /* 플레이스 모든 정보 조회 */
    String SELECT_COUNT_UPSONM = ""
            + "select count(*) from PlaceInfo where UPSO_NM=:s";

    @Query(value = SELECT_COUNT_UPSONM)
    Long countUPSONM(@Param("s") String search);
}