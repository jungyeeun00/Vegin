package com.example.board.repository;

import com.example.board.model.Inquiry;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InquiryRepository extends CrudRepository<Inquiry, Integer> {

    /* 상품 문의 목록 */
    @Query("SELECT i from Inquiry i where i.product.productId=:productId and i.id>0 order by i.id ASC")
    public List<Inquiry> getInquirysOfProduct(@Param("productId") Integer productId);
}
