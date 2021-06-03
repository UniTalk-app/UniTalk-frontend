import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import * as React from "react";
import groupService from "services/group.service";
import * as Yup from "yup";

type CreateDialogProps = {
    open: boolean;
    onClose: () => void;
}

const CreateDialog : React.FC<CreateDialogProps> = (props) => {
    const { open, onClose } = props;
    const { enqueueSnackbar } = useSnackbar();
    const formik = useFormik({
        initialValues: {
            groupName: ""
        },
        validationSchema: Yup.object({
            groupName: Yup
                .string()
                .required()
        }),
        onSubmit: (values) => {
            groupService.createGroup(values.groupName, onClose, enqueueSnackbar);
        },
    });

    return (
        <Dialog onClose={onClose} open={open}>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>Create new group</DialogTitle>
                <DialogContent>
                    <TextField
                        id="groupName"
                        name="groupName"
                        label="Group name"
                        color="primary"
                        variant="outlined"
                        onChange={formik.handleChange}
                        error={formik.touched.groupName && formik.errors.groupName ? true : false}
                        helperText={(formik.touched.groupName && formik.errors.groupName) ?? false}
                        autoFocus
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" variant="contained" type="submit">
                        Create
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreateDialog;