import * as React from "react";
import {    Button,Dialog, DialogActions,Avatar, Box, createStyles, Grid, GridSize, makeStyles, Theme, Typography} from "@material-ui/core";
import {
    Create as CreateIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon
} from "@material-ui/icons";
import Chat from "../Chat/Chat";

const useStyles = makeStyles((theme: Theme) => createStyles({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3)
    },
    margin: {
        marginRight: theme.spacing(0.3)
    }
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
    const [chatFrom, setChatFrom] = React.useState(false);

    const trigger = (value: boolean) => {
        setChatFrom(value);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box bgcolor={"background.dp02"} boxShadow={1} borderRadius={"borderRadius"} pl={1} pr={1} height={40} display="flex" justifyContent="center">
            <Grid container justify={"space-between"} alignItems={"center"}>
                <Grid item sm={firstColumnSize}>

                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            trigger(true);
                        }}
                    >
                        <Typography variant={"body1"}>{thread.title}</Typography>
                    </Button>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="max-width-dialog-title"
                        fullWidth={true}
                        maxWidth = {"md"}
                        color={"background.dp02"}
                    >
                        <Chat thread={thread}/>
                    </Dialog>

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
        </Box>
    );
};

export default ThreadInfo;