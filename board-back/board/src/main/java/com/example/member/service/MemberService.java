package com.example.member.service;

import com.example.member.exception.ResourceNotFoundException;
import com.example.board.util.PagingUtil;
import com.example.member.model.Member;
import com.example.member.dto.MemberDto;
import com.example.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class MemberService implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    // 회원가입
    @Transactional
    public String signUp(MemberDto memberDto) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        memberDto.setPassword(passwordEncoder.encode(memberDto.getPassword()));

        // password를 암호화 한 뒤 db에 저장

        return memberRepository.save(memberDto.toEntity()).getId();
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        // 로그인을 하기 위해 가입된 user정보를 조회하는 메서드
        Optional<Member> memberWrapper = memberRepository.findById(id);
        Member member = memberWrapper.get();

        List<GrantedAuthority> authorities = new ArrayList<>();

        if("admin".equals(id)){
            authorities.add(new SimpleGrantedAuthority(MemberRole.ADMIN.getValue()));
        } else {
            authorities.add(new SimpleGrantedAuthority(MemberRole.USER.getValue()));
        }

        // 아이디, 비밀번호, 권한리스트를 매개변수로 User를 만들어 반환해준다.
        return new User(member.getId(), member.getPassword(), authorities);
    }

    public int findAllCount(){
        return (int)memberRepository.count();
    }

    public ResponseEntity<Map> getPagingMember(Integer p_num) {
        Map result = null;

        PagingUtil pu = new PagingUtil(p_num, 5, 5);
        List<Member> list = memberRepository.findFromTo(pu.getObjectStartNum(), pu.getObjectCountPerPage());
        pu.setObjectCountTotal(findAllCount());
        pu.setCalcForPaging();

        System.out.println("p_num : " + p_num);
        System.out.println(pu.toString());

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

//    public List<Board> getAllBoard() {
//        return boardRepository.findAll();
//    }

    public Member createMember(Member member) {
        return memberRepository.save(member);
    }

    public ResponseEntity<Member> getMember(String id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Not exist Board Data by no : ["+id+"]"));
        return ResponseEntity.ok(member);
    }

    public ResponseEntity<Member> updateMember(String id, Member updatedMember) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : [" + id + "]"));
        member.setPassword(updatedMember.getPassword());
        member.setName(updatedMember.getName());
        member.setPhone(updatedMember.getPhone());

        Member endUpdatedMember = memberRepository.save(member);
        return ResponseEntity.ok(endUpdatedMember);
    }

    public ResponseEntity<Map<String, Boolean>> deleteMember(String id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : [" + id + "]"));

        memberRepository.delete(member);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted Board Data by id : [" + id + "]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}