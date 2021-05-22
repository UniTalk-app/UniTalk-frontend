import * as React from "react";
import {
    Typography, 
    Grow,
    Dialog,
    AppBar, 
    Toolbar,
    createStyles, 
    makeStyles,
    Box,
    InputAdornment,
    Input,
    Avatar,
    Container,
    Badge,
    Theme,
    withStyles,
    IconButton,
    Button,
    Popper,
    MenuItem,
    MenuList,
    Paper,
    ClickAwayListener,
    Divider
} from "@material-ui/core";
import {  
    NotificationsActive as NotificationsActiveIcon,
    Search as SearchIcon,
    FilterList as FilterListIcon,
    AccountBox as AccountBoxIcon,
    Settings as SettingsIcon,
    ExitToApp as ExitToAppIcon,
} from "@material-ui/icons";
import authHeader from "services/auth-header";
import AuthService from "services/auth.service";
import Forms from "components/Forms";
import Drawer from "../../../components/Drawer/Drawer";
import UserProfile from "../../../components/UserProfile/UserProfile";

const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: "0 4px",
        },
    }),
)(Badge);

const useStyles = makeStyles((theme: Theme) => createStyles({
    authButtons: {
        marginLeft: "auto"
    },
    searchBar: {
        position: "absolute",
        left: "40%"
    },
    mainBox: {
        display: "flex"
    },
    avatar:{
        marginRight: theme.spacing(1),
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    list:{
        marginRight: theme.spacing(1),
    }
}));

const Navbar: React.FC = () => {
    const classes = useStyles();
    
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    const [openProfile, setOpenProfile] = React.useState(false);

    const trigger = () => {
        setOpenProfile(true);
    };

    const handleCloseProfile = () => {
        setOpenProfile(false);
    };

    const loggedIn = authHeader();
    return (
        <AppBar position="sticky" color="default">
            <Toolbar>
                <Drawer /> 
                <Typography variant="h5" noWrap>
            UniTalk
                </Typography>
                <Box className={classes.searchBar}>
                    <Input
                        placeholder="Search…"
                        startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                        endAdornment={<InputAdornment position="end"><FilterListIcon /></InputAdornment>}
                    />
                </Box>
                <Box className={classes.authButtons}>
                    {(Object.keys(loggedIn).length === 0)?( 
                        <Forms />  
                    ):(
                        <Container className={classes.mainBox}>
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={4} color="secondary">
                                    <NotificationsActiveIcon/>
                                </StyledBadge>
                            </IconButton>
                            <Button
                                ref={anchorRef}
                                aria-controls={open ? "menu-list-grow" : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                            >
                                <Avatar className={classes.avatar}>H</Avatar>
                            </Button>
                            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow {...TransitionProps} style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}>
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                    <MenuItem onClick={handleClose}><Avatar className={classes.avatar}>H</Avatar>rafi</MenuItem>
                                                    <Divider />
                                                    <MenuItem onClick={ (e) => {
                                                        handleClose(e);
                                                        trigger();
                                                    }}
                                                    ><AccountBoxIcon className={classes.list}/> See profile</MenuItem>
                                                    <MenuItem onClick={handleClose}><SettingsIcon className={classes.list}/>Settings</MenuItem>
                                                    <MenuItem onClick={(e) => {
                                                        AuthService.logout();
                                                        handleClose(e);
                                                        window.location.reload(false);
                                                    }}
                                                    ><ExitToAppIcon className={classes.list}/>Log out</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                            <Dialog
                                open={openProfile}
                                onClose={handleCloseProfile}
                                aria-labelledby="form-dialog-title"
                            >
                                <UserProfile/>
                            </Dialog>
                        </Container>
                    )}  
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
