import * as React from "react";
import {
    Dialog,
    DialogActions,
    Button,
    Typography,
    TextField,
    Container,
    makeStyles,
    Theme,
    createStyles,
    Grid,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CategoryService from "../../services/category.service";

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

const NewCategory: React.FC = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const trigger = () => {
        setOpen(!open);
    };

    const [info, setInfo] = React.useState("");
    const handleChange= (event:React.ChangeEvent<HTMLInputElement>) => {
        setInfo(event.target.value);
    };
    const getInfo = () => {
        // send data to backend
        console.log(info);
        CategoryService.createCategory({
            name: info,
            creationTimestamp: Date.now()
        });
        setOpen(!open);
    };

    return (
        <Container>
            <AddCircleIcon data-testid="new-category-btn" onClick={trigger}></AddCircleIcon>
            <Dialog
                open={open}
                onClose={trigger}
                aria-labelledby="form-dialog-title"
            >
                <DialogActions>
                    <Grid className={classes.padding}>
                        <Typography component="h5" variant="h5" className={classes.header}>
                        new category
                        </Typography>
                        <TextField
                            className={classes.txtField}
                            autoComplete="off"
                            id="name"
                            label="Name"
                            rowsMax={1}
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <Grid>
                            <Button onClick={trigger} color="primary">Cancel</Button>
                            <Button onClick={getInfo} variant="contained" color="primary">Confirm</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default NewCategory;
