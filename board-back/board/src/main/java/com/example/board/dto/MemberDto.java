package com.example.board.dto;

import com.example.board.model.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;
import java.util.Date;

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

    @Nullable
    private String address = null;

    @NotBlank
    private String email = null;

    @Nullable
    private String birthday = null;

    private Date createdDate;

    public Member toEntity() {
        return Member.builder()
                .id(id)
                .password(password)
                .name(name)
                .phone(phone)
                .address(address)
                .email(email)
                .birthday(birthday)
                .createdDate(createdDate)
                .build();
    }

    @Builder
    public MemberDto(String id, String password, String name, String phone, String address, String email, String birthday, Date createdDate) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.email = email;
        this.birthday = birthday;
        this.createdDate = createdDate;
    }
}