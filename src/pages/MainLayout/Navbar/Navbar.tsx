import * as React from "react";
import {
    Typography, 
    AppBar, 
    Toolbar,
    IconButton,
    createStyles, 
    makeStyles,
    Box,
    InputAdornment,
    Input
} from "@material-ui/core";
import { 
    Menu as MenuIcon, 
    Search as SearchIcon,
    FilterList as FilterListIcon
} from "@material-ui/icons";

import Forms from "components/Forms";

const useStyles = makeStyles(() => createStyles({
    authButtons: {
        marginLeft: "auto"
    },
    searchBar: {
        position: "absolute",
        left: "40%"
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
                <Box className={classes.searchBar}>
                    <Input
                        placeholder="Search…"
                        startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                        endAdornment={<InputAdornment position="end"><FilterListIcon /></InputAdornment>}
                    />
                </Box>
                <Box className={classes.authButtons}>
                    <Forms />    
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
