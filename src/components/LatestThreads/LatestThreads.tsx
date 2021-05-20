import * as React from "react";
import {
    createStyles,
    makeStyles,
    Typography,
    Divider,
    Box,
    List,
    ListItem,
    ListItemText
} from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";
import { Thread } from "store/store";

const useStyles = makeStyles(() => createStyles({
    root: {
        width: "100%",
        borderRadius:"10px",
    },
    middlebox: {
        width: "100%",
        maxHeight: "250px",
        overflowY:"scroll",
    },
}));


type ThreadsListProps = {
    latestthreads: Array<Thread>
}

const Categories: React.FC<ThreadsListProps> = (props) => {
    const {
        latestthreads
    } = props;
    const latestthreads2=[...latestthreads];
    const classes = useStyles();
  
    latestthreads2.sort(function(a, b) {
        return new Date(a.replyTime) < new Date(b.replyTime) ? 1 : -1;
    });

    return (
        <Box className={classes.root} bgcolor={"background.dp04"}>
            <Box display="flex"  height="57px" alignItems="center" justifyContent="center">
                <Box flexGrow={1} ml={3}>
                    <Typography variant="h6" >Latest threads</Typography>
                </Box>              
            </Box>
            <Divider />
            <Box className={classes.middlebox}>
                <List>
                    {latestthreads2.map((latestthreads2) => (
                        <Box key={latestthreads2.title}>
                            <ListItem alignItems="flex-start" >
                                <ListItemText
                                    primary={latestthreads2.title}
                                    secondary={
                                        <>
                                            <ForumIcon style={{fontSize:"small", marginRight:"5px"}} />
                                            {"0 comments"}
                                        </>
                                    }/>
                            </ListItem>
                            <Divider variant="middle"/> 
                        </Box>
                    ))}
                </List>
            </Box>
        </Box>
    );
};
export default Categories;
