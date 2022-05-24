package com.example.board.controller;

import com.example.board.model.PlaceInfo;
import com.example.board.repository.PlaceInfoRepository;
import com.example.board.service.PlaceService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/place-page")
public class PlaceController {

    @Autowired
    private PlaceService placeService;


    @GetMapping("/map")
    public List<PlaceInfo> getAllPlaces(){
        String result = "";

        try {

            URL url = new URL("http://openapi.seoul.go.kr:8088/" + "41497a6663656b6634335950466b78/" +
                    "json/CrtfcUpsoInfo/1/1000");
            BufferedReader bf;
            bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
            result = bf.readLine();

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject)jsonParser.parse(result);
            JSONObject CrtfcUpsoInfo = (JSONObject)jsonObject.get("CrtfcUpsoInfo");

            JSONArray infoArr = (JSONArray) CrtfcUpsoInfo.get("row");

            for(int i=0;i<infoArr.size();i++){

                JSONObject tmp = (JSONObject)infoArr.get(i);
                if(!tmp.get("CRTFC_GBN").equals("14")) continue;

                if (placeService.findAllCount() > 500) break;

                //네이버 검색 api
                String clientId = "KWZO2nm_58J0kYLojjaw"; //애플리케이션 클라이언트 아이디값"
                String clientSecret = "TYZo36AIJQ"; //애플리케이션 클라이언트 시크릿값"

                String text = null;
                try {
                    text = URLEncoder.encode((String) tmp.get("UPSO_NM"), "UTF-8");
                } catch (UnsupportedEncodingException e) {
                    throw new RuntimeException("검색어 인코딩 실패",e);
                }

                String apiURL = "https://openapi.naver.com/v1/search/image?query=" + text;    // json 결과

                Map<String, String> requestHeaders = new HashMap<>();
                requestHeaders.put("X-Naver-Client-Id", clientId);
                requestHeaders.put("X-Naver-Client-Secret", clientSecret);
                String responseBody = ImageSearchApi.get(apiURL,requestHeaders);

                String image_url = "https://cdn.pixabay.com/photo/2020/08/05/13/27/eco-5465459_1280.png";
                JSONParser parser = new JSONParser();
                JSONObject apiresult = (JSONObject) parser.parse(responseBody);
                JSONArray items = (JSONArray) apiresult.get("items");
                if(items != null && items.size() != 0) {
                    JSONObject item = (JSONObject) items.get(0);
                    image_url = (String) item.get("link");
                }
                System.out.println("result="+responseBody+"\n"+image_url);

                PlaceInfo infoObj = new PlaceInfo(i+(long)i,
                        (String)tmp.get("UPSO_NM"),
                        (String)tmp.get("COB_CODE_NM"),
                        (String)tmp.get("CRTFC_GBN_NM"),
                        (String)tmp.get("RDN_CODE_NM"),
                        (String)tmp.get("TEL_NO"),
                        (String)tmp.get("FOOD_MENU"),
                        (String)tmp.get("X_CNTS"),
                        (String)tmp.get("Y_DNTS"),
                        image_url
                );
                placeService.createPlaceInfo(infoObj);
            }

        }catch(Exception e) {
            e.printStackTrace();
        }

        return placeService.getAllPlaces();
    }

    /*
    @GetMapping("/api")
    public String load_save(@RequestParam("date") String date, Model model){
        String result = "";

        try {
            URL url = new URL("http://openapi.seoul.go.kr:8088/" + "41497a6663656b6634335950466b78/" +
                    "json/CrtfcUpsoInfo/500/1000");
            BufferedReader bf;
            bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
            result = bf.readLine();

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject)jsonParser.parse(result);
            JSONObject CrtfcUpsoInfo = (JSONObject)jsonObject.get("CrtfcUpsoInfo");
            Long totalCount=(Long)CrtfcUpsoInfo.get("list_total_count");

            JSONObject subResult = (JSONObject)CrtfcUpsoInfo.get("RESULT");
            JSONArray infoArr = (JSONArray) CrtfcUpsoInfo.get("row");

            for(int i=0;i<infoArr.size();i++){
                JSONObject tmp = (JSONObject)infoArr.get(i);
                if(!tmp.get("CRTFC_GBN").equals("14")) continue;


                //네이버 검색 api
                String clientId = "KWZO2nm_58J0kYLojjaw"; //애플리케이션 클라이언트 아이디값"
                String clientSecret = "TYZo36AIJQ"; //애플리케이션 클라이언트 시크릿값"

                String text = null;
                try {
                    text = URLEncoder.encode((String) tmp.get("UPSO_NM"), "UTF-8");
                } catch (UnsupportedEncodingException e) {
                    throw new RuntimeException("검색어 인코딩 실패",e);
                }

                String apiURL = "https://openapi.naver.com/v1/search/image?query=" + text;    // json 결과

                Map<String, String> requestHeaders = new HashMap<>();
                requestHeaders.put("X-Naver-Client-Id", clientId);
                requestHeaders.put("X-Naver-Client-Secret", clientSecret);
                String responseBody = ImageSearchApi.get(apiURL,requestHeaders);

                String image_url = "https://cdn.pixabay.com/photo/2020/08/05/13/27/eco-5465459_1280.png";
                JSONParser parser = new JSONParser();
                JSONObject apiresult = (JSONObject) parser.parse(responseBody);
                JSONArray items = (JSONArray) apiresult.get("items");
                if(items.size() != 0) {
                    JSONObject item = (JSONObject) items.get(0);
                    image_url = (String) item.get("link");
                }
                System.out.println("result="+responseBody+"\n"+image_url);

                PlaceInfo infoObj = new PlaceInfo(i+(long)i,
                        (String)tmp.get("UPSO_NM"),
                        (String)tmp.get("COB_CODE_NM"),
                        (String)tmp.get("CRTFC_GBN_NM"),
                        (String)tmp.get("RDN_CODE_NM"),
                        (String)tmp.get("TEL_NO"),
                        (String)tmp.get("FOOD_MENU"),
                        (String)tmp.get("X_CNTS"),
                        (String)tmp.get("Y_DNTS"),
                        image_url
                        );
                infoRepository.save(infoObj);
            }

        }catch(Exception e) {
            e.printStackTrace();
        }
        return "redirect:/findname";
    }
    */

}
