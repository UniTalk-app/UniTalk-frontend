import axios from "axios";
import BackendAPI from "./backendAPI";
const basePath = "http://localhost:8080/api/";

class ThreadService {
    async createThread( data:{
        catId: number,
        creationTimestamp:number,
        creatorId: number,
        lastReplyAuthorId: number,
        lastReplyTimestamp: number,
        title: string,
        groupId: number
    }){
        try {
            const response = await axios.post(BackendAPI.createThread(data.groupId), data);
            
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new ThreadService();
