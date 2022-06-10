package com.example.board.service;

import com.example.board.util.PagingUtil;
import com.example.board.dto.MemberDto;
import com.example.board.exception.ResourceNotFoundException;
import com.example.board.model.Member;
import com.example.board.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.*;

@Service
public class MemberService implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    /* 회원가입 */
    @Transactional
    public String signUp(MemberDto memberDto) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        memberDto.setPassword(passwordEncoder.encode(memberDto.getPassword()));

        /* password 암호화 후 DB에 저장 */
        return memberRepository.save(memberDto.toEntity()).getId();
    }

    /* 로그인 시 회원 정보 조회 */
    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Optional<Member> memberWrapper = memberRepository.findById(id);
        Member member = memberWrapper.get();
        System.out.println(member.getName() + "-----------------");

        List<GrantedAuthority> authorities = new ArrayList<>();

        if("admin".equals(id)){
            authorities.add(new SimpleGrantedAuthority(MemberRole.ADMIN.getValue()));
        } else {
            authorities.add(new SimpleGrantedAuthority(MemberRole.USER.getValue()));
        }

        /* 아이디, 비밀번호, 권한리스트를 매개변수로 User 생성하여 반환 */
        return new User(member.getId(), member.getPassword(), authorities);
    }

    public ResponseEntity<Member> getMember(String id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Not exist Board Data by no : ["+id+"]"));
        return ResponseEntity.ok(member);
    }

}