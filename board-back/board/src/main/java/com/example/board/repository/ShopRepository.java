package com.example.board.repository;

import com.example.board.model.Choice;
import com.example.board.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

// DB의 SQL 역할하는 인터페이스
public interface ShopRepository extends JpaRepository<Product, Integer> {
    public final static String CHOICE_ALL =
            "SELECT c FROM Choice c WHERE c.productId = :productId";
    public final static String LIST =
            "SELECT * FROM Product";

    public String PRODUCT_CATE =
            //"SELECT * FROM Product WHERE category=?1 ORDER BY product_id ASC LIMIT ?2, ?3";
            "SELECT * FROM Product WHERE category=?1";
    public String COUNT_PRODUCT_CATE_LIST =
            "SELECT count(p) FROM Product p WHERE category=:category";


    // 전체(검색)
    public final static String PRODUCT_KEYWORD =
            //"SELECT * FROM Product WHERE product_name LIKE %?1% ORDER BY product_id ASC LIMIT ?2, ?3";
            "SELECT * FROM Product WHERE product_name LIKE %?1%";
    public String COUNT_PRODUCT_KEYWORD =
            "SELECT count(p) FROM Product p WHERE product_name LIKE %:searchInput%";


    // 카테고리 + 검색
    public String PRODUCT_CATE_KEYWORD =
            //"SELECT * FROM Product WHERE category=?1 && product_name LIKE %?2% ORDER BY product_id ASC LIMIT ?3, ?4";
            "SELECT * FROM Product WHERE category=?1 && product_name LIKE %?2%";
    public String COUNT_PRODUCT_CATE_KEYWORD =
            "SELECT count(p) FROM Product p WHERE category=:category AND product_name LIKE %:searchInput%";


    @Query(value = CHOICE_ALL)
    List<Choice> findChoice(@Param("productId") Integer productId);
    // 전체 (검색X)
    @Query(value = LIST, nativeQuery = true)
    //List<Product> findFromTo(final Integer objectStartNum, final Integer objectCountPerPage);
    List<Product> findP(Pageable pageable);


    // 전체 (검색O)
    @Query(value = PRODUCT_KEYWORD, nativeQuery = true)
    List<Product> findPKeyword(final String searchInput, Pageable pageable);
    //List<Product> findFromToWithKeyword(final String searchInput, final Integer objectStartNum, final Integer objectCountPerPage);
    @Query(value = COUNT_PRODUCT_KEYWORD)
    Long countKeyword(@Param("searchInput") String searchInput);


    // 카테고리 (검색X)
    @Query(value = PRODUCT_CATE, nativeQuery = true)
    List<Product> findPCate(final String category, Pageable pageable);
    //List<Product> findFromToByCate(final String category, final Integer objectStartNum, final Integer objectCountPerPage);
    @Query(value = COUNT_PRODUCT_CATE_LIST)
    Long countCate(@Param("category") String category);


    // 카테고리(검색O)
    @Query(value = PRODUCT_CATE_KEYWORD, nativeQuery = true)
    List<Product> findPCateKeyword(final String category, final String searchInput, Pageable pageable);
    @Query(value = COUNT_PRODUCT_CATE_KEYWORD)
    Long countCateKeyword(@Param("category") String category, @Param("searchInput") String searchInput);

    Optional<Product> findById(Integer id);
}
