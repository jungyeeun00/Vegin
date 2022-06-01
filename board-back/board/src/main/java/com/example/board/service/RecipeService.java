package com.example.board.service;

import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;

import com.example.board.model.Recipe;
import com.example.board.model.Step;
import com.example.board.repository.RecipeRepository;
import com.example.board.util.PagingUtil2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import java.io.*;
import java.util.*;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    /* 재료 */
    public ResponseEntity<HashMap<String, Object>> getIngredient(Integer id) {
        HashMap<String, Object> ingredient = new HashMap<String, Object>();
        List<String> categories = recipeRepository.findIgrCate(id);
        for(String category : categories) {
            ingredient.put(category, recipeRepository.findIgrById(id, category));
        }

        return ResponseEntity.ok(ingredient);
    }

    /* 조리단계 */
    public ResponseEntity<List<Step>> getStep(Integer id) {
        return ResponseEntity.ok(recipeRepository.findStById(id));
    }

    /* 조회수 증가 */
    public void setViews(Integer id) {
        recipeRepository.addViewCount(id);
    }

    public ResponseEntity<List<Recipe>> getFeatured() {
        Pageable page = PageRequest.of(0, 4, Sort.by("views").descending());
        List<Recipe> list = recipeRepository.findR(page);
        return ResponseEntity.ok(list);
    }

    /* 페이지별 전체 레시피 */
    public ResponseEntity<Map> getRecipe(Integer sort, Integer p_num) {
        Map result = null;

        PagingUtil2 pu = new PagingUtil2(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_recipe = PageRequest.of(p_num-1, pu.getObjectCountPerPage(), Sort.by("id"));
        Pageable sort_popular = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("views").descending());

        List<Recipe> list = sort ==0 ? recipeRepository.findR(sort_recipe)
                : recipeRepository.findR(sort_popular);

        pu.setObjectCountTotal(getAllCount());
        pu.setCalcForPaging();

        System.out.println("p_num : "+p_num);
        System.out.println(pu.toString());

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

    /* 카테고리별 레시피 */
    public ResponseEntity<Map> getRecipeCate(Integer sort, String category, Integer p_num) {
        Map result = null;
        List<Recipe> list;

        PagingUtil2 pu = new PagingUtil2(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_recipe = PageRequest.of(p_num-1, pu.getObjectCountPerPage(), Sort.by("id"));
        Pageable sort_popular = PageRequest.of(p_num-1, pu.getObjectCountPerPage(), Sort.by("views").descending());

        if(category.equals("빵/디저트/과자")) {
            list = sort ==0 ? recipeRepository.findRCateM("빵", "디저트", "과자", sort_recipe) : recipeRepository.findRCateM("빵", "디저트", "과자", sort_popular);
            pu.setObjectCountTotal(getCateCount("빵") + getCateCount("디저트") + getCateCount("과자"));
        }
        else {
            list = sort ==0 ? recipeRepository.findRCate(category, sort_recipe) : recipeRepository.findRCate(category, sort_popular);
            pu.setObjectCountTotal(getCateCount(category));
        }
        pu.setCalcForPaging();

        System.out.println("p_num : "+p_num);
        System.out.println(pu.toString());

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

    /* 검색된 전체 레시피 */
    public ResponseEntity<Map> getRecipeKeyword(Integer sort, String searchInput, Integer p_num) {
        Map result = null;

        PagingUtil2 pu = new PagingUtil2(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_recipe = PageRequest.of(p_num-1, pu.getObjectCountPerPage(), Sort.by("id"));
        Pageable sort_popular = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("views").descending());

        List<Recipe> list = sort ==0 ? recipeRepository.findRKeyword(searchInput, sort_recipe) : recipeRepository.findRKeyword(searchInput, sort_popular);
        pu.setObjectCountTotal(getCountKeyword(searchInput));
        pu.setCalcForPaging();

        System.out.println("p_num : "+p_num);
        System.out.println(pu.toString());

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

    /* 카테고리별 검색된 레시피 */
    public ResponseEntity<Map> getRecipeCateKeyword(Integer sort, String category, String searchInput, Integer p_num) {
        Map result = null;
        List<Recipe> list;

        PagingUtil2 pu = new PagingUtil2(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_recipe = PageRequest.of(p_num-1, pu.getObjectCountPerPage(), Sort.by("id"));
        Pageable sort_popular = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("views").descending());

        if(category.equals("빵/디저트/과자")) {
            list = sort ==0 ? recipeRepository.findRCateKeywordM("빵", "디저트", "과자", searchInput, sort_recipe) : recipeRepository.findRCateKeywordM("빵", "디저트", "과자", searchInput, sort_popular);
            pu.setObjectCountTotal(getCateCountKeywordM("빵", "디저트","과자",searchInput));
        }
        else {
            list = sort ==0 ? recipeRepository.findRCateKeyword(category, searchInput, sort_recipe) : recipeRepository.findRCateKeyword(category, searchInput, sort_popular);
            pu.setObjectCountTotal(getCateCountKeyword(category, searchInput));
        }
        pu.setCalcForPaging();

        System.out.println("p_num : "+p_num);
        System.out.println(pu.toString());

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

    /* 전체 레시피 개수 */
    public int getAllCount() {
        return (int) recipeRepository.count();
    }

    /* 카테고리별 레시피 개수 */
    public int getCateCount(String category) {
        return recipeRepository.countCate(category).intValue();
    }

    /* 검색된 전체 레시피 개수 */
    public int getCountKeyword(String searchInput) {
        return recipeRepository.countKw(searchInput).intValue();
    }

    /* 검색된 카테고리별 레시피 개수 */
    public int getCateCountKeyword(String category, String searchInput) {
        return recipeRepository.countCateKw(category, searchInput).intValue();
    }

    /* 검색된 카테고리(3개짜리) 레시피 개수 */
    public int getCateCountKeywordM(String category1, String category2, String category3, String searchInput) {
        return recipeRepository.countCateKeywordM(category1, category2, category3, searchInput).intValue();
    }

    /* 조회 로그 기록 */
    public void writeLog(Cookie cookie, Integer id, long time) {

        String path = "./board/src/main/resources/RecipeViewLog.txt";

        try {
            File file = new File(path);
            FileWriter fw = new FileWriter(file, true);
            BufferedWriter writer = new BufferedWriter(fw);
            writer.write(cookie.getValue() + "\t" + id + "\t" + time + "\n");
            writer.flush();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /* 검색 로그 기록 */
    public void writeLog(Cookie cookie, String keyword, long time) {
        String path = "./board/src/main/resources/RecipeSearchLog.txt";
        try {
            File file = new File(path);
            FileWriter fw = new FileWriter(file, true);
            BufferedWriter writer = new BufferedWriter(fw);
            writer.write(cookie.getValue() + "\t" + keyword + "\t" + time + "\n");
            writer.flush();
            writer.close();
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    /* 추천 리스트 받아오기 */
    public List<Recipe> recommend(String value) {
        List<Recipe> list = new ArrayList<>();

        if(value == null) {
            for(int i=0; i<8; i++) {
                double randomValue = Math.random();
                int intValue = (int) (randomValue * getAllCount()) + 1;
                list.add(recipeRepository.findById(intValue).get());
            }
        }
        else {
            try{
                //파일 객체 생성
                File file = new File("./board/src/main/resources/RecipeViewLog.txt");
                //입력 스트림 생성
                FileReader filereader = new FileReader(file);
                //입력 버퍼 생성
                BufferedReader bufReader = new BufferedReader(filereader);
                String line = "";
                String id = "";
                Long time = 0L;
                while((line = bufReader.readLine()) != null){
                    String[] array = line.split("\t");
                    if(array[0].equals(value) && Long.parseLong(array[2]) > time)
                        id = array[1];
                }
                //.readLine()은 끝에 개행문자를 읽지 않는다.
                bufReader.close();

                String[] command = new String[3];
                command[0] = "python";
                command[1] = "./recipeRec/RecipeRec.py";
                command[2] = id;

                String[] idList;
                idList = execPython(command);
                for(String i:idList)
                    list.add(recipeRepository.findById(Integer.parseInt(i)).get());

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return list;
    }

    /* 파이썬 코드 실행 */
    public static String[] execPython(String[] command) {
        String[] split = new String[0];
        try {
            CommandLine commandLine = CommandLine.parse(command[0]);
            for (int i = 1, n = command.length; i < n; i++) {
                commandLine.addArgument(command[i]);
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(outputStream);
//            PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(System.out);
            DefaultExecutor executor = new DefaultExecutor();
            executor.setStreamHandler(pumpStreamHandler);
            int result = executor.execute(commandLine);
            String line = new String(outputStream.toByteArray());

            split = line.split(",");

            for(int i = 0; i < 8; i++) {
                split[i] = split[i].replaceAll("[^0-9]", "");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return split;
    }
}
