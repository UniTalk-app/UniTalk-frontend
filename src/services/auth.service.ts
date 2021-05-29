import axios from "axios";
import Role from "store/role";
import storeSubject from "store/store";
import BackendAPI from "./backendAPI";
const API_URL = BackendAPI.AUTH;

class AuthService {
    constructor(
        private userInformation: UserInfo | null = null
    ){ }
    
    async login(data: { username: string; password: string }) {
        try {
            const response = await axios.post(API_URL + "login", data);
            if (response.data.token) {
                this.userInformation = response.data;
                localStorage.setItem("user", response.data.token);
                await storeSubject.updateStore();
            } else {
                this.userInformation = null;
            }

            return response.status;
        } catch (e) {
            console.log(e);
        }
    }

    logout() {
        localStorage.removeItem("user");
        this.userInformation = null;
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

    get isSuperUser(): boolean {
        return !!this.userInformation && ( 
            this.userInformation.roles.includes(Role.moderator) || this.userInformation.roles.includes(Role.admin)
        );
    }
}

export default new AuthService();
