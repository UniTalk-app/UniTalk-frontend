type StoreObserver = (appData: AppData) => void;

type AppData = {
    categories: Category[];
    threads: Thread[]; 
    groups: Group[];
}

type Thread = {
    threadId: string,
    title: string;
    author: string;
    lastReply: string;
    replyTime: string;
    creationTimestamp: string;
}

type Category = {
    categoryId: number;
    name: string;
    creationTime: string;
    threads: Thread[];
}

type Group = {
    groupId: number;
    groupName:string;
}

type UserInfo = {
    token: string;
    type: string;
    id: numberl
    username: string;
    email: string;
    roles: import("./role").default[];
}