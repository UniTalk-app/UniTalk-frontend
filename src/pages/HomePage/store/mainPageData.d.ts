type MainPageStoreData = {
    getData: () => void;
    categories: () => Category[];
    threads: () => Thread[]; 
    subscribeToServiceChange: (cb: () => void) => void;
}

type Thread = {
    title: string;
    author: string;
    lastReply: string;
    replyTime: string;
    creationTime: string;
}

type Category = {
    name: string;
    creationTime: string;
}

type Group = {
    ["group_id"]: number;
    groupName:string;
}
