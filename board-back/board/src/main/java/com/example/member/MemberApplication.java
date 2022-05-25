package com.example.member;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class MemberApplication {

    public static void main(String[] args) {
        SpringApplication.run(com.example.member.MemberApplication.class, args);
    }

    @RequestMapping("/")
    public String home(){
        return "member";
    }

}