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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ThreadService from "../../services/thread.service";

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
    })
);

const NewThreads: React.FC = () => {
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
        ThreadService.createThread({
            catId: 1,
            creationTimestamp: Date.now(),
            creatorId: 1,
            lastReplyAuthorId: 0,
            lastReplyTimestamp: Date.now(),
            title: info,
            groupId: 1
        });
        setOpen(!open);
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                size="small"
                onClick={() => {
                    trigger();
                }}
            >
                Create thread
            </Button>
            <Dialog
                open={open}
                onClose={trigger}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle>New thread</DialogTitle>
                <DialogContent>
                    <TextField
                        className={classes.txtField}
                        autoComplete="off"
                        id="name"
                        label="Name"
                        rowsMax={1}
                        variant="outlined"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={trigger} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={getInfo} color="primary" variant="contained">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NewThreads;
