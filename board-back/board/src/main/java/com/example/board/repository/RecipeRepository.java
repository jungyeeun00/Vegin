package com.example.board.repository;

import com.example.board.model.Ingredient;
import com.example.board.model.Recipe;
import com.example.board.model.Step;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import javax.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {

    /* 레시피 id와 카테고리 별 전체 재료 */
    public String INGREDIENT_ALL = ""
            + "select i from Ingredient i where i.recipeId=:id and i.category=:category";

    /* 재료 카테고리 */
    public String INGREDIENT_CATEGORY = ""
            + "select category from Ingredient where recipe_id=:id group by category";

    /* 레시피 id별 전체 조리 스텝 */
    public String STEP_ALL = ""
            + "select s from Step s where s.recipeId=:id";

    /* 전체 레시피 */
    public String RECIPE_LIST =
            "SELECT * FROM Recipe";

    /* 카테고리별 레시피(카테고리 1개) */
    public String RECIPE_CATE =
            "SELECT * FROM Recipe WHERE category=?1";

    /* 카테고리별 레시피(카테고리 3개 빵, 디저트, 과자용)  */
    public String RECIPE_CATE_MULT =
            "SELECT * FROM Recipe WHERE category=?1 or category=?2 or category=?3";

    /* 카테고리별 레시피 개수 */
    public String COUNT_RECIPE_CATE_LIST =
            "SELECT count(r) FROM Recipe r WHERE category=:category ORDER BY id";

    /* 전체 + 검색 */
    public String RECIPE_KEYWORD =
            "SELECT * FROM Recipe rc "
                    + "WHERE rc.id in "
                    + "(SELECT DISTINCT r.id FROM Recipe r join Ingredient i on r.id=i.recipe_id "
                    + "WHERE r.name LIKE %?1% or i.name LIKE %?1%)";
    public String COUNT_RECIPE_KEYWORD =
            "SELECT count(rc) FROM Recipe rc "
                    + "WHERE id in "
                    + "(SELECT DISTINCT r.id FROM Recipe r join Ingredient i on r.id=i.recipeId "
                    + "WHERE r.name LIKE %:searchInput% or i.name LIKE %:searchInput%)";

    /* 카테고리 + 검색 */
    public String RECIPE_CATE_KEYWORD =
            "SELECT * FROM Recipe rc "
                    + "WHERE rc.id in "
                    + "(SELECT DISTINCT r.id FROM Recipe r join Ingredient i on r.id=i.recipe_id "
                    + "WHERE r.category=?1 and (r.name LIKE %?2% or i.name LIKE %?2%))";
    public String COUNT_RECIPE_CATE_KEYWORD =
            "SELECT count(rc) FROM Recipe rc "
                    + "WHERE id in "
                    + "(SELECT DISTINCT r.id FROM Recipe r join Ingredient i on r.id=i.recipeId "
                    + "WHERE r.category=:category and (r.name LIKE %:searchInput% or i.name LIKE %:searchInput%))";

    /* 카테고리 3개인 빵/디저트/과자에서 검색 */
    public String RECIPE_CATE_KEYWORD_MULT =
            "SELECT * FROM Recipe rc "
                    + "WHERE (rc.category=?1 or rc.category=?2 or rc.category=?3) and "
                    +"rc.id in "
                    +"(SELECT DISTINCT r.id FROM Recipe r join Ingredient i on r.id=i.recipe_id "
                    +"WHERE r.name LIKE %?4% or i.name LIKE %?4%)";
    public String COUNT_RECIPE_CATE_KEYWORD_MULT =
            "SELECT count(*) FROM Recipe rc "
                    +"WHERE (rc.category=?1 or rc.category=?2 or rc.category=?3) and "
                    +"rc.id in "
                    +"(SELECT DISTINCT r.id FROM Recipe r join Ingredient i on r.id=i.recipe_id "
                    +"WHERE r.name LIKE %?4% or i.name LIKE %?4%)";

    /* 조회수 + 1 */
    public String ADD_VIEW_COUNT =
            "UPDATE Recipe r " +
                    "SET r.views = r.views + 1 " +
                    "WHERE r.id=?1";

    @Query(value = INGREDIENT_ALL)
    List<Ingredient> findIgrById(@Param("id") Integer id, @Param("category") String category);

    @Query(value = INGREDIENT_CATEGORY)
    List<String> findIgrCate(@Param("id") Integer id);

    @Query(value = STEP_ALL)
    List<Step> findStById(@Param("id") Integer id);

    // 전체 (검색X)
    @Query(value = RECIPE_LIST, nativeQuery = true)
    List<Recipe> findR(Pageable pageable);

    // 카테고리 (검색X)
    @Query(value = RECIPE_CATE, nativeQuery = true)
    List<Recipe> findRCate(final String category,
                           Pageable pageable);
    @Query(value = RECIPE_CATE_MULT, nativeQuery = true)
    List<Recipe> findRCateM(final String category1,
                            final String category2,
                            final String category3,
                            Pageable pageable);
    @Query(value = COUNT_RECIPE_CATE_LIST)
    Long countCate(@Param("category") String category);

    // 전체 (검색O)
    @Query(value = RECIPE_KEYWORD, nativeQuery = true)
    List<Recipe> findRKeyword(final String searchInput,
                              Pageable pageable);
    @Query(value = COUNT_RECIPE_KEYWORD)
    Long countKeyword(@Param("searchInput") String searchInput);

    // 카테고리 (검색O)
    @Query(value = RECIPE_CATE_KEYWORD, nativeQuery = true)
    List<Recipe> findRCateKeyword(final String category,
                                  final String searchInput,
                                  Pageable pageable);
    @Query(value = COUNT_RECIPE_CATE_KEYWORD)
    Long countCateKeyword(@Param("category") String category, @Param("searchInput") String searchInput);
    @Query(value = RECIPE_CATE_KEYWORD_MULT, nativeQuery = true)
    List<Recipe> findRCateKeywordM(final String category1,
                                  final String category2,
                                  final String category3,
                                  final String searchInput,
                                   Pageable pageable);
    @Query(value = COUNT_RECIPE_CATE_KEYWORD_MULT, nativeQuery = true)
    Long countCateKeywordM(final String category1,
                      final String category2,
                      final String category3,
                      final String searchInput);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = ADD_VIEW_COUNT, nativeQuery = true)
    Integer addViewCount(final Integer id);

    Optional<Recipe> findById(Integer id);
}
