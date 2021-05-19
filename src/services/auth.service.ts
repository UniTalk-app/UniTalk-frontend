import axios from "axios";
import storeSubject from "store/store";
import BackendAPI from "./backendAPI";
const API_URL = BackendAPI.AUTH;

class AuthService {
    async login(data: { username: string; password: string }) {
        try {
            const response = await axios.post(API_URL + "login", data);
            if (response.data.token) {
                localStorage.setItem("user", response.data.token);
                await storeSubject.updateStore();
            }

            return response.status;
        } catch (e) {
            console.log(e);
        }
    }

    logout() {
        localStorage.removeItem("user");
    }

    async register(data: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
        try {
            const response = await axios.post(API_URL + "register", data);
            
            return response.status;
            
        } catch (e) {
            console.log(e);
        }
    }
}

export default new AuthService();
