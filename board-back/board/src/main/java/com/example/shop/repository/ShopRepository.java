package com.example.shop.repository;
import com.example.shop.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.shop.model.Choice;
import org.springframework.data.repository.query.Param;

import java.util.List;

// DB의 SQL 역할하는 인터페이스
public interface ShopRepository extends JpaRepository<Product, Integer> {
   public final static String SELECT_CHOICE_LIST =
          "select c from Choice c where c.productId = :productId";
    public final static String SELECT_PRODUCT_LIST_PAGED =
         "SELECT * FROM Product ORDER BY product_id ASC LIMIT ?1, ?2";


    public String SELECT_PRODUCT_CATE_LIST_PAGED =
            "SELECT * FROM Product WHERE category=?1 ORDER BY product_id ASC LIMIT ?2, ?3";
    public String SELECT_COUNT_PRODUCT_CATE_LIST =
            "SELECT count(p) FROM Product p WHERE category=:category ORDER BY product_id";


    // 전체(검색 포함)
    public final static String SELECT_PRODUCT_LIST_PAGED_WITH_KEYWORD =
            "SELECT * FROM Product WHERE product_name LIKE %?1% ORDER BY product_id ASC LIMIT ?2, ?3";
    public String SELECT_COUNT_PRODUCT_LIST_WITH_KEYWORD =
            "SELECT count(p) FROM Product p WHERE product_name LIKE %:searchInput%  ORDER BY product_id";


    // like 써서 검색
      public String SELECT_PRODUCT_CATE_LIST_PAGED_WITH_KEYWORD =
              "SELECT * FROM Product WHERE category=?1 && product_name LIKE %?2% ORDER BY product_id ASC LIMIT ?3, ?4";
      public String SELECT_COUNT_PRODUCT_CATE_LIST_WITH_KEYWORD =
            "SELECT count(p) FROM Product p WHERE category=:category AND product_name LIKE %:searchInput% ORDER BY product_id";


    @Query(value = SELECT_CHOICE_LIST)
    List<Choice> findChoice(@Param("productId") Integer productId);
    // 전체 (검색 없이)
    @Query(value = SELECT_PRODUCT_LIST_PAGED, nativeQuery = true)
    List<Product> findFromTo(final Integer objectStartNum, final Integer objectCountPerPage);


    // 전체 (검색 포함)
    @Query(value = SELECT_PRODUCT_LIST_PAGED_WITH_KEYWORD, nativeQuery = true)
    List<Product> findFromToWithKeyword(final String searchInput, final Integer objectStartNum, final Integer objectCountPerPage);
    @Query(value = SELECT_COUNT_PRODUCT_LIST_WITH_KEYWORD)
    Long countWithKeyword(@Param("searchInput") String searchInput);


    // 카테고리 (검색 없이)
    @Query(value = SELECT_PRODUCT_CATE_LIST_PAGED, nativeQuery = true)
    List<Product> findFromToByCate(final String category, final Integer objectStartNum, final Integer objectCountPerPage);
    @Query(value = SELECT_COUNT_PRODUCT_CATE_LIST)
    Long countCate(@Param("category") String category);


    // 카테고리(검색 추가)
      @Query(value = SELECT_PRODUCT_CATE_LIST_PAGED_WITH_KEYWORD, nativeQuery = true)
      List<Product> findFromToByCateWithKeyword(final String category, final String searchInput, final Integer objectStartNum, final Integer objectCountPerPage);
      @Query(value = SELECT_COUNT_PRODUCT_CATE_LIST_WITH_KEYWORD)
      Long countCateWithKeyword(@Param("category") String category, @Param("searchInput") String searchInput);
}
