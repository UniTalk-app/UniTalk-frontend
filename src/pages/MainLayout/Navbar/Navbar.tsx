import * as React from "react";
import {
    Typography, 
    AppBar, 
    Toolbar,
    createStyles, 
    makeStyles,
    Box,
    InputAdornment,
    Input
} from "@material-ui/core";
import { 
    Search as SearchIcon,
    FilterList as FilterListIcon
} from "@material-ui/icons";
import Drawer from "../../../components/Drawer/Drawer";
import Forms from "components/Forms";

import { useMainData } from "../../HomePage/store/StoreProvider";
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
    const {
        usergroups: usergroups,
    } = useMainData();
    return (
        <AppBar position="sticky" color="default">
            <Toolbar>
                <Drawer groups={usergroups()}/>
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
