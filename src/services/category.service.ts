import axios from "axios";
import storeSubject from "store/store";
import authHeader from "./auth-header";
import BackendAPI from "./backendAPI";

class CategoryService {
    async createCategory(data: {name: string}) {
        const headers = {
            ...authHeader()
        };

        const response = await axios.post(BackendAPI.createCategory(storeSubject.getCurrentGroupId()) , data, { headers });
        return response;
    }

    async deleteCategory(categoryId: string, groupId: number) {
        const headers = {
            ...authHeader()
        };

        const response = await axios.delete(BackendAPI.deleteCategory(groupId, categoryId), { headers });
        return response;
    }
}

export default new CategoryService();