import axios from 'axios';

const BOARD_API_BASE_URL = "http://localhost:8080/api/board";
const DIARY_API_BASE_URL = "http://localhost:8080/api/diary";

class BoardService{
    /*게시판*/
    getBoards(p_num){
        return axios.get(BOARD_API_BASE_URL+"?p_num="+p_num);
    }

    createBoard(board){
        return axios.post(BOARD_API_BASE_URL, board);
    }

    getOneBoard(no){
        return axios.get(BOARD_API_BASE_URL+"/"+no);
    }

    updateBoard(no, board){
        return axios.put(BOARD_API_BASE_URL+"/"+no, board);
    }

    deleteBoard(no){
        return axios.delete(BOARD_API_BASE_URL+"/"+no);
    }

    /*다이어리*/
    getDiarys(p_num){
        return axios.get(DIARY_API_BASE_URL+"?p_num="+p_num);
    }

    createDiary(diary){
        return axios.post(DIARY_API_BASE_URL, diary);
    }

    getOneDiary(no){
        return axios.get(DIARY_API_BASE_URL+"/"+no);
    }

    updateDiary(no, diary){
        return axios.put(DIARY_API_BASE_URL+"/"+no, diary);
    }

    deleteDiary(no){
        return axios.delete(DIARY_API_BASE_URL+"/"+no);
    }}

export default new BoardService();