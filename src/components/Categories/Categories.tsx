import * as React from "react";
import { 
    createStyles, 
    makeStyles, 
    Typography,
    Divider,
    Box,
    Button,
    TableContainer,
    Table,
    Tabs,
    TableRow
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles(() => createStyles({
    root: {
        marginTop: "80px",
        width: "100%",
        borderRadius:"10px",
    },
    table:{
        maxHeight:253,
    },
    tab:{
        width:"100%",
        height:"35px",
        justifyContent: "left",
        textTransform:"none",
        borderRadius: "8px",
        margin: "0 0 13px 0",
    }, 
}));

type CategListProps = {
    categories: Array<Category>
}

const Categories: React.FC<CategListProps> = (props) => {

    const {
        categories
    } = props;

    const plusClicked= () => {
        console.info("Plus clicked");
    };
    const classes = useStyles();

    return (
        <Box className={classes.root} bgcolor={"background.dp04"} >
            <Box display="flex"  height="57px" alignItems="center" justifyContent="center">
                <Box flexGrow={1} ml={3}>
                    <Typography variant="h6">Categories</Typography>
                </Box>
                <Box mr={2}>
                    <AddCircleIcon onClick={plusClicked}></AddCircleIcon>
                </Box>                
            </Box>
            <Divider />
            <Box>
                <TableContainer className={classes.table}>
                    <Table>
                        <Box m={2} >
                            <Tabs  orientation="vertical"  aria-label="Vertical tabs example"  style={{scrollbarColor:"transparent transparent"}}> 
                                {categories.map((categories) => (
                                    <TableRow key={categories.name}>
                                        <Button className={classes.tab}variant="outlined">{categories.name}</Button>
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
