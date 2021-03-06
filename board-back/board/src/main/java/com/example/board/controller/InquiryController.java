package com.example.board.controller;

import com.example.board.dto.InquiryDto;
import com.example.board.model.Inquiry;
import com.example.board.repository.MemberRepository;
import com.example.board.service.InquiryService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/inquiry")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class InquiryController {

    @NonNull
    MemberRepository memberRepository;
    @NonNull
    InquiryService inquiryService;

    /* 상품 문의 등록 */
    @PostMapping("/add")
    public Inquiry addInquiry(@RequestBody InquiryDto inquiryDto) {
        return this.inquiryService.createInquiry(new Inquiry(inquiryDto.getTitle(), inquiryDto.getText(), inquiryDto.getAnswer()), inquiryDto.getProductId(), inquiryDto.getMemberId(), inquiryDto.getAnswerMemberId());
    }

    /* 상품 문의 목록 조회 */
    @GetMapping("/list/{productId}")
    public ResponseEntity<List<Inquiry>> addInquiry(@PathVariable int productId){
        return new ResponseEntity<>(this.inquiryService.Listinquirys(productId), HttpStatus.CREATED);
    }

    /* 상품 문의 수정 */
    @PutMapping("/update/{inquiryId}")
    public ResponseEntity<Inquiry> updateInquiry(@PathVariable int inquiryId, @RequestBody InquiryDto inquiryDto) {
        return this.inquiryService.updateInquiry(inquiryId, new Inquiry(inquiryDto.getTitle(), inquiryDto.getText(), inquiryDto.getAnswer()), inquiryDto.getAnswerMemberId());
    }

    /* 상품 문의 삭제 */
    @DeleteMapping("/delete/{productId}/{inquiryId}")
    public ResponseEntity<List<Inquiry>> addInquiry(@PathVariable int productId,@PathVariable int inquiryId) {
        return new ResponseEntity<>(this.inquiryService.Deleteinquiry(inquiryId, productId),HttpStatus.CREATED);
    }

}
