import * as React from 'react';
import {Avatar, Box, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {
    Create as CreateIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon
} from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) => createStyles({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3)
    },
    margin: {
        marginRight: theme.spacing(0.3)
    }
}));

// waiting for backend
type dummyThread = {
    title: string,
    author: string,
    lastReply: string,
    replyTime: string,
    creationTime: string
}

type ThreadInfoProps = {
    firstColumnSize: any,
    thread: dummyThread
}

const ThreadInfo : React.FC<ThreadInfoProps> = (props) => {
    const {
        firstColumnSize,
        thread
    } = props;
    const classes = useStyles();

    return (
        <Box bgcolor={"background.dp02"} boxShadow={1} borderRadius={"borderRadius"} pl={1} pr={1} height={40} display="flex" justifyContent="center">
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
}

export default ThreadInfo;