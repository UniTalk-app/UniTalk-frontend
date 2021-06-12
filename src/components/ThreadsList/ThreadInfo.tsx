import * as React from "react";
import { IconButton, Button,Box, Grid, GridSize, Typography} from "@material-ui/core";
import {
    Create as CreateIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon
} from "@material-ui/icons";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import storeSubject from "store/store";

type ThreadInfoProps = {
    firstColumnSize: boolean | GridSize,
    thread: Thread,
    handleOpenChat: () => void,
    setSelectedThread: (thread: Thread) => void,
    classes: ClassNameMap<"margin" | "small" | "buttonThread" | "dialogPaper">,
    handleOpenConfirmDelete: () => void,
    handleOpenEditThread: () => void,
}

const ThreadInfo : React.FC<ThreadInfoProps> = (props) => {
    const {
        firstColumnSize,
        thread,
        handleOpenChat,
        setSelectedThread,
        classes,
        handleOpenConfirmDelete: handleOpenConfirmDelete,
        handleOpenEditThread: handleOpenEditThread,
    } = props;

    const GetFormattedDate = (dateString: string) : string => {
        const date = Date.parse(dateString);
        const now = new Date().getTime();
        if (isNaN(date)) {
            return "-";
        }

        if (now - date > 1000 * 60 * 60 * 24) { // > 24h
            return `${Math.round((now - date) / 1000 / 60 / 60 / 24)} days ago`;
        }
        else if (now - date > 1000 * 60 * 60) { // > 60m
            return `${Math.round((now - date) / 1000 / 60 / 60)}h ago`;
        }
        else if (now - date > 1000 * 60) { // > 1m
            return `${Math.round((now - date) / 1000 / 60)}m ago`;
        }
        
        return "1m ago";
    };

    return (
        <Box bgcolor={"background.dp02" } boxShadow={1} borderRadius={"borderRadius"} height={"40px"}>

            <Button
                size="small"
                onClick={() => {
                    setSelectedThread(thread);
                    handleOpenChat();
                }}
                className={classes.buttonThread}
                disableElevation
                component={Box}
            >
                <Box justifyContent={"center"} width={"100%"} display="flex" ml={2}>
                    <Grid container justify={"space-between"} alignItems={"center"}>
                        <Grid item sm={firstColumnSize}>
                            <Typography variant={"body1"}>{thread.title.length > 15 ? thread.title.slice(0, 15) + "..." : thread.title}</Typography>
                        </Grid>
                        <Grid item>
                            <Box display="flex" alignItems="center">
                                {/* <Avatar className={classes.small + " " + classes.margin}/> */}
                                <Typography variant={"body2"}>{storeSubject.getUsername(thread.creatorId)}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box display="flex" alignItems="center">
                                {/* <Avatar className={classes.small + " " + classes.margin}/> */}
                                <Typography variant={"body2"}>{storeSubject.getUsername(thread.lastReplyAuthorId)}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body2"}>{GetFormattedDate(thread.lastReplyTimestamp)}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body2"}>{GetFormattedDate(thread.creationTimestamp)}</Typography>
                        </Grid>
                        <Grid item >
                            <IconButton onClick={(e) => {e.stopPropagation();}}>
                                <VisibilityIcon fontSize={"small"} />
                            </IconButton>
                            <IconButton onClick={(e) => {e.stopPropagation();setSelectedThread(thread); handleOpenEditThread();}}>
                                <CreateIcon fontSize={"small"} />
                            </IconButton>
                            <IconButton onClick={(e) => {e.stopPropagation(); setSelectedThread(thread); handleOpenConfirmDelete();}}>
                                <DeleteIcon fontSize={"small"} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
            </Button>
        </Box>
    );
};

export default ThreadInfo;