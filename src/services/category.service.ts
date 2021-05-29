import axios from "axios";
import authHeader from "./auth-header";
import BackendAPI from "./backendAPI";

class CategoryService {
    async createCategory(data: {name: string, creationTimestamp: number}) {
        const headers = {
            ...authHeader()
        };

        const response = await axios.post(BackendAPI.createCategory(1) , data, { headers });
        return response;
    }

    async deleteCategory(categoryId: number, groupId: number) {
        const headers = {
            ...authHeader()
        };

        const response = await axios.delete(BackendAPI.deleteCategory(groupId, categoryId), { headers });
        return response;
    }
}

export default new CategoryService();