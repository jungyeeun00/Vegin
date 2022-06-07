package com.example.board.model;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name="inquiry")
@EqualsAndHashCode(of="inquiry_id")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED) // @lombock ������̼� : �Ķ���͸� ���� �ʴ� �����ڸ� ������ش�.
@AllArgsConstructor //  @lombock ������̼� : ��� �Ӽ��� ���ؼ� �����ڸ� ����� ����.
public class Inquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inquiry_id")
    private Integer id;

    @NonNull
    @Column(name = "title")
    private String title;

    @NonNull
    @Column(name = "text")
    private String text;

    @Column(name = "answer")
    private String answer;

    @ManyToOne
    @JoinColumn(name = "answer_member_id")
    private Member answerMember;

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

    public Inquiry(String title, String text, String answer) {
        this.title = title;
        this.text = text;
        this.answer = answer;
        this.deleted = this.deleted == null ? false : this.deleted;
        this.created_date = this.created_date == null ? (new Timestamp(System.currentTimeMillis())).toString() : this.created_date;
    }

    // Member ��ƼƼ��  Board ��ƼƼ�� �����ϴ� �Լ�
    public void changeAuthor(Member author) { this.member = author; }
    public void changeAnswerAuthor(Member answerAuthor) { this.answerMember = answerAuthor; }
    public void changeProduct(Product product) {
        this.product = product;
    }
}
