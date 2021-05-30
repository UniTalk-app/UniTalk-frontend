import * as React from "react";
import {FormHelperText,DialogActions,Button,TextField,makeStyles, createStyles,DialogContent, Select,} from "@material-ui/core";
import threadService from "services/thread.service";
import { useSnackbar } from "notistack";
import { Form, Formik } from "formik";
import storeSubject from "store/store";
import * as Yup from "yup";

const useStyles = makeStyles(
    createStyles({
        combo: {
            width: "100%",
        }
    })
);

const validateSchema = Yup.object().shape({
    title: Yup.string()
        .min(1, "Too Short!")
        .max(128, "Too Long!")
        .required("Required"),
    category: Yup.string()
        .min(1, "Too Short!")
        .required("Required")
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
                title: "TTTIle new",
                category:"",
            }}
            validationSchema={validateSchema}
            onSubmit={(values) => {
                console.log(values);
                threadService.updateThread(threadId,values.title,values.category, handleClose, enqueueSnackbar);
            }}
        >
            {
                (props) => (
                    <Form noValidate>
                        <DialogContent>
                            <TextField
                                autoComplete="off"
                                id="title"
                                label="Title"
                                rowsMax={1}
                                color="primary"
                                variant="outlined"
                                onChange={props.handleChange}
                                inputProps={{
                                    maxLength:128,
                                }}
                                error={props.touched.title && props.errors.title ? true : false}
                                helperText={(props.touched.title && props.errors.title) ?? false}
                            />
                        </DialogContent>
                        <DialogContent>
                            <Select
                                variant="outlined"
                                className={classes.combo}
                                id="category"
                                name="category"
                                value={props.values.category}
                                open={openCombo}
                                onClose={handleSelectClose}
                                onOpen={handleSelectOpen}
                                onChange={props.handleChange}
                                error={props.touched.category && props.errors.category ? true : false}
                            >
                                {appData.categories.map(cat => (
                                    <option  key={cat.categoryId}
                                        value={cat.categoryId}>
                                        {cat.name}
                                    </option >
                                ))}

                            </Select>
                            {props.errors.category && props.touched.category ?
                                <FormHelperText error={true} >{props.errors.category}</FormHelperText> : null
                            }
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
