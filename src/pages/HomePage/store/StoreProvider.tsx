import * as React from "react";
import MainDataService from "services/mainData.service";

/**
 * We don't want to overcomplicate things for now.
 * I think that we should avoid using reducer, and for the MVP
 * just create a simple structure of getters to receive data from global state.
 */
const store: MainPageStoreData = {
    getData: MainDataService.getData,
    categories: () => MainDataService.categories,
    threads: () => MainDataService.threads,
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

// Might wanna improve the naming, useMainData is not so descriptive
export function useMainData(): MainPageStoreData{
    const ctx = React.useContext<MainPageStoreData>(Context);
    // We want to force the rerender of components
    const [_, forceRerender] = React.useState(true);
    React.useEffect(() => {
        ctx.getData();
        ctx.subscribeToServiceChange(() => forceRerender(p => !p));
        // we invalidate data every 30 minutes
        const id = setInterval(() => {
            ctx.getData();
            forceRerender(p => !p);   
        }, 30 * 60 * 1000);

        return () => {
            clearInterval(id);
        };
    }, []);

    return ctx;
}
