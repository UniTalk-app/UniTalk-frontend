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

// Just for testing purpose
type dummyThread = {
    name: string,
    comments:string,
}

type ThreadsListProps = {
    latestthreads: Array<dummyThread>
}

const Categories: React.FC<ThreadsListProps> = (props) => {
    const {
        latestthreads
    } = props;
    
    const classes = useStyles();

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
                    {latestthreads.map((latestthreads) => (
                        <Box key={latestthreads.name}>
                            <ListItem alignItems="flex-start" >
                                <ListItemText
                                    primary={latestthreads.name}
                                    secondary={
                                        <>
                                            <ForumIcon style={{fontSize:"small", marginRight:"5px"}} />
                                            {latestthreads.comments+" comments"}
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
