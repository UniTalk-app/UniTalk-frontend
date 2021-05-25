import * as React from "react";
import { IconButton,Avatar,Button,Box, Grid, GridSize, Typography} from "@material-ui/core";
import {
    Create as CreateIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon
} from "@material-ui/icons";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

type ThreadInfoProps = {
    firstColumnSize: boolean | GridSize,
    thread: Thread,
    handleOpenChat: () => void,
    setSelectedThread: (thread: Thread) => void,
    classes: ClassNameMap<"margin" | "small" | "buttonThread" | "dialogPaper">,
    handleOpenConfirmDelete: () => void,
}

const ThreadInfo : React.FC<ThreadInfoProps> = (props) => {
    const {
        firstColumnSize,
        thread,
        handleOpenChat,
        setSelectedThread,
        classes,
        handleOpenConfirmDelete: handleOpenConfirmDelete,
    } = props;

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
                                <Typography variant={"body2"}>{thread.lastReplyTimestamp}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body2"}>{thread.lastReplyTimestamp}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body2"}>10h</Typography>
                        </Grid>
                        <Grid item >
                            <IconButton onClick={(e) => {e.stopPropagation();}}>
                                <VisibilityIcon fontSize={"small"} />
                            </IconButton>
                            <IconButton onClick={(e) => {e.stopPropagation();}}>
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