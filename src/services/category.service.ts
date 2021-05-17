import axios from "axios";
import authHeader from "./auth-header";
import BackendAPI from "./backendAPI";

class CategoryService {
    async createCategory(data: {name: string, creationTimestamp: number}) {
        const response = await axios.post(BackendAPI.createCategory(1) , data, { headers: authHeader() });
        console.log(response);
        return response;
    }
}

export default new CategoryService();