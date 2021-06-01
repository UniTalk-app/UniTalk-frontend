type StoreObserver = (appData: AppData) => void;

type AppData = {
    categories: Category[];
    threads: Thread[]; 
    groups: Group[];
    users: UserInfo[];
}

type Thread = {
    threadId: string,
    title: string;
    author: string;
    lastReplyTimestamp: string;
    replyTime: string;
    creationTimestamp: string;
}

type Category = {
    categoryId: string;
    name: string;
    creationTime: string;
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