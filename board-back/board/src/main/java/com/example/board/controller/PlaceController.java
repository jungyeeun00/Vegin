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


    /* 모든 음식점 정보 불러오기 */
    @GetMapping("/map")
    public List<PlaceInfo> getAllPlaces(){
        return placeService.getAllPlaces();
    }

}
