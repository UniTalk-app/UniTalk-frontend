import * as React from "react";
import { Avatar, Box, Grid, GridSize, Typography} from "@material-ui/core";
import {
    Create as CreateIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon
} from "@material-ui/icons";
import { Thread } from "store/store";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

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
        </Box>
    );
};

export default ThreadInfo;