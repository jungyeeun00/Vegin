package com.example.board.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import java.io.Serializable;
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@Getter
@Setter
public class LikeId implements Serializable {
    @EqualsAndHashCode.Include
    @Column(name = "memberId")
    private String memberId;
    @EqualsAndHashCode.Include
    @Column(name = "productId")
    private Integer productId;

    public LikeId(String memberId, Integer productId) {
        this.memberId = memberId;
        this.productId = productId;
    }
}
