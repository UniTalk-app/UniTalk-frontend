import axios from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import storeSubject from "store/store";
import authHeader from "./auth-header";
import BackendAPI from "./backendAPI";

class ThreadService {
    async createThread( data:{
        catId: number,
        creationTimestamp:number,
        creatorId: number,
        lastReplyAuthorId: number,
        lastReplyTimestamp: number,
        title: string,
        groupId: number
    }){
        try {
            const headers = {
                ...authHeader()
            };

            const response = await axios.post(BackendAPI.createThread(data.groupId), data, {headers});
            
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    private async deleteThreadRequest(threadId: number) {
        return await axios.delete(BackendAPI.deleteThread(storeSubject.getCurrentGroupId(), threadId), { headers: authHeader() });
    }

    public deleteThread(threadId: string, onClose: () => void, snackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey) {
        this.deleteThreadRequest(parseInt(threadId))
            .then(response => {
                if (response) {
                    snackbar(response.data.message, {variant: "success", anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                    },});
                    storeSubject.updateStore();
                    onClose();
                }
            })
            .catch(error => {
                let message = "Unknown error";
                if (error.response) {
                    message = error.response.data.message;
                }
                snackbar(message, {variant: "error", anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                },});
            });
    }
}

export default new ThreadService();
