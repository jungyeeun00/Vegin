import axios from 'axios';

const RECIPE_BASE_URL = "http://localhost:8080/recipe-page"; 

class RecipeService {

    getRecipes(category, searchInput, p_num) {
        return axios.post(RECIPE_BASE_URL + "/" + category + "?searchInput=" + searchInput +"&" + "p_num=" + p_num, {}, { withCredentials: true})
    }

    getIngredients(id) {
        return axios.get(RECIPE_BASE_URL + "/ingre/" + id)
    }

    getSteps(id) {
        return axios.get(RECIPE_BASE_URL + "/step/" + id)
    }

    setViews(id) {
        return axios.post(RECIPE_BASE_URL + "/views/" + id, {}, { withCredentials: true })
    }

    getRecommend() {
        return axios.post(RECIPE_BASE_URL, {}, { withCredentials: true })
    }

    
}

export default new RecipeService();