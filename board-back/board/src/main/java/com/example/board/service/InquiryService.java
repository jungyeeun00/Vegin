package com.example.board.service;

import com.example.board.exception.ResourceNotFoundException;
import com.example.board.model.*;
import com.example.board.repository.*;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class InquiryService {
    @NonNull
    private ShopRepository shopRepository;
    @NonNull
    private InquiryRepository inquiryRepository;
    @NonNull
    private MemberRepository memberRepository;

    // ���� ���
    public Inquiry createInquiry(Inquiry inquiry, int productId, String memberId, String answerMemberId) {
        Optional<Product> product = this.shopRepository.findById(productId);
        Optional<Member> member = this.memberRepository.findById(memberId);
        Optional<Member> answerMember = this.memberRepository.findById(answerMemberId);
        product.ifPresent(re->{
            inquiry.changeProduct(re);
        });
        member.ifPresent(re->{
            inquiry.changeAuthor(re);
        });
        answerMember.ifPresent(re->{
            inquiry.changeAnswerAuthor(re);
        });
        System.out.println(inquiry);
        return this.inquiryRepository.save(inquiry);
    }

    // ���� ����
    public ResponseEntity<Inquiry> updateInquiry(Integer id, Inquiry updatedInquiry, String answerMemberId) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Inquiry Data by id : [" + id + "]"));
        Optional<Member> answerMember = this.memberRepository.findById(answerMemberId);
        inquiry.setText(updatedInquiry.getText());
        inquiry.setAnswer(updatedInquiry.getAnswer());
        answerMember.ifPresent(re->{
            inquiry.changeAnswerAuthor(re);
        });
        inquiry.setLast_modified_date((new Timestamp(System.currentTimeMillis())).toString());

        Inquiry endUpdatedInquiry = inquiryRepository.save(inquiry);
        return ResponseEntity.ok(endUpdatedInquiry);
    }

    // ���� ����Ʈ
    @Transactional(readOnly = true)
    public List<Inquiry> Listinquirys(int productId) {
        return this.inquiryRepository.getInquirysOfProduct(productId);
    }

    // ���� ����
    @Transactional
    public List<Inquiry> Deleteinquiry(int inquiryId, int productId) {
        this.inquiryRepository.deleteById(inquiryId);
        return this.inquiryRepository.getInquirysOfProduct(productId);
    }

}
