package com.example.member.repository;

import com.example.member.model.Member;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    public final static String SELECT_MEMBER_LIST_PAGED = ""
            + "SELECT "
            + "id,"
            + "password,"
            + "name,"
            + "phone,"
            + "address,"
            + "email "
            + "FROM member";

    @Query(value = SELECT_MEMBER_LIST_PAGED, nativeQuery = true)
    List<Member> findFromTo(final Integer objectStartNum, final Integer objectCountPerPage);

    @Query("select m from Member m where m.id = :id")
    Optional<Member> findById(@Param("id") String id);
}
