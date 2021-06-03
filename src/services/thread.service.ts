import axios from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import storeSubject from "store/store";
import authHeader from "./auth-header";
import BackendAPI from "./backendAPI";

class ThreadService {
    async createThread( data:{
        title: string,
        categoryId: number
    }, groupId: number){
        return await axios.post(BackendAPI.createThread(groupId), data, {headers: authHeader()});
    }

    private async deleteThreadRequest(threadId: number) {
        return await axios.delete(BackendAPI.deleteThread(storeSubject.getCurrentGroupId(), threadId), { headers: authHeader() });
    }

    public deleteThread(threadId: string, onClose: () => void, snackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey) {
        this.deleteThreadRequest(parseInt(threadId))
            .then(response => {
                if (response) {
                    snackbar(response.data.message || "Sukces", {variant: "success", anchorOrigin: {
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
