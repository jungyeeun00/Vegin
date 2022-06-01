package com.example.board.service;

import com.example.board.exception.ResourceNotFoundException;
import com.example.board.model.Board;
import com.example.board.repository.BoardRepository;
import com.example.board.util.PagingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public int findAllCount(){
        return (int)boardRepository.count();
    }

    public ResponseEntity<Map> getPagingBoard(Integer p_num) {
        Map result = null;

        PagingUtil pu = new PagingUtil(p_num, 10, 5);
        List<Board> list = boardRepository.findFromTo(pu.getObjectStartNum(), pu.getObjectCountPerPage());
        pu.setObjectCountTotal(findAllCount());
        pu.setCalcForPaging();

        System.out.println("p_num : " + p_num);
        System.out.println(pu.toString());

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

//    public List<Board> getAllBoard() {
//        return boardRepository.findAll();
//    }

    public Board createBoard(Board board) { return boardRepository.save(board); }

    public ResponseEntity<Board> getBoard(Integer no) {
        Board board = boardRepository.findById(no)
                .orElseThrow(()->new ResourceNotFoundException("Not exist Board Data by no : ["+no+"]"));
        return ResponseEntity.ok(board);
    }

    public ResponseEntity<Board> updateBoard(Integer no, Board updatedBoard) {
        Board board = boardRepository.findById(no)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : [" + no + "]"));
        board.setType(updatedBoard.getType());
        board.setTitle(updatedBoard.getTitle());
        board.setContents(updatedBoard.getContents());
        board.setUpdatedTime(new Date());

        Board endUpdatedBoard = boardRepository.save(board);
        return ResponseEntity.ok(endUpdatedBoard);
    }

    public ResponseEntity<Map<String, Boolean>> deleteBoard(Integer no) {
        Board board = boardRepository.findById(no)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : [" + no + "]"));

        boardRepository.delete(board);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted Board Data by id : [" + no + "]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
