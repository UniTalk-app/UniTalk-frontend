import axios from "axios";
import authHeader from "./auth-header";
import BackendAPI from "./backendAPI";

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
            const headers = {
                ...authHeader()
            };

            const response = await axios.post(BackendAPI.createThread(data.groupId), data, {headers});
            
            return response;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new ThreadService();
