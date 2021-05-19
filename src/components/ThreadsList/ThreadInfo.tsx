import * as React from "react";
import { Dialog,Avatar, Box, createStyles, Grid, GridSize, makeStyles, Theme, Typography} from "@material-ui/core";
import {
    Create as CreateIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon
} from "@material-ui/icons";
import Chat from "../Chat/Chat";
import { Thread } from "store/store";

const useStyles = makeStyles((theme: Theme) => createStyles({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3)
    },
    margin: {
        marginRight: theme.spacing(0.3)
    },
    dialogPaper: {
        minHeight: "100vh",
        maxHeight: "100vh",
    },
    buttonThread: {
        width: "100%",
        height: "40px",
        display:"flex",
        backgroundColor:"background.dp02",
        padding: "1",
    },
    boxThread: {
        width: "100%",
        height: "40px",
        display:"flex",
        justifyContent:"center",
    },
}));

type ThreadInfoProps = {
    firstColumnSize: boolean | GridSize,
    thread: Thread
}

const ThreadInfo : React.FC<ThreadInfoProps> = (props) => {
    const {
        firstColumnSize,
        thread
    } = props;
    const classes = useStyles();

    //chat....
    const [open, setOpen] = React.useState(false);

    const trigger = (value: boolean) => {
        setOpen(value);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Box bgcolor={"background.dp02" } boxShadow={1} borderRadius={"borderRadius"} width={"100%"} height={"40px"} pl={1} pr={1} display={"flex"}
            justifyContent={"center"} onClick={() => {trigger(true);}}>
            <Grid container justify={"space-between"} alignItems={"center"}>
                <Grid item sm={firstColumnSize}>
                    <Typography variant={"body1"}>{thread.title}</Typography>
                </Grid>
                <Grid item>
                    <Box display="flex" alignItems="center">
                        <Avatar className={classes.small + " " + classes.margin}/>
                        <Typography variant={"body2"}>{thread.author}</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box display="flex" alignItems="center">
                        <Avatar className={classes.small + " " + classes.margin}/>
                        <Typography variant={"body2"}>{thread.lastReply}</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Typography variant={"body2"}>{thread.replyTime}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant={"body2"}>{thread.creationTime}</Typography>
                </Grid>
                <Grid item>
                    <VisibilityIcon fontSize={"small"} />
                    <CreateIcon fontSize={"small"} />
                    <DeleteIcon fontSize={"small"} />
                </Grid>
            </Grid>
            <Dialog
                className={ classes.dialogPaper}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
                fullWidth={true}
                maxWidth = {"md"}
                color={"background.dp02"}
            >
                <Chat onClose={handleClose} thread={thread}/>
            </Dialog>
        </Box>
    );
};

export default ThreadInfo;