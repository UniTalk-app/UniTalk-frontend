import axios from "axios";
import authHeader from "./auth-header";
import BackendAPI from "./backendAPI";

class MainData {
    constructor(
        private __groups: Group[] = [],
        private __owngroups: Group[] = [],
        private __categories: Category[] = [], 
        private __threads: Thread[] = [],
        private __onChangeCb: () => void = () => { /* */ }
    ){}

    subscribeToServiceChange = (cb: () => void) => {
        this.__onChangeCb = cb;
    }

    getData = async (): Promise<void> => {
        try{
            const groupData = await axios.get(BackendAPI.GROUP_ALL, {
                headers: authHeader()
            }); 
            this.__groups = groupData.data._embedded.groupList;
            
            const ownGroups = await axios.get(BackendAPI.getGroups, {
                headers: authHeader()
            }); 
            this.__owngroups = ownGroups.data._embedded.groupList;

            if(this.__groups.length){
                const categoriesData = await axios.get(BackendAPI.getCategories(this.__groups[0].group_id), {
                    headers: authHeader()
                }); 
                this.__categories = categoriesData.data._embedded.categoryList;
                
                const threadsData = await axios.get(BackendAPI.getThreads(this.__groups[0].group_id), {
                    headers: authHeader()
                });
                this.__threads = threadsData.data._embedded.threadList;

            }

            if(this.__onChangeCb){
                this.__onChangeCb();
            }
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
    get owngroups(){
        return this.__owngroups;
    }
}

export default new MainData();
