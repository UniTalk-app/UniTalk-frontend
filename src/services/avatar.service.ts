import axios from "axios";
import BackendAPI from "./backendAPI";
import authHeader from "./auth-header";

class AvatarService {
    async getAvatar(){
        try {
            const response = await axios.get(BackendAPI.userAvatar, { headers: authHeader() });
            
            return response;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new AvatarService();