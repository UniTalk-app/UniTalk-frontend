import React from 'react';
import {Avatar, Box, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';


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
    title: string,
    author: string,
    lastReply: string,
    replyTime: string,
    creationTime: string
}

const ThreadInfo : React.FC<ThreadInfoProps> = (props) => {
    const {
        title,
        author,
        lastReply,
        replyTime,
        creationTime
    } = props;
    const classes = useStyles();

    return (
        <Box bgcolor={"background.dp02"} boxShadow={1} borderRadius={"borderRadius"} pl={1} pr={1} height={40} display="flex" justifyContent="center">
            <Grid container justify={"space-between"} alignItems={"center"}>
                <Grid item sm={5}>
                    <Typography variant={"body1"}>{title}</Typography>
                </Grid>
                <Grid item>
                    <Box display="flex">
                        <Avatar className={classes.small + " " + classes.margin}/>
                        <Typography variant={"body2"}>{author}</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box display="flex">
                        <Avatar className={classes.small + " " + classes.margin}/>
                        <Typography variant={"body2"}>{lastReply}</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Typography variant={"body2"}>{replyTime}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant={"body2"}>{creationTime}</Typography>
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