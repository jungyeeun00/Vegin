package com.example.board.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Sentiments {
    @Id
    @Column(name = "review_id", nullable = false)
    private Integer reviewId;

    @Column(name = "sentiment")
    private String sentiment;

    @Column(name = "percent")
    private Float percent;

//    @OneToOne(fetch = FetchType.EAGER)
//    @MapsId //@MapsId 는 @id로 지정한 컬럼에 @OneToOne 이나 @ManyToOne 관계를 매핑시키는 역할
//    @JoinColumn(name = "review_id")
//    private Review review;

    private Sentiments() {
    }

    public Sentiments(Integer reviewId, String sentiment, Float percent) {
        this.reviewId = reviewId;
        this.sentiment = sentiment;
        this.percent = percent;
    }
}
