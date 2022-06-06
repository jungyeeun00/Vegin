package com.example.board.service;

import com.example.board.dto.ProductDto;
import com.example.board.model.Choice;
import com.example.board.model.Product;
import com.example.board.repository.ShopRepository;
import com.example.board.util.PagingUtil2;
import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ShopService {

    @Autowired
    private ShopRepository shopRepository;

    /* 상품별 옵션 */
    public List<Choice> getChoices(Integer productId) {
        return shopRepository.findChoice(productId);
    }

    /* featured 4개 상품 */
    public ResponseEntity<List<ProductDto>> getFeatured() {
        Pageable page = PageRequest.of(0, 4, Sort.by("count").descending());
        List<ProductDto> list = shopRepository.findFeatured(page);
        return ResponseEntity.ok(list);
    }

    /* 페이지별 전체 상품 */
    public ResponseEntity<Map> getProduct(Integer sort, Integer p_num) {
        Map result = null;

        PagingUtil2 pu = new PagingUtil2(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_product = PageRequest.of(p_num-1, pu.getObjectCountPerPage(), Sort.by("count").descending()); // 인기순(찜개수순) 정렬
        Pageable sort_lowest = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("sold_price")); // 최저가순 정렬


        List<ProductDto> list = sort == 0 ? shopRepository.findP0(sort_product)
                                        : shopRepository.findP(sort_lowest);

        pu.setObjectCountTotal(getAllCount());
        pu.setCalcForPaging();


        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

    /* 검색된 전체 상품 */
    public ResponseEntity<Map> getProductKeyword(String searchInput, Integer p_num, Integer sort) {
        Map result = null;

        PagingUtil2 pu = new PagingUtil2(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_product = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("count").descending()); // 인기순(찜개수순) 정렬
        Pageable sort_lowest = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("sold_price")); // 최저가순 정렬

        List<ProductDto> list = sort == 0 ? shopRepository.findPKeyword0(searchInput, sort_product)
                                        : shopRepository.findPKeyword(searchInput, sort_lowest);

        pu.setObjectCountTotal(getCountKeyword(searchInput));
        pu.setCalcForPaging();

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

    /* 카테고리별 상품 */
    public ResponseEntity<Map> getProductCate(String category, Integer p_num, Integer sort) {
        Map result = null;

        PagingUtil2 pu = new PagingUtil2(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_product = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("count").descending()); // 인기순(찜개수순) 정렬
        Pageable sort_lowest = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("sold_price")); // 최저가순 정렬

        List<ProductDto> list = sort == 0 ? shopRepository.findPCate0(category, sort_product)
                                        : shopRepository.findPCate(category, sort_lowest);

        pu.setObjectCountTotal(getCateCount(category));
        pu.setCalcForPaging();

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

    /* 카테고리별 검색된 상품 */
    public ResponseEntity<Map> getProductCateKeyword(String category, String searchInput, Integer p_num, Integer sort) {
        Map result = null;

       PagingUtil2 pu = new PagingUtil2(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_product = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("count").descending()); // 인기순(찜개수순) 정렬
        Pageable sort_lowest = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("sold_price")); // 최저가순 정렬

        List<ProductDto> list = sort == 0 ? shopRepository.findPCateKeyword0(category, searchInput, sort_product)
                                        : shopRepository.findPCateKeyword(category, searchInput, sort_lowest);
        pu.setObjectCountTotal(getCateCountKeyword(category, searchInput));
        pu.setCalcForPaging();

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

    /* 전체 상품 개수 */
    public int getAllCount() {
        return (int) shopRepository.count();
    }

    /* 전체 검색된 상품 개수 */
    public int getCountKeyword(String searchInput) {
        return shopRepository.countKeyword(searchInput).intValue();
    }

    /* 카테고리 별 상품 개수 */
    public int getCateCount(String category) {
        return shopRepository.countCate(category).intValue();
    }

    /* 카테고리 별 검색된 상품 개수 */
    public int getCateCountKeyword(String category, String searchInput) {
        return shopRepository.countCateKeyword(category, searchInput).intValue();
    }

    /* 조회 로그 기록 */
    public void writeLog(Cookie cookie, Integer id, long time) {

        String path = "/Users/jeong-yeeun/Documents/Vegin/Vegin/board-back/board/src/main/resources/ShopViewLog.txt";

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
        String path = "/Users/jeong-yeeun/Documents/Vegin/Vegin/board-back/board/src/main/resources/ShopSearchLog.txt";

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
    public List<Product> recommend(String value) {
        List<Product> list = new ArrayList<>();
        String [] idList;

        if(value == null) { // 쿠키 없을 경우 랜덤으로 8개 추천
            for(int i = 0; i < 8; i++) {
                double randomValue = Math.random();
                int intValue = (int) (randomValue * getAllCount()) + 1;
                System.out.println(intValue);
                list.add(shopRepository.findById(intValue).get());
            }
        }
        else {
            try{
                /* viewlog 파일에서 가장 최근 기록된 로그의 id를 찾음 */
                File file = new File("/Users/jeong-yeeun/Documents/Vegin/Vegin/board-back/board/src/main/resources/ShopViewLog.txt");
                FileReader filereader = new FileReader(file);
                BufferedReader bufReader = new BufferedReader(filereader);
                String line = "";
                String id = "";
                Long time = 0L;
                while((line = bufReader.readLine()) != null){
                    String[] array = line.split("\t");
                    if(array[0].equals(value) && Long.parseLong(array[2]) > time)
                        id = array[1];
                }
                bufReader.close();

                /* 파이썬과 연동하여 추천리스트 받아오기 */
                String[] command = new String[3];
                command[0] = "python3";
                command[1] = "/Users/jeong-yeeun/Documents/Vegin/Vegin/board-back/shopRec/ShopRec.py";
                command[2] = id;

                idList = execPython(command);
                for(String i: idList)
                    list.add(shopRepository.findById(Integer.parseInt(i)).get());


            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return list;
    }

    /* 추천 시스템 파이썬 코드 실행 */
    public static String[] execPython(String[] command) {
        //String[] split = null;
        String[] split = new String[0];
        try {
            CommandLine commandLine = CommandLine.parse(command[0]);
            for (int i = 1, n = command.length; i < n; i++) {
                commandLine.addArgument(command[i]);
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(outputStream);
            DefaultExecutor executor = new DefaultExecutor();
            executor.setStreamHandler(pumpStreamHandler);
            int result = executor.execute(commandLine);

            String line = new String(outputStream.toByteArray());

            /* 문자열로 받아온 결과 배열로 만들어서 return */
            split = line.split(",");
            for(int i = 0; i < 8; i++) {
                split[i] = split[i].replaceAll("[^0-9]", "");
                System.out.println(split[i]);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return split;
    }
}
