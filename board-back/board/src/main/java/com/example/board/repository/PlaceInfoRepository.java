package com.example.board.repository;

import com.example.board.model.PlaceInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceInfoRepository extends JpaRepository<PlaceInfo,Long> {
}