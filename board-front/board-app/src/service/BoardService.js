import axios from 'axios';

const BOARD_API_BASE_URL = "http://localhost:8080/api/board";
const DIARY_API_BASE_URL = "http://localhost:8080/api/diary";
const COMMENT_API_BASE_URL = "http://localhost:8080/comment";
const COMMENT_DIARY_API_BASE_URL = "http://localhost:8080/comment-diary";

class BoardService{
    /*게시판*/

    getAllBoards(){
        return axios.get(BOARD_API_BASE_URL+"/all");
    }

    getBoards(p_num){
        return axios.get(BOARD_API_BASE_URL+"?p_num="+p_num);
    }

    getBestBoards(){
        return axios.get(BOARD_API_BASE_URL+"/best");
    }

    getSearchBoards(search, p_num){
        return axios.get(BOARD_API_BASE_URL+"/search/?search=" + search + "&p_num=" + p_num);
    }

    setCounts(no){
        return axios.post(BOARD_API_BASE_URL+"/"+no);
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

    getAllDiarys(){
        return axios.get(DIARY_API_BASE_URL+"/all");
    }

    getDiarys(p_num, date){
        return axios.get(DIARY_API_BASE_URL+"?p_num="+p_num+"&date="+date);
    }
    
    getBestDiarys(){
        return axios.get(DIARY_API_BASE_URL+"/best");
    }

    getSearchDiarys(search, p_num){
        return axios.get(DIARY_API_BASE_URL+"/search/?search=" + search + "&p_num=" + p_num);
    }

    setDiaryCounts(no){
        return axios.post(DIARY_API_BASE_URL+"/"+no);
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
    }

    /* 자유게시판 댓글 */
    createComment(comment) {
        return axios.post(COMMENT_API_BASE_URL + "/add", comment, null);
    }

    updateComment(id, comment) {
        return axios.put(COMMENT_API_BASE_URL + "/update/" + id, comment, null);
    }

    getComments(no) {
        return axios.get(COMMENT_API_BASE_URL + "/list/" + no, null);
    }
    
    deleteComment(no, commentId) {
        return axios.delete(COMMENT_API_BASE_URL + "/delete/" + no + "/" + commentId, null);
    }

    /* 다이어리 댓글 */
    createDiaryComment(comment) {
        return axios.post(COMMENT_DIARY_API_BASE_URL + "/add", comment, null);
    }

    updateDiaryComment(id, comment) {
        return axios.put(COMMENT_DIARY_API_BASE_URL + "/update/" + id, comment, null);
    }

    getDiaryComments(no) {
        return axios.get(COMMENT_DIARY_API_BASE_URL + "/list/" + no, null);
    }
    
    deleteDiaryComment(no, commentId) {
        return axios.delete(COMMENT_DIARY_API_BASE_URL + "/delete/" + no + "/" + commentId, null);
    }

}

export default new BoardService();