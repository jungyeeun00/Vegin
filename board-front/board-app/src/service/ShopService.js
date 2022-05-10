import axios from 'axios'; 

const SHOP_API_BASE_URL = "http://localhost:8080/shop-page";

class ProductService {

    getAllProducts(p_num) {
        //return axios.get(SHOP_API_BASE_URL);
        return axios.get(SHOP_API_BASE_URL + "?p_num="+ p_num);
    }

    // getProducts(category, p_num) {
    //     return axios.get(SHOP_API_BASE_URL + "/" + category + "?p_num=" + p_num);
    // }

    getProducts(category, searchInput, p_num) {
        return axios.get(SHOP_API_BASE_URL + "/" + category + "?searchInput=" + searchInput +"&" + "p_num=" + p_num);
    }

    getChoices(productId) {
        return axios.get(SHOP_API_BASE_URL + "/shop-detail-page/" + productId)
    }

}

export default new ProductService();