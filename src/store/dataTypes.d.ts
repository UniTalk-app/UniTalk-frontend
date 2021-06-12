type StoreObserver = (appData: AppData) => void;

type AppData = {
    categories: Category[];
    threads: Thread[]; 
    groups: Group[];
    users: UserInfo[];
    username: string;
}

type Thread = {
    threadId: string;
    title: string;
    creatorId: number;
    lastReplyTimestamp: string;
    lastReplyAuthorId: number;
    creationTimestamp: string;
    categoryId: number;
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