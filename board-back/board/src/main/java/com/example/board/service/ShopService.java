package com.example.board.service;

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

    public List<Choice> getChoices(Integer productId) {
        return shopRepository.findChoice(productId);
}

    public ResponseEntity<Map> getProduct(Integer sort, Integer p_num) {
        Map result = null;

        PagingUtil2 pu = new PagingUtil2(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_product = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("product_id"));
        Pageable sort_lowest = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("sold_price"));

        List<Product> list = sort ==0 ? shopRepository.findP(sort_product)
                                        : shopRepository.findP(sort_lowest);

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

    public ResponseEntity<Map> getProductKeyword(String searchInput, Integer p_num, Integer sort) {
        Map result = null;

        PagingUtil2 pu = new PagingUtil2(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_product = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("product_id"));
        Pageable sort_lowest = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("sold_price"));

        List<Product> list = sort == 0 ? shopRepository.findPKeyword(searchInput, sort_product)
                                        : shopRepository.findPKeyword(searchInput, sort_lowest);

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
    public ResponseEntity<Map> getProductCate(String category, Integer p_num, Integer sort) {
        Map result = null;

        PagingUtil2 pu = new PagingUtil2(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_product = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("product_id"));
        Pageable sort_lowest = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("sold_price"));

        List<Product> list = sort == 0 ? shopRepository.findPCate(category, sort_product)
                                        : shopRepository.findPCate(category, sort_lowest);

        pu.setObjectCountTotal(getCateCount(category));
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

    public ResponseEntity<Map> getProductCateKeyword(String category, String searchInput, Integer p_num, Integer sort) {
        Map result = null;

       PagingUtil2 pu = new PagingUtil2(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_product = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("product_id"));
        Pageable sort_lowest = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("sold_price"));

        List<Product> list = sort == 0 ? shopRepository.findPCateKeyword(category, searchInput, sort_product)
                                        : shopRepository.findPCateKeyword(category, searchInput, sort_lowest);
        pu.setObjectCountTotal(getCateCountKeyword(category, searchInput));
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

    /* 조회, 검색 로그 기록 */
    public void writeLog(Cookie cookie, Integer id, long time) {

        String path = "./board/src/main/resources/ShopViewLog.txt";

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

    public void writeLog(Cookie cookie, String keyword, long time) {
        String path = "./board/src/main/resources/ShopSearchLog.txt";

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

    /* 상품 추천 */
    public List<Product> recommend(String value) {
        List<Product> list = new ArrayList<>();
        String [] idList;

        if(value == null) {
            for(int i = 0; i < 8; i++) {
                double randomValue = Math.random();
                int intValue = (int) (randomValue * getAllCount()) + 1;
                System.out.println(intValue);
                list.add(shopRepository.findById(intValue).get());
            }
        }
        else {
            try{
                //파일 객체 생성
                File file = new File("./board/src/main/resources/ShopViewLog.txt");
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
                command[0] = "python3";
                command[1] = "./shopRec/ShopRec.py";
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
