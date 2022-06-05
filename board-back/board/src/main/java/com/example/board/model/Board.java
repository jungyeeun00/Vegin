package com.example.board.model;


import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "board")
@DynamicInsert
@DynamicUpdate
@Getter
@Setter
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer no;

    @Column(name = "title")
    private String title;

    @Column(name = "contents")
    private String contents;

    @Column(name = "memberId")
    private String memberId;

    @Column(name = "createdTime")
    private Date createdTime;

    @Column(name = "updatedTime")
    private Date updatedTime;

    @Column(name = "counts")
    private Integer counts;

    @JsonIgnore
    @OneToMany(mappedBy = "board")
    private List<Comment> comments = new ArrayList<>();

    @PrePersist
    public void prePersist(){
        this.createdTime = this.createdTime == null ? new Timestamp(System.currentTimeMillis()) : this.createdTime;
    }

    public String getCreatedTime() {
        SimpleDateFormat date = new SimpleDateFormat("yyyy.MM.dd");

        return date.format(createdTime);
    }
}