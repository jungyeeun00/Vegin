package com.example.board.repository;

import com.example.board.dto.ProductDto;
import com.example.board.model.Choice;
import com.example.board.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ShopRepository extends JpaRepository<Product, Integer> {
    /* product 불러오는 기본 sql */
    String BASE_SQL = ""
            + "SELECT "
            + "p.product_id as productId,"
            + "p.product_name as productName,"
            + "p.reg_price as regPrice,"
            + "p.sold_price as soldPrice,"
            + "p.sale_rate as saleRate,"
            + "p.category as category,"
            + "p.img_src as imgSrc,"
            + "p.detail as detail "
            + "FROM product p";

    /* 찜한 순(like 테이블에서 product_id의 count순)으로 정렬하는 sql */
    String SORT0_SQL = " "
            + "left join "
            + "(SELECT product_id, count(product_id) as count FROM likes GROUP BY product_id) as l "
            + "ON p.product_id=l.product_id";

    /* 상품별 모든 옵션 */
    public String CHOICE_ALL =
            "SELECT c FROM Choice c WHERE c.productId = :productId";

    /* 전체 상품 */
    public String LIST = BASE_SQL;
    public String LIST0 = BASE_SQL + SORT0_SQL;

    /* 카테고리별 상품 */
    public String PRODUCT_CATE = BASE_SQL + " WHERE p.category=?1";
    public String PRODUCT_CATE0 = BASE_SQL + SORT0_SQL + " WHERE p.category=?1";
    public String COUNT_PRODUCT_CATE_LIST =
            "SELECT count(p) FROM Product p WHERE category=:category";


    /* 전체 + 검색 */
    public String PRODUCT_KEYWORD = BASE_SQL + " WHERE p.product_name LIKE %?1%";
    public String PRODUCT_KEYWORD0 = BASE_SQL + SORT0_SQL + " WHERE p.product_name LIKE %?1%";
    public String COUNT_PRODUCT_KEYWORD =
            "SELECT count(p) FROM Product p WHERE product_name LIKE %:searchInput%";


    /* 카테고리 + 검색 */
    public String PRODUCT_CATE_KEYWORD = BASE_SQL + " WHERE p.category=?1 && p.product_name LIKE %?2%";
    public String PRODUCT_CATE_KEYWORD0 = BASE_SQL + SORT0_SQL + " WHERE p.category=?1 && p.product_name LIKE %?2%";
    public String COUNT_PRODUCT_CATE_KEYWORD =
            "SELECT count(p) FROM Product p WHERE category=:category AND product_name LIKE %:searchInput%";

    /* featured 아이템 4개(찜한순) */
    public String FEATURED_ITEM = BASE_SQL + SORT0_SQL;


    @Query(value = CHOICE_ALL)
    List<Choice> findChoice(@Param("productId") Integer productId);
    // 전체 (검색X)
    @Query(value = LIST, nativeQuery = true)
    List<ProductDto> findP(Pageable pageable);
    @Query(value = LIST0, nativeQuery = true)
    List<ProductDto> findP0(Pageable pageable);


    // 전체 (검색O)
    @Query(value = PRODUCT_KEYWORD, nativeQuery = true)
    List<ProductDto> findPKeyword(final String searchInput, Pageable pageable);
    @Query(value = PRODUCT_KEYWORD0, nativeQuery = true)
    List<ProductDto> findPKeyword0(final String searchInput, Pageable pageable);
    @Query(value = COUNT_PRODUCT_KEYWORD)
    Long countKeyword(@Param("searchInput") String searchInput);


    // 카테고리 (검색X)
    @Query(value = PRODUCT_CATE, nativeQuery = true)
    List<ProductDto> findPCate(final String category, Pageable pageable);
    @Query(value = PRODUCT_CATE0, nativeQuery = true)
    List<ProductDto> findPCate0(final String category, Pageable pageable);
    @Query(value = COUNT_PRODUCT_CATE_LIST)
    Long countCate(@Param("category") String category);


    // 카테고리 (검색O)
    @Query(value = PRODUCT_CATE_KEYWORD, nativeQuery = true)
    List<ProductDto> findPCateKeyword(final String category, final String searchInput, Pageable pageable);
    @Query(value = PRODUCT_CATE_KEYWORD0, nativeQuery = true)
    List<ProductDto> findPCateKeyword0(final String category, final String searchInput, Pageable pageable);
    @Query(value = COUNT_PRODUCT_CATE_KEYWORD)
    Long countCateKeyword(@Param("category") String category, @Param("searchInput") String searchInput);

    // featured item 4개 불러오기
    @Query(value = FEATURED_ITEM, nativeQuery = true)
    List<ProductDto> findFeatured(Pageable pageable);

    Optional<Product> findById(Integer id);
}
