import * as React from "react";
import { makeStyles,
    Box,
    IconButton,
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemText,
    Typography, 
    createStyles,   
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreateIcon from "@material-ui/icons/Create";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import GitHubIcon from "@material-ui/icons/GitHub";
import { 
    Menu as MenuIcon, 
} from "@material-ui/icons";

const useStyles = makeStyles(() => createStyles({
    list:{
        width: 275,
        display:"inline",
    },
    footer:{
        width:"100%",
        position: "absolute",
        bottom: "5%"
    }
}));

type GroupsListProps = {
    groups: Array<Group>
}

const TemporaryDrawer: React.FC <GroupsListProps> = (props)=>{
    const {
        groups
    } = props;
    
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false, 
    });

    const toggleDrawer = ( open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) { return;}

        setState({ ...state, ["left"]: open });
    };

    const list = () => (
        <Box
            className={classes.list}
            role="presentation"
            //onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Box>
                <Box flexGrow={1} ml={2} mt={2}>
                    <Typography variant="h6">Manage</Typography>
                </Box>
                <List>
                    <ListItem  button >
                        <ListItemText primary={"Create new group"} />
                        <Box mr={2}>{<AddCircleIcon />}</Box>
                    </ListItem>
                    <ListItem  button >
                        <ListItemText primary={"Edit groups"} />
                        <Box mr={2}>{<CreateIcon /> }</Box>
                    </ListItem>
                    <ListItem button >
                        <ListItemText primary={"Join new group"} />
                        <Box  mr={2}> { <CallReceivedIcon />}</Box> 
                    </ListItem>
                </List>
                <Divider />
                <Box flexGrow={1} ml={2} mt={2}>
                    <Typography variant="h6">Groups</Typography>
                </Box>
                <List>
                    {groups.map((groups) => (
                        <ListItem button key={groups.groupName}>
                            <Typography variant="body1">{groups.groupName}</Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box className={classes.footer}>
                <Divider />
                <List >
                    <ListItem >
                        <ListItemText secondary={"Open source projekt UniTalk"} />
                    </ListItem>
                    <ListItem >
                        <ListItemText
                            secondary={
                                <>
                                    {<GitHubIcon style={{fontSize:"medium",marginRight:"5px"}}/>}
                                    <a href="https://github.com/UniTalk-app" style={{textDecoration:"none",color:"inherit"}}> Our GitHub </a>
                                </>
                            }
                        />
                    </ListItem>
                </List>
            </Box>
        </Box>
    );

    return (
        <Box>
            <Box key={"left"}>
                <IconButton edge="start" color="inherit" onClick={toggleDrawer( true)}>
                    <MenuIcon/>
                </IconButton>
                <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer (false)}>
                    {list()}
                </Drawer>
            </Box>
        </Box>
    );
};
export default TemporaryDrawer;
