import axios from "axios";
import authHeader from "./auth-header";
import BackendAPI from "./backendAPI";

class MainData {
    constructor(
        private __groups: Group[] = [],
        private __categories: Category[] = [], 
        private __threads: Thread[] = [],
        private __onChangeCb: () => void = () => { /* */ }
    ){}

    subscribeToServiceChange = (cb: () => void) => {
        this.__onChangeCb = cb;
    }

    getData = async (): Promise<void> => {
        try{
            const headers = {
                ...authHeader()
            };
            const groupData = await axios.get(BackendAPI.GROUP_ALL, {
                headers
            }); 
            
            this.__groups = groupData.data._embedded.groupList;

            if(this.__groups.length){
                const groupId = this.__groups[0].group_id;
                const categoriesData = await axios.get(BackendAPI.getCategories(groupId), {
                    headers
                }); 
                this.__categories = categoriesData.data._embedded.categoryList;
                
                const threadsData = await axios.get(BackendAPI.getThreads(groupId), {
                    headers
                });
                this.__threads = threadsData.data._embedded.threadList;

            }

            this.__onChangeCb && this.__onChangeCb();
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
