import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

class AuthService {
    async login(data: { email: string; password: string }) {
        try {
            const response = await axios.post(API_URL + "login", data);

            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(data: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
        return axios.post(API_URL + "register", data);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user") || "{}");
    }
}

export default new AuthService();
