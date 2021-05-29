import axios from "axios";
import authHeader from "services/auth-header";
import BackendAPI from "services/backendAPI";

class StoreSubject {
    private observers: StoreObserver[] = [];
    private appData: AppData = {categories: [], threads: [], groups: []};
    public currentGroupId = Number(localStorage.getItem("selectedGroup")) || -1;
    public currentCategoryId = Number(localStorage.getItem("selectedCategory")) || -1;

    constructor() {
        this.updateStore();
    }

    public getAppData() {return this.appData;}

    public getCurrentGroupId() {return this.currentGroupId;}

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
    public setCurrentCategoryId(id: number) {
        if (this.currentCategoryId !== id) {
            this.currentCategoryId = id;
            localStorage.setItem("selectedCategory", String(id));
            this.updateStore();
        }
    }
    public getCurrentCategory(){
        return this.currentCategoryId<0? this.appData.categories[0].categoryId : this.currentCategoryId;
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
                
                if(this.currentCategoryId < 0){
                    const threadsResponse = await axios.get(BackendAPI.getThreads(this.currentGroupId), {headers});
                    this.appData.threads = threadsResponse.data._embedded.threadList;
                }
                else{
                    console.log(this.currentCategoryId);
                    const categ = this.appData.categories.find((el)=>el.categoryId===this.currentCategoryId);
                    console.log(categ);
                    this.appData.threads=categ?.threads || [];
                }
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