import * as React from "react";
import {
    Typography, 
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
} from "@material-ui/core";
import {  
    NotificationsActive as NotificationsActiveIcon,
    Search as SearchIcon,
    FilterList as FilterListIcon
} from "@material-ui/icons";
import authHeader from "services/auth-header";

import Forms from "components/Forms";
import Drawer from "../../../components/Drawer/Drawer";

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
        left: theme.spacing(1),
        top: theme.spacing(1),
        width: theme.spacing(4),
        height: theme.spacing(4),
    }
}));

const Navbar: React.FC = () => {
    const classes = useStyles();
    
    return (
        <AppBar position="sticky" color="default">
            <Toolbar>
                <Drawer groups={[
                    {groupName:"gr1 INFS II",["group_id"]:1},{groupName:"gr2 INFS III",["group_id"]:2}
                ]}/> 
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
                    {authHeader()==={}?( 
                        <Forms />  
                    ):(
                        <Container className={classes.mainBox}>
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={4} color="secondary">
                                    <NotificationsActiveIcon/>
                                </StyledBadge>
                            </IconButton>
                            <Avatar className={classes.avatar}>H</Avatar>
                        </Container>
                    )}  
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
