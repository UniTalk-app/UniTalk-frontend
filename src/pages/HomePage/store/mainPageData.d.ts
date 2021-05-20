type MainPageStoreData = {
    getData: () => void;
    categories: () => Category[];
    threads: () => Thread[]; 
    groups: () => Group[];
    subscribeToServiceChange: (cb: () => void) => void;
}

type Thread = {
    threadId: string,
    title: string;
    author: string;
    lastReply: string;
    lastReplyTimestamp: string;
    creationTime: string;
}

type Category = {
    name: string;
    creationTime: string;
}

type Group = {
    groupId: number;
    groupName:string;
}
