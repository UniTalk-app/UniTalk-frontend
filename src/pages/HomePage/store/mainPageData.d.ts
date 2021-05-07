type MainPageStoreData = {
    getData: () => void;
    categories: () => Category[];
    threads: () => Thread[]; 
    subscribeToServiceChange: (cb: () => void) => void;
}

type Thread = {
    thread_id: string,
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
}
