import axios from "axios";

const basePath = "http://localhost:8080/api/";

class CategoryService {
    async createCategory( data:{
        name: string,
        creationTimestamp: number
    }){
        try {
            const response = await axios.post(basePath + "group/1/category", data);

            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
}


export default new CategoryService();
