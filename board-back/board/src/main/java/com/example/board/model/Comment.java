package com.example.board.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name="comment")
@EqualsAndHashCode(of="comment_no")
@Getter
@Setter
@ToString
//@ToString(exclude = "board")
@NoArgsConstructor(access = AccessLevel.PROTECTED) // @lombock 어노테이션 : 파라미터를 받지 않는 생성자를 만들어준다.
@AllArgsConstructor //  @lombock 어노테이션 : 모든 속성에 대해서 생성자를 만들어 낸다.
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_no")
    private Integer id;

    @NonNull
    @Column(name = "content")
    private String content;

    @Column(name = "del_yn")
    @ColumnDefault(value = "false")
    private Boolean deleted;

    @Column(name="created_date")
    private String created_date;

    @JsonIgnore
    @ManyToOne//(fetch=FetchType.LAZY)
    @JoinColumn(name="board_no")
    private Board board;

    @ManyToOne
    @JoinColumn(name="member_id")
    private Member member;

    public Comment(String content) {
        this.content = content;
        this.deleted = this.deleted == null ? false : this.deleted;
        this.created_date = this.created_date == null ? (new Timestamp(System.currentTimeMillis())).toString() : this.created_date;
    }

    // Member 엔티티와  Board 엔티티를 연결하는 함수
    public void changeAuthor(Member author) { this.member = author; }
    public void changeBoard(Board board) {
        this.board = board;
    }
}
