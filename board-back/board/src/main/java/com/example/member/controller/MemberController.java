package com.example.member.controller;

import com.example.member.dto.MemberDto;
import com.example.member.model.Member;
import com.example.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping("")
    public ModelAndView index() throws IOException {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/home/index");
        return modelAndView;
    }

    // 로그인 페이지
//    @PostMapping("/login")
//    public UserDetails login(@RequestBody Member member) throws IOException {
//        return memberService.loadUserByUsername(member.getId());
//    }

    @GetMapping("/login")
    public ModelAndView loginForm() throws IOException {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("member/loginForm");
        return modelAndView;
    }
//    @GetMapping("/login")
//    public ResponseEntity<?> login() throws IOException {
//        ModelAndView modelAndView = new ModelAndView();
//        modelAndView.setViewName("member/login-page");
//        return modelAndView;
//    }

    // 회원 가입 페이지
    @GetMapping("/signup")
    public ModelAndView signupForm() throws IOException {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("member/signupForm");
        modelAndView.addObject("member", new MemberDto());
        return modelAndView;
    }

    @PostMapping("/signup")
    public ModelAndView signup(MemberDto memberDto) throws IOException {
        memberService.signUp(memberDto);
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("redirect:/member/");
        return modelAndView;
    }

    @GetMapping("/list")
    public ResponseEntity<Map> getAllMembers(@RequestParam(value = "p_num", required = false) Integer p_num) {
        if (p_num == null || p_num <= 0) p_num = 1;

        return memberService.getPagingMember(p_num);
    }

    @PostMapping("/list")
    public Member createMember(@RequestBody Member member) {
        System.out.println("@PostMapping(\"/member\")");
        System.out.println(member.toString());
        return memberService.createMember(member);
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable String id) {
        return memberService.getMember(id);
    }

    @PutMapping("/list/{id}")
    public ResponseEntity<Member> updateMemberById(
            @PathVariable String id, @RequestBody Member member) {
        return memberService.updateMember(id, member);
    }

    @DeleteMapping("/list/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteMemberById(
            @PathVariable String id) {
        return memberService.deleteMember(id);
    }
}
