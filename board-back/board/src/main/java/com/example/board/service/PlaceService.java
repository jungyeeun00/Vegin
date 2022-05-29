package com.example.board.service;

import com.example.board.controller.ImageSearchApi;
import com.example.board.model.PlaceInfo;
import com.example.board.repository.PlaceInfoRepository;
import com.example.shop.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PlaceService {

    @Autowired
    PlaceInfoRepository placeInfoRepository;

    public List<PlaceInfo> getAllPlaces() {
        return placeInfoRepository.findAll();
    }

    public ResponseEntity<PlaceInfo> getPlace(Long no){
        PlaceInfo placeInfo = placeInfoRepository.findById(no).orElseThrow(()->new ResourceNotFoundException("Not exist Place Data by id : ["+no+"]"));
        return ResponseEntity.ok(placeInfo);
    }

    public int findcountUPSONM(String searchInput){
        return placeInfoRepository.countUPSONM(searchInput).intValue();
    }

    public PlaceInfo createPlaceInfo(PlaceInfo placeInfo){ return placeInfoRepository.save(placeInfo);}

    public int findAllCount() { return (int)placeInfoRepository.count(); }

}
