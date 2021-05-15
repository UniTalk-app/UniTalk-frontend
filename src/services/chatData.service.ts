import axios from "axios";
import authHeader from "./auth-header";
import BackendAPI from "./backendAPI";

type Message = {
    content: string,
    sender: string,
    timestamp: string,
}

class ChatData {

    messages = async(id: number) =>{
        const headers = {
            ...authHeader()
        };

        const messageData = await axios.get(BackendAPI.getMessages(id), {
            headers
        });

        if(messageData.data._embedded ===undefined )
            return [];
        return messageData.data._embedded.messageDtoList;
    }
}

export default new ChatData();
