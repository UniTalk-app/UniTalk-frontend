import axios from "axios";
import BackendAPI from "./backendAPI";
import authHeader from "./auth-header";

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
            const response = await axios.post(BackendAPI.createThread(data.groupId), data, { headers: authHeader() });
            
            return response;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new ThreadService();
