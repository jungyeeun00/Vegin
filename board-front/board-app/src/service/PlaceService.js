import axios from 'axios';

const PLACE_API_BASE_URL = "http://localhost:8080/place-page/map";

class PlaceService{
    getPlaces(){
        return axios.get(PLACE_API_BASE_URL);
    }

    getOnePlace(no){
        return axios.get(PLACE_API_BASE_URL+"/"+no);
    }

}

export default new PlaceService();