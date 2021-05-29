import * as React from "react";
import {
    Dialog,
    DialogActions,
    Button,
    TextField,
    Container,
    makeStyles,
    Theme,
    createStyles,
    DialogTitle,
    DialogContent,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CategoryService from "../../services/category.service";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
import storeSubject from "store/store";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        padding: {
            margin: theme.spacing(5),
        },
        header: {
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: theme.spacing(2),
        },
        txtField: {
            width: "100%",
            marginBottom: theme.spacing(2),
        },
        input: {
            minHeight: theme.spacing(20),
        },
    })
);

const NewCategoryDialog: React.FC = () => {
    const {enqueueSnackbar} = useSnackbar();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const trigger = () => {
        setOpen(!open);
    };

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .required()
                .min(1)
        }),
        onSubmit: (values) => {
            console.log(values);
            CategoryService.createCategory({
                name: values.name
            })
                .then(response => {
                    if (response) {
                        enqueueSnackbar("Added new category!", {variant: "success", anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center",
                        },});
                        storeSubject.updateStore();
                        trigger();
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
        <Container>
            <AddCircleIcon data-testid="new-category-btn" onClick={trigger}></AddCircleIcon>
            <Dialog
                open={open}
                onClose={trigger}
                aria-labelledby="form-dialog-title"
            >
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>new category</DialogTitle>
                    <DialogContent>
                        <TextField
                            className={classes.txtField}
                            autoComplete="off"
                            id="name"
                            label="Name"
                            rowsMax={1}
                            color="primary"
                            variant="outlined"
                            onChange={formik.handleChange}
                            error={formik.touched.name && formik.errors.name ? true : false}
                            helperText={(formik.touched.name && formik.errors.name) ?? false}
                            autoFocus
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={trigger} color="primary">Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">Confirm</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
};

export default NewCategoryDialog;
