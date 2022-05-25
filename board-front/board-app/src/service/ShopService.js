import axios from 'axios'; 

const SHOP_API_BASE_URL = "http://localhost:8080/shop-page";

class ProductService {

    getAllProducts(p_num) {
        return axios.get(SHOP_API_BASE_URL + "?p_num="+ p_num);
    }

    getProducts(category, searchInput, sort, p_num) {
        return axios.post(SHOP_API_BASE_URL + "/" + category + "?searchInput=" + searchInput +"&sort=" + sort + "&p_num=" + p_num,{}, { withCredentials: true });
        //return axios.post(SHOP_API_BASE_URL + "/" + category + "?searchInput=" + searchInput +"&" + "p_num=" + p_num,{}, { withCredentials: true });
       //return axios.get(SHOP_API_BASE_URL + "/" + category + "?searchInput=" + searchInput +"&" + "p_num=" + p_num);
    }

    getChoices(productId) {
        return axios.post(SHOP_API_BASE_URL + "/shop-detail-page/" + productId,{}, { withCredentials: true })
    }
}

export default new ProductService();