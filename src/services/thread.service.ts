import axios from "axios";
import BackendAPI from "./backendAPI";

const basePath = "http://localhost:8080/api/";

class ThreadService {
    async createThread( data:{
        name: string,
        idGroup: number
    }){
        try {
            const response = await axios.post(basePath + "1/thread", data);

            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new ThreadService();