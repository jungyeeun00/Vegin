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

    // 문의 등록
    public Inquiry createInquiry(Inquiry inquiry, int productId) {
        Optional<Product> product = this.shopRepository.findById(productId);
        product.ifPresent(re->{
            inquiry.changeProduct(re);
        });
        System.out.println(inquiry);
        return this.inquiryRepository.save(inquiry);
    }

    // 문의 수정
    public ResponseEntity<Inquiry> updateInquiry(Integer id, Inquiry updatedInquiry) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Inquiry Data by id : [" + id + "]"));
        inquiry.setText(updatedInquiry.getText());
        inquiry.setAnswer(updatedInquiry.getAnswer());
        inquiry.setLast_modified_date((new Timestamp(System.currentTimeMillis())).toString());

        Inquiry endUpdatedInquiry = inquiryRepository.save(inquiry);
        return ResponseEntity.ok(endUpdatedInquiry);
    }

    // 문의 리스트
    @Transactional(readOnly = true)
    public List<Inquiry> Listinquirys(int productId) {
        return this.inquiryRepository.getInquirysOfProduct(productId);
    }

    // 문의 삭제
    @Transactional
    public List<Inquiry> Deleteinquiry(int inquiryId, int productId) {
        this.inquiryRepository.deleteById(inquiryId);
        return this.inquiryRepository.getInquirysOfProduct(productId);
    }

}
