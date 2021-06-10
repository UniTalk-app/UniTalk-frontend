import * as React from "react";
import {Theme,FormControl,InputLabel,MenuItem,FormHelperText,DialogActions,Button,TextField,makeStyles, createStyles,DialogContent, Select,} from "@material-ui/core";
import threadService from "services/thread.service";
import { useSnackbar } from "notistack";
import { Form, Formik } from "formik";
import storeSubject from "store/store";
import * as Yup from "yup";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        combo: {
            width: "100%",
        },
        txtField: {
            width: "100%",
            marginBottom: theme.spacing(2),
        },
    })
);

const validateSchema = Yup.object().shape({
    title: Yup.string()
        .required("Required!")
        .min(1, "Too Short!")
        .max(128, "Too Long!"),
    category: Yup.string()
        .required("Required!")
        .min(1, "Too Short!")
});

type EditThreadDialogProps = {
    threadId: string,
    handleClose: () => void,
}

const EditThreadForm: React.FC<EditThreadDialogProps> = (props) => {
    const {
        threadId,
        handleClose,
    } = props;

    const {enqueueSnackbar} = useSnackbar();
    const [openCombo, setOpenCombo] = React.useState(false);
    const appData = storeSubject.getAppData();
    const classes = useStyles();

    const handleSelectClose = () => {
        setOpenCombo(false);
    };
    const handleSelectOpen = () => {
        setOpenCombo(true);
    };

    return (
        <Formik
            initialValues={{
                title: "",
                category:"None",
            }}
            validationSchema={validateSchema}
            onSubmit={(values,actions) => {
                threadService.updateThread(threadId,values.title.trim(),values.category, handleClose, enqueueSnackbar);
                actions.resetForm();
            }}
        >
            {
                (props) => (
                    <Form noValidate>
                        <DialogContent>
                            <TextField
                                className={classes.txtField}
                                autoComplete="off"
                                id="title"
                                label="Name"
                                color="primary"
                                variant="outlined"
                                onChange={props.handleChange}
                                inputProps={{
                                    maxLength:128,
                                }}
                                error={props.touched.title && props.errors.title ? true : false}
                                helperText={(props.touched.title && props.errors.title) ?? false}
                            />
                            <FormControl variant="outlined" className={classes.combo}>
                                <InputLabel>Categories</InputLabel>
                                <Select
                                    id="category"
                                    name="category"
                                    value={props.values.category}
                                    open={openCombo}
                                    onClose={handleSelectClose}
                                    onOpen={handleSelectOpen}
                                    onChange={props.handleChange}
                                    error={props.touched.category && props.errors.category ? true : false}
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
                                {props.errors.category && props.touched.category ?
                                    <FormHelperText error={true} >{props.errors.category}</FormHelperText> : null
                                }
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel </Button>
                            <Button type="submit" color="primary" variant="contained" > Yes </Button>
                        </DialogActions>
                    </Form>
                )}
        </Formik>
    );
};

export default EditThreadForm;
