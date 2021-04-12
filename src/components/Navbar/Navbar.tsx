import * as React from "react";
import {
    Typography, 
    AppBar, 
    Toolbar,
    IconButton
} from "@material-ui/core";
import { 
    Menu as MenuIcon, 
} from "@material-ui/icons";

const Navbar: React.FC = () => {
    return (
        <AppBar position="sticky" color="default">
            <Toolbar>
                <IconButton edge="start" color="inherit">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5" noWrap>
            UniTalk
                </Typography>        
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
