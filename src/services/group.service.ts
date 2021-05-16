import axios from "axios";
import authHeader from "./auth-header";
import BackendAPI from "./backendAPI";

class GroupService {
    async joinGroup(groupId: number) {
        const response = await axios.get(BackendAPI.joinGroup(groupId) , { headers: authHeader() });
        return response;
    }

    async leaveGroup(groupId: number) {
        const response = await axios.get(BackendAPI.leaveGroup(groupId) , { headers: authHeader() });
        return response;
    }
}

export default new GroupService();