import axios from "axios";
import authHeader from "services/auth-header";
import BackendAPI from "services/backendAPI";

class StoreSubject {
    private observers: StoreObserver[] = [];
    private appData: AppData = {categories: [], groups: [], threads: [], users: [], username: ""};
    public currentGroupId = Number(localStorage.getItem("selectedGroup")) || -1;

    constructor() {
        this.updateStore();
    }

    public getAppData() {return this.appData;}
    public getCurrentGroupId() {return this.currentGroupId;}
    public getCurrentGroupName() {return this.appData.groups.find(g => g.groupId == this.currentGroupId)?.groupName;}

    public subscribe(observer: StoreObserver) {
        this.observers.push(observer);
    }

    public unsubscribe(observer: StoreObserver) {
        this.observers = this.observers.filter(o => o !== observer);
    }

    public setCurrentGroupId(id: number) {
        if (this.currentGroupId !== id) {
            this.currentGroupId = id;
            localStorage.setItem("selectedGroup", String(id));
            this.updateStore();
        }
    }

    public getUsername(id: number) {
        const user = this.appData.users.filter(u => u.id == id)[0];
        return user ? user.username : "-";
    }

    public async updateStore() {
        try {
            const headers = {
                ...authHeader()
            };
            const userInfoResponse = await axios.get(BackendAPI.getUserInfo(), {headers});
            this.appData.username = userInfoResponse.data[0].username;
            
            const groupResponse = await axios.get(BackendAPI.GROUP_ALL, {headers});
            this.appData.groups = groupResponse.data;
            console.log(userInfoResponse);
    
            if (this.appData.groups.filter(g => g.groupId == this.currentGroupId).length != 0) {
                const categoriesResponse = await axios.get(BackendAPI.getCategories(this.currentGroupId), {headers});
                this.appData.categories = categoriesResponse.data._embedded?.categoryList || [];
                const threadsResponse = await axios.get(BackendAPI.getThreads(this.currentGroupId), {headers});
                this.appData.threads = threadsResponse.data._embedded?.threadList || [];
                const usersResponse = await axios.get(BackendAPI.getUsersInGroup(this.currentGroupId), {headers});
                this.appData.users = usersResponse.data || [];
            }
            else {
                this.appData.categories = [];
                this.appData.threads = [];
                this.appData.users = [];
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