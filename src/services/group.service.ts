import axios from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import storeSubject from "store/store";
import authHeader from "./auth-header";
import BackendAPI from "./backendAPI";

class GroupService {
    async joinGroup(groupId: number) {
        const response = await axios.get(BackendAPI.joinGroup(groupId) , { headers: authHeader() });
        return response;
    }

    async leaveGroup(groupId: number) {
        const response = await axios.get(BackendAPI.leaveGroup(groupId) , { headers: authHeader() });
        return response;
    }

    private async createGroupRequest(data: {name: string}) {
        return await axios.post(BackendAPI.createGroup(), data, { headers: authHeader() });
    }

    public createGroup(name: string, onClose: () => void, snackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey) {
        this.createGroupRequest({name: name})
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

export default new GroupService();