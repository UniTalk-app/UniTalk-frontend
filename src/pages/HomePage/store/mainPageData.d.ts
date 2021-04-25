type MainPageStoreData = {
    getData: () => void;
    categories: () => Category[];
    threads: () => Thread[]; 
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
    id: number;
}
