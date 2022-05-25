package com.example.board.model;

import lombok.Data;

import javax.persistence.*;

@Entity
//@Table(name = "place_info")
@Data
public class PlaceInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String UPSO_NM;         //업소명
    private String COB_CODE_NM;     //업종명
    private String CRTFC_GBN_NM;    //식품인증구분명
    private String RDN_CODE_NM;     //도로명주소
    private String TEL_NO;          //전화번호
    private String FOOD_MENU;       //업소인증메뉴
    private String X_CNTS;          //지도 X좌표
    private String Y_DNTS;          //지도 Y좌표
    private String IMAGE;           //이미지 url

    private PlaceInfo() {
    }

    public PlaceInfo(Long id, String UPSO_NM, String COB_CODE_NM, String CRTFC_GBN_NM, String RDN_CODE_NM, String TEL_NO, String FOOD_MENU, String X_CNTS, String Y_DNTS, String IMAGE) {
        this.id = id;
        this.UPSO_NM = UPSO_NM;
        this.COB_CODE_NM = COB_CODE_NM;
        this.CRTFC_GBN_NM = CRTFC_GBN_NM;
        this.RDN_CODE_NM = RDN_CODE_NM;
        this.TEL_NO = TEL_NO;
        this.FOOD_MENU = FOOD_MENU;
        this.X_CNTS = X_CNTS;
        this.Y_DNTS = Y_DNTS;
        this.IMAGE = IMAGE;
    }
}