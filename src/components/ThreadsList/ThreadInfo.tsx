import * as React from "react";
import { Avatar, Box, Grid, GridSize, Typography} from "@material-ui/core";
import { Container,Dialog,Avatar,Button,DialogActions,Box, createStyles, Grid, GridSize, makeStyles, Theme, Typography} from "@material-ui/core";
import {
    Create as CreateIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon
} from "@material-ui/icons";
import { Thread } from "store/store";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import Chat from "../Chat/Chat";

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
        height: "100%",
        padding: "1",
    },
}));

type ThreadInfoProps = {
    firstColumnSize: boolean | GridSize,
    thread: Thread,
    handleOpenChat: () => void,
    setSelectedThread: (thread: Thread) => void,
    classes: ClassNameMap<"margin" | "small">
}

const ThreadInfo : React.FC<ThreadInfoProps> = (props) => {
    const {
        firstColumnSize,
        thread,
        handleOpenChat,
        setSelectedThread,
        classes,
    } = props;

    return (
        <Box bgcolor={"background.dp02" } boxShadow={1} borderRadius={"borderRadius"} width={"100%"} height={"40px"} pl={1} pr={1} display={"flex"}
            justifyContent={"center"} onClick={() => {
                setSelectedThread(thread);
                handleOpenChat();
            }}>
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
    const classes = useStyles();

    //chat....
    const [open, setOpen] = React.useState(false);

    const trigger = () => {
        setOpen(!open);
    };


    return (
        <Box bgcolor={"background.dp02" } boxShadow={1} borderRadius={"borderRadius"} height={"40px"}>

            <Button
                size="small"
                onClick={() => {
                    trigger();
                }}
                className={classes.buttonThread}
            >
                <Box justifyContent={"center"} width={"100%"} display="flex">
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
                            <Typography variant={"body2"}>{thread.lastReply}</Typography>
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
            </Button>

            <Dialog
                className={ classes.dialogPaper}
                open={open}
                onClose={trigger}
                fullWidth={true}
                maxWidth = {"md"}

            >
                <Chat trigger={trigger} thread={thread}/>

            </Dialog>
        </Box>
    );
};

export default ThreadInfo;