import axios from "axios";
import authHeader from "./auth-header";
import BackendAPI from "./backendAPI";

class MainData {
    constructor(
        private __groups: Group[] = [],
        private __categories: Category[] = [], 
        private __threads: Thread[] = [],
    ){}

    getData = async (): Promise<void> => {
        try{
            this.__groups = await axios.get(BackendAPI.GROUP_ALL, {
                headers: authHeader()
            });
            this.__categories = await axios.get(BackendAPI.getCategories(this.__groups[0].id), {
                headers: authHeader()
            });
            this.__threads = await axios.get(BackendAPI.getThreads(this.__groups[0].id), {
                headers: authHeader()
            });
        } catch(err) {
            console.error(err);
        }
    }

    get groups() {
        return this.__groups;
    }

    get categories() {
        return this.__categories;
    }

    get threads() {
        return this.__threads;
    }
}

export default new MainData();
