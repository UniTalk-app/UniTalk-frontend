import * as React from "react";
import storeSubject from "./store";

export const useStore = () : AppData => {
    const [appData, setAppData] = React.useState<AppData>({categories: [], groups: [], threads: [], users: [], username: ""});

    const onStoreUpdated = (appData: AppData) => {
        setAppData(appData);
    };

    React.useEffect(() => {
        storeSubject.subscribe(onStoreUpdated);
        return() => storeSubject.unsubscribe(onStoreUpdated);
    }, []);

    return appData;
};