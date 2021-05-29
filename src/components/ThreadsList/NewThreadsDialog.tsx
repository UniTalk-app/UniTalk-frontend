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
    const [categories, setCategories] = React.useState<string | number>("");
    const [openCombo, setOpenCombo] = React.useState(false);
    const appData = storeSubject.getAppData();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategories(event.target.value as string);
    };

    const handleClose = () => {
        setOpenCombo(false);
    };

    const handleOpen = () => {
        setOpenCombo(true);
    };
    
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
            ThreadService.createThread({
                catId: storeSubject.getCurrentCategory(),
                creationTimestamp: Date.now(),
                creatorId: 1,
                lastReplyAuthorId: 0,
                lastReplyTimestamp: Date.now(),
                title: values.name,
                groupId: storeSubject.currentGroupId<0? storeSubject.getAppData().groups[0].groupId : storeSubject.currentGroupId
            })
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
                    </DialogContent>
                    <DialogContent>
                        <FormControl variant="outlined" className={classes.combo}>
                            <InputLabel id="demo-simple-select-outlined-label">categories</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                open={openCombo}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={categories ? categories : ""}
                                onChange={handleChange}
                                label="categories"
                            >
                                <MenuItem  key={0} value="All">
                                    All
                                </MenuItem >
                                {appData.categories.map(cat => (
                                    <MenuItem  key={cat.name}
                                        value={cat.name}>
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
