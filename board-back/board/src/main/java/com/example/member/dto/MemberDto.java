package com.example.member.dto;

import com.example.member.model.Member;
import lombok.*;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class MemberDto {

    @Id
    private String id;

    @NotBlank
    private String password;

    @NotBlank
    private String name;

    @NotBlank
    private String phone;

    private String address = null;

    private String email = null;

    public Member toEntity() {
        return Member.builder()
                .id(id)
                .password(password)
                .name(name)
                .phone(phone)
                .address(address)
                .email(email)
                .build();
    }

    @Builder
    public MemberDto(String id, String password, String name, String phone, String address, String email) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.email = email;
    }
}