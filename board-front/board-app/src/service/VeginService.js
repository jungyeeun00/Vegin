import axios from 'axios';

const RECIPE_BASE_URL = "http://localhost:8080/recipe-page"; 

class VeginService {
    // getRecipes() {
    //     return axios.get(RECIPE_BASE_URL);
    // }

    // getRecipes(p_num) {
    //     return axios.get(RECIPE_BASE_URL + "?p_num="+ p_num);
    // }

    // getRecipes(category, p_num) {
    //     return axios.get(RECIPE_BASE_URL + "/" + category + "?p_num=" + p_num);
    // }

    getRecipes(category, searchInput, p_num) {
        return axios.get(RECIPE_BASE_URL + "/" + category + "?searchInput=" + searchInput +"&" + "p_num=" + p_num);
    }

    getIngredients(id) {
        return axios.get(RECIPE_BASE_URL + "/ingre/" + id)
    }

    getSteps(id) {
        return axios.get(RECIPE_BASE_URL + "/step/" + id)
    }

    setViews(id) {
        return axios.get(RECIPE_BASE_URL + "/views/" + id)
    }
}

export default new VeginService();