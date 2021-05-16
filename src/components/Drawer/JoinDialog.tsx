import * as React from "react";
import * as Yup from "yup";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import groupService from "services/group.service";


type JoinDialogProps = {
    open: boolean;
    onClose: () => void;
    forceUpdate: () => void;
}

const JoinDialog : React.FC<JoinDialogProps> = (props) => {
    const {open, onClose, forceUpdate} = props;
    const { enqueueSnackbar } = useSnackbar();
    
    const formik = useFormik({
        initialValues: {
            id: 0
        },
        validationSchema: Yup.object({
            id: Yup
                .number()
                .required()
                .min(0)
        }),
        onSubmit: (values) => {
            groupService.joinGroup(values.id)
                .then(response => {
                    if (response) {
                        enqueueSnackbar(response.data.message, {variant: "success", anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center",
                        },});
                        forceUpdate();
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
                <DialogTitle>Join to new group</DialogTitle>
                <DialogContent>
                    <TextField
                        id="id"
                        name="id"
                        label="Group ID"
                        color="primary"
                        variant="outlined"
                        onChange={formik.handleChange}
                        error={formik.touched.id && formik.errors.id ? true : false}
                        helperText={(formik.touched.id && formik.errors.id) ?? false}
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

export default JoinDialog;