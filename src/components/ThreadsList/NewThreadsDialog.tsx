import * as React from "react";
import {
    Dialog,
    DialogActions,
    Button,
    TextField,
    makeStyles,
    Theme,
    createStyles,
    DialogTitle,
    DialogContent,
    FormControl,
    Select,
    InputLabel,
    MenuItem
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ThreadService from "../../services/thread.service";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
import storeSubject from "store/store";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        padding: {
            //height: theme.spacing(45),
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
        combo: {
            width: "100%",
        }
    })
);

const NewThreads: React.FC = () => {
    const {enqueueSnackbar} = useSnackbar();
    const [categories, setCategories] = React.useState<number>(-1);
    const [openCombo, setOpenCombo] = React.useState(false);
    const appData = storeSubject.getAppData();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategories(event.target.value as number);
    };

    const handleClose = () => setOpenCombo(false);
    const handleOpen = () => setOpenCombo(true);
    
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
                .max(128)
                .trim()
        }),
        onSubmit: (values,actions) => {
            ThreadService.createThread({
                title: values.name.trim(),
                categoryId: categories
            }, storeSubject.getCurrentGroupId())
                .then(response => {
                    if (response) {
                        enqueueSnackbar("Added new thread!", {variant: "success", anchorOrigin: {
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
            actions.resetForm();
        }
    });

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                size="small"
                onClick={trigger}
            >
                Create thread
            </Button>
            <Dialog
                open={open}
                onClose={trigger}
                aria-labelledby="form-dialog-title"
            >
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>New thread</DialogTitle>
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
                        />
                        <FormControl variant="outlined" className={classes.combo}>
                            <InputLabel id="demo-simple-select-outlined-label">Categories</InputLabel>
                            <Select
                                labelId="category"
                                id="category"
                                open={openCombo}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={categories ? categories : ""}
                                onChange={handleChange}
                                label="categories"
                            >
                                <MenuItem  key={-1} value={-1}>
                                    None
                                </MenuItem>
                                {appData.categories.map(cat => (
                                    <MenuItem  key={cat.categoryId}
                                        value={cat.categoryId}>
                                        {cat.name}
                                    </MenuItem >
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={trigger} color="primary">Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">Confirm</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default NewThreads;
