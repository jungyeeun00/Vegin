package com.example.board.model;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
//@Table(name="review")
@EqualsAndHashCode(of="review_id")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED) // @lombock ������̼� : �Ķ���͸� ���� �ʴ� �����ڸ� ������ش�.
@AllArgsConstructor //  @lombock ������̼� : ��� �Ӽ��� ���ؼ� �����ڸ� ����� ����.
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Integer id;

    @NonNull
    @Column(name = "star")
    private Float star;

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

    public Review(Float star, String img_src, String text) {
        this.star = star;
        this.img_src = img_src;
        this.text = text;
        this.deleted = this.deleted == null ? false : this.deleted;
        this.created_date = this.created_date == null ? (new Timestamp(System.currentTimeMillis())).toString() : this.created_date;
    }

    // Member ��ƼƼ��  Board ��ƼƼ�� �����ϴ� �Լ�
    public void changeAuthor(Member author) { this.member = author; }
    public void changeProduct(Product product) {
        this.product = product;
    }
}
