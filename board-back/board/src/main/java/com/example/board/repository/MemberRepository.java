package com.example.board.repository;

import com.example.board.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    /* È¸¿ø */
    @Query("select m from Member m where m.id = :id")
    Optional<Member> findById(@Param("id") String id);
}
