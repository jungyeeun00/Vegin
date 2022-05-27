package com.example.board.repository;

import com.example.board.model.PlaceInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PlaceInfoRepository extends JpaRepository<PlaceInfo,Long> {
    String SELECT_COUNT_UPSONM = ""
            + "select count(*) from PlaceInfo where UPSO_NM=:s";

    @Query(value = SELECT_COUNT_UPSONM)
    Long countUPSONM(@Param("s") String search);
}