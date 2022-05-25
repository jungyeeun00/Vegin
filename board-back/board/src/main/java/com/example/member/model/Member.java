package com.example.member.model;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.*;


@Getter // get 함수를 일괄적으로 만들어줍니다.
@Setter
@NoArgsConstructor(access= AccessLevel.PROTECTED) // 기본 생성자를 만들어줍니다.
@Entity // DB 테이블 역할을 합니다.
@Table(name = "member")
@DynamicInsert
@DynamicUpdate
public class Member {

    @Id
    @NotBlank(message = "아이디를 입력하시오.")
    @Size(min = 6, max = 12, message = "아이디는 6자 이상 12자 이하로 입력하시오.")
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    //@NotBlank(message = "비밀번호를 입력하시오.")
    //@Size(min = 8, max = 20, message = "비밀번호는 영문 대문자, 소문자, 숫자, 특수문자 중 3종류 이상의 문자 조합으로 구성하여 8-20자로 입력하시오.")
    @Column(name = "password")
    private String password;

    @NotBlank(message = "이름을 입력하시오.")
    @Size(min = 2, max = 16, message = "올바른 이름을 입력하시오.")
    @Column(name = "name")
    private String name;

    @NotBlank(message = "전화번호를 입력하시요.")
    @Pattern(regexp = "(01[016789])-(\\d{3,4})-(\\d{4})", message = "올바른 휴대폰 번호를 입력해주세요.('-'로 구분)")
    @Column(name = "phone")
    private String phone;

    @Size(max = 128, message = "올바른 주소를 입력하시오.")
    @Column(name = "address")
    private String address;

    @Email(message = "올바른 이메일 주소를 입력하시오.")
    @Column(name = "email")
    private String email;

    @Builder
    public Member(String id, String password, String name, String phone, String address, String email) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.email = email;
    }

    public String getUsername() {
        return id;
    }
}
