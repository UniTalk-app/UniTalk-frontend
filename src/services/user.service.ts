import axios from "axios";
import authHeader from "./auth-header";
import BackendAPI from "./backendAPI";

const API_URL = BackendAPI.TEST;

class UserService {
    getUserBoard() {
        return axios.get(API_URL + "user", { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + "admin", { headers: authHeader() });
    }
}

export default new UserService();