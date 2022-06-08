package com.example.board.controller;

import com.example.board.dto.MemberDto;
import com.example.board.model.Member;
import com.example.board.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    /* 현재 로그인한 회원 조회 */
    @GetMapping("/login/{id}")
    public ResponseEntity<Member> getUserById(@PathVariable String id) {
        return memberService.getMember(id);
    }

    /* 회원가입 */
    @PostMapping("/signup")
    public String signup(@RequestBody MemberDto memberDto) throws IOException {
        return memberService.signUp(memberDto);
    }
}
