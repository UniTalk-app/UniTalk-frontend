import * as React from "react";
import MainDataService from "services/mainData.service";

const store: MainPageStoreData = {
    getData: MainDataService.getData,
    // we need to create functions here, because the MainDataService.categories & threads are immutable
    categories: () => MainDataService.categories,
    threads: () => MainDataService.threads,
    owngroups: () => MainDataService.owngroups,
    subscribeToServiceChange: MainDataService.subscribeToServiceChange
};

const Context = React.createContext<MainPageStoreData>(store);

export const StoreProvider: React.FC = ({children}) => {
    return (
        <Context.Provider value={store}>
            {children}
        </Context.Provider>
    );
};

export function useMainData(): MainPageStoreData{
    /**
     * 1) Bind to context
     */
    const ctx = React.useContext<MainPageStoreData>(Context);
    
    const [, forceRerender] = React.useState(true);
    React.useEffect(() => {
        /**
         * 2) Call endpoint for main page data
         */
        ctx.getData();
        /**
         * 3) Force rerender after data is invalidated
         */
        ctx.subscribeToServiceChange(() => forceRerender(p => !p));  
        /**
         * 4) Invalidate data every 30 minutes
         */
        const intervalValue = 30 * 60 * 1000;
        const id = setInterval(() => {
            ctx.getData();
            forceRerender(p => !p);   
        }, intervalValue);

        return () => {
            clearInterval(id);
        };
    }, []);

    return ctx;
}
