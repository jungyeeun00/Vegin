package com.example.board.model;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name="review")
@EqualsAndHashCode(of="review_id")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED) // @lombock 어노테이션 : 파라미터를 받지 않는 생성자를 만들어준다.
@AllArgsConstructor //  @lombock 어노테이션 : 모든 속성에 대해서 생성자를 만들어 낸다.
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Integer id;

    @Column(name = "img_src")
    private String img_src;

    @NonNull
    @Column(name = "text")
    private String text;

    @Column(name = "del_yn")
    @ColumnDefault(value = "false")
    private Boolean deleted;

    @Column(name="created_date")
    private String created_date;

    @Column(name="last_modified_date")
    private String last_modified_date;

    @ManyToOne
    @JoinColumn(name="product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name="member_id")
    private Member member;

    public Review(String img_src, String text) {
        this.img_src = img_src;
        this.text = text;
        this.deleted = this.deleted == null ? false : this.deleted;
        this.created_date = this.created_date == null ? (new Timestamp(System.currentTimeMillis())).toString() : this.created_date;
    }

    // Member 엔티티와  Board 엔티티를 연결하는 함수
    public void changeAuthor(Member author) { this.member = author; }
    public void changeProduct(Product product) {
        this.product = product;
    }
}
