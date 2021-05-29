import * as React from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import groupService from "services/group.service";


type CreateGroupDialogProps = {
    open: boolean;
    onClose: () => void;
}

const CreateGroupDialog : React.FC<CreateGroupDialogProps> = (props) => {
    const { open, onClose } = props;
    const { enqueueSnackbar } = useSnackbar();
    
    const formik = useFormik({
        initialValues: {
            name: ""
        },
        onSubmit: (values) => {
            groupService.createGroup(values)
                .then(response => {
                    if (response) {
                        enqueueSnackbar(response.data.message, {variant: "success", anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center",
                        },});
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
        }
    });


    return (
        <Dialog onClose={onClose} open={open}>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>Create new group</DialogTitle>
                <DialogContent>
                    <TextField
                        id="name"
                        name="name"
                        label="Group name"
                        color="primary"
                        variant="outlined"
                        onChange={formik.handleChange}
                        error={formik.touched.name && formik.errors.name ? true : false}
                        helperText={(formik.touched.name && formik.errors.name) ?? false}
                        autoFocus
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" variant="contained" type="submit">
                        Ok
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreateGroupDialog;