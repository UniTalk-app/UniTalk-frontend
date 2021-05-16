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
    Button, 
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreateIcon from "@material-ui/icons/Create";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import GitHubIcon from "@material-ui/icons/GitHub";
import { 
    ExitToApp,
    Menu as MenuIcon, 
} from "@material-ui/icons";
import JoinDialog from "./JoinDialog";
import { useMainData } from "../../pages/HomePage/store/StoreProvider";
import ConfirmDialog from "./ConfirmDialog";
import useForceUpdate from "../../hooks/ForceUpdate/ForceUpdate";

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


const TemporaryDrawer: React.FC = () => {    

    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false, 
    });
    const [openJoinDialog, setOpenJoinDialog] = React.useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const [groupIdToDelete, setGroupIdToDelete] = React.useState(-1);

    const {
        groups,
        getData
    } = useMainData();
    
    const forceUpdate = useForceUpdate();

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

    const handleOpenJoinDialog = () => {
        setOpenJoinDialog(true);
    };

    const handleCloseJoinDialog = () => {
        setOpenJoinDialog(false);
    };

    const handleOpenConfirmDialog = (groupId: number) => {
        setGroupIdToDelete(groupId);
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };

    const updateGroupsList = async () => {
        await getData();
    };
    
    React.useEffect(() => {
        updateGroupsList();
    });

    const list = () => (
        <Box
            className={classes.list}
            role="presentation"
            onKeyDown={toggleDrawer(false)}
        >
            <Box>
                <Box flexGrow={1} ml={2} mt={2}>
                    <Typography variant="h6">Manage</Typography>
                </Box>
                <List>
                    <ListItem button >
                        <ListItemText primary={"Create new group"} />
                        <Box mr={2} display="flex" justifyContent="center">{<AddCircleIcon />}</Box>
                    </ListItem>
                    <ListItem button >
                        <ListItemText primary={"Edit groups"} />
                        <Box mr={2} display="flex" justifyContent="center">{<CreateIcon /> }</Box>
                    </ListItem>
                    <ListItem button onClick={handleOpenJoinDialog}>
                        <ListItemText primary={"Join new group"} />
                        <Box  mr={2} display="flex" justifyContent="center"> { <CallReceivedIcon />}</Box> 
                    </ListItem>
                </List>
                <Divider />
                <Box flexGrow={1} ml={2} mt={2}>
                    <Typography variant="h6">Groups</Typography>
                </Box>
                <List>
                    {groups().map((group) => (
                        <Box display="flex" key={group.groupId}>
                            <ListItem button onClick={() => console.log(group.groupId)}>
                                <Typography variant="body1">{group.groupName}</Typography>
                            </ListItem>
                            <Button onClick={() => handleOpenConfirmDialog(group.groupId)}>
                                <ExitToApp />
                            </Button>
                        </Box>
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
            <JoinDialog open={openJoinDialog} onClose={handleCloseJoinDialog} forceUpdate={forceUpdate}/>   
            <ConfirmDialog open={openConfirmDialog} onClose={handleCloseConfirmDialog} groupId={groupIdToDelete} forceUpdate={forceUpdate}/>   
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
