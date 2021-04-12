import * as React from "react";
import {  createStyles, makeStyles, Typography,Divider,
    Box,Button,TableContainer,Table,Tabs,TableRow} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles(() => createStyles({
    root: {
        marginLeft:"100px",
        marginTop:"90px",
        height:"310px",
        width:"270px",
        border:"1px solid #7878a1",
        borderRadius:"5px",
    },
    table:{
        maxHeight:253,
    },
    tab:{
        width:"100%",
        height:"35px",
        justifyContent: "right",
        textTransform:"none",
        borderRadius: "8px",
        margin: "0 0 10px ",
    }, 
}));

const Categories: React.FC = () => {

    const createData = (name: string) => {
        return { name };
    };
    
    const rows = [  // temporarily, insted of database table
        createData("All"),
        createData("Linuxiarze"),
        createData("Nie widzę"),
        createData("Nie slyszę"),
        createData("Do...dzieła"),
        createData("Sesja depresja"),
        createData("Matlabowe świry 2"),
        createData("Goelodzy"),
    ];

    const plusClicked= () => {
        console.info("Plus clicked");
    };
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box display="flex" alignItems="center" height="57px" >
                <Box flexGrow={1} ml={2}>
                    <Typography variant="h6" >Categories</Typography>
                </Box>
                <Box mr={1}>
                    <AddCircleIcon onClick={plusClicked}></AddCircleIcon>
                </Box>                
            </Box>
            <Divider />
            <Box>
                <TableContainer className={classes.table}>
                    <Table>
                        <Box m={1} >
                            <Tabs orientation="vertical"  aria-label="Vertical tabs example"> 
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        <Button className={classes.tab}variant="outlined">{row.name}</Button>
                                    </TableRow>
                                ))}
                            </Tabs>
                        </Box>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};
export default Categories;
