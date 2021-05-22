import axios from "axios";
import authHeader from "services/auth-header";
import BackendAPI from "services/backendAPI";

class StoreSubject {
    private observers: StoreObserver[] = [];
    private appData: AppData = {categories: [], threads: [], groups: []};
    public currentGroupId = -1;

    constructor() {
        this.updateStore();
    }

    public getAppData() {return this.appData;}

    public subscribe(observer: StoreObserver) {
        this.observers.push(observer);
    }

    public unsubscribe(observer: StoreObserver) {
        this.observers = this.observers.filter(o => o !== observer);
    }

    public setCurrentGroupId(id: number) {
        if (this.currentGroupId !== id) {
            this.currentGroupId = id;
            this.updateStore();
        }
    }

    public async updateStore() {
        try {
            const headers = {
                ...authHeader()
            };
            
            const groupResponse = await axios.get(BackendAPI.GROUP_ALL, {headers});
            this.appData.groups = groupResponse.data;
    
            if (this.appData.groups.filter(g => g.groupId == this.currentGroupId).length != 0) {
                const categoriesResponse = await axios.get(BackendAPI.getCategories(this.currentGroupId), {headers});
                this.appData.categories = categoriesResponse.data._embedded.categoryList;
                
                const threadsResponse = await axios.get(BackendAPI.getThreads(this.currentGroupId), {headers});
                this.appData.threads = threadsResponse.data._embedded.threadList;
            }
            else {
                this.appData.categories = [];
                this.appData.threads = [];
            }
            
            this.notify({
                ...this.appData
            });
        } catch (e) {
            console.error(e);
        }
        
    }

    private notify(appData: AppData) {
        this.observers.forEach(observer => {
            observer(appData);
        });
    }
}

const storeSubject = new StoreSubject();

export default storeSubject;