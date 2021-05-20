import * as React from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { useSnackbar } from "notistack";
import groupService from "services/group.service";
import storeSubject from "store/store";


type ConfirmDialogProps = {
    open: boolean;
    onClose: () => void;
    groupId: number;
}

const ConfirmDialog : React.FC<ConfirmDialogProps> = (props) => {
    const {open, onClose, groupId} = props;
    const { enqueueSnackbar } = useSnackbar();

    const leaveGroup = () => {
        groupService.leaveGroup(groupId)
            .then(response => {
                if (response) {
                    enqueueSnackbar(response.data.message, {variant: "success", anchorOrigin: {
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
                enqueueSnackbar(message, {variant: "error", anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                },});
            });
    };
    
    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Confirm action</DialogTitle>
            <DialogContent>Are you sure you want to leave group?</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button color="secondary" variant="contained" onClick={leaveGroup}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;