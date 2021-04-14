import * as React from "react";
import {
    Typography, 
    AppBar, 
    Toolbar,
    IconButton,
    createStyles, 
    makeStyles,
    Box
} from "@material-ui/core";
import { 
    Menu as MenuIcon, 
} from "@material-ui/icons";

import Forms from "components/Forms";

const useStyles = makeStyles(() => createStyles({
    authButtons: {
        marginLeft: "auto"
    }
}));

const Navbar: React.FC = () => {
    const classes = useStyles();
    return (
        <AppBar position="sticky" color="default">
            <Toolbar>
                <IconButton edge="start" color="inherit">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5" noWrap>
            UniTalk
                </Typography>
                <Box className={classes.authButtons}>
                    <Forms />    
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
