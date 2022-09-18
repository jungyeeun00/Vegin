package com.example.board.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
//@Table(name="comment_diary")
@EqualsAndHashCode(of="comment_no")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED) // @lombock ¾î³ëÅ×ÀÌ¼Ç : ÆÄ¶ó¹ÌÅÍ¸¦ ¹ÞÁö ¾Ê´Â »ý¼ºÀÚ¸¦ ¸¸µé¾îÁØ´Ù.
@AllArgsConstructor //  @lombock ¾î³ëÅ×ÀÌ¼Ç : ¸ðµç ¼Ó¼º¿¡ ´ëÇØ¼­ »ý¼ºÀÚ¸¦ ¸¸µé¾î ³½´Ù.
public class CommentDiary {

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

    @Column(name="last_modified_date")
    private String last_modified_date;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="board_no")
    private Diary board;

    @ManyToOne
    @JoinColumn(name="member_id")
    private Member member;

    public CommentDiary(String content) {
        this.content = content;
        this.deleted = this.deleted == null ? false : this.deleted;
        this.created_date = this.created_date == null ? (new Timestamp(System.currentTimeMillis())).toString() : this.created_date;
    }

    // Member ¿£Æ¼Æ¼¿Í  Board ¿£Æ¼Æ¼¸¦ ¿¬°áÇÏ´Â ÇÔ¼ö
    public void changeAuthor(Member author) { this.member = author; }
    public void changeBoard(Diary board) {
        this.board = board;
    }
}
