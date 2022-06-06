import axios from 'axios'; 

const SHOP_API_BASE_URL = "http://localhost:8080/shop-page";
const REVIEW_API_BASE_URL = "http://localhost:8080/review";
const INQUIRY_API_BASE_URL = "http://localhost:8080/inquiry";

class ProductService {

    getAllProducts(p_num) {
        return axios.get(SHOP_API_BASE_URL + "?p_num="+ p_num);
    }

    getProducts(category, searchInput, sort, p_num) {
        return axios.post(SHOP_API_BASE_URL + "/" + category + "?searchInput=" + searchInput +"&sort=" + sort + "&p_num=" + p_num,{}, { withCredentials: true });
    }

    setLike(memberId, productId) {
        return axios.get(SHOP_API_BASE_URL + "?memberId=" + memberId +"&productId=" + productId)
    }

    setUnlike(memberId, productId) {
        return axios.delete(SHOP_API_BASE_URL + "?memberId=" + memberId +"&productId=" + productId)
    }

    getLikeId(category, memberId) {
        return axios.get(SHOP_API_BASE_URL +  "/" + category + "?memberId=" + memberId)
    }

    getChoices(productId) {
        return axios.post(SHOP_API_BASE_URL + "/shop-detail-page/" + productId,{}, { withCredentials: true })
    }

    getRecommend() {
        return axios.post(SHOP_API_BASE_URL ,{}, { withCredentials: true })
    }

    getFeatured() {
        return axios.get(SHOP_API_BASE_URL + "/featured")
    }

    getReviews(productId) {
        return axios.get(REVIEW_API_BASE_URL + "/list/" + productId)
    }

    createReview(review) {
        return axios.post(REVIEW_API_BASE_URL + "/add", review)
    }

    updateReview(reviewId, review) {
        return axios.put(REVIEW_API_BASE_URL + "/update/" + reviewId, review);
    }

    deleteReview(productId, reviewId) {
        return axios.delete(REVIEW_API_BASE_URL + "/delete/" + productId + "/" + reviewId);
    }
    
    getInquirys(productId) {
        return axios.get(INQUIRY_API_BASE_URL + "/list/" + productId)
    }

    createInquiry(inquiry) {
        return axios.post(INQUIRY_API_BASE_URL + "/add", inquiry)
    }

    updateInquiry(inquiryId, inquiry) {
        return axios.put(INQUIRY_API_BASE_URL + "/update/" + inquiryId, inquiry);
    }

    deleteInquiry(productId, inquiryId) {
        return axios.delete(INQUIRY_API_BASE_URL + "/delete/" + productId + "/" + inquiryId);
    }

}

export default new ProductService();