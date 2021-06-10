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
import {
    Delete as DeleteIcon,
} from "@material-ui/icons";
import { useSnackbar } from "notistack";

import storeSubject from "store/store";
import CategoryService from "services/category.service";
import AuthService from "services/auth.service";

import NewCategoryDialog from "./NewCategoryDialog";

const useStyles = makeStyles(() => createStyles({
    root: {
        marginTop: "80px",
        width: "100%",
        borderRadius: "10px",
    },
    table: {
        maxHeight: 253,
    },
    tab: {
        width: "100%",
        height: "35px",
        justifyContent: "left",
        textTransform: "none",
        borderRadius: "8px",
        margin: "0 0 13px 0",
    },
    buttonNew: {
        height: "23px",
    },
    deleteIcon: {
        position: "absolute",
        right: "3px",
        zIndex: 5,
        padding: "6px 0",
        minWidth: "35px",
    }
}));

type CategListProps = {
    categories: Array<Category>,
    setCurrentCategory: (id: number) => void;
}

const Categories: React.FC<CategListProps> = (props) => {

    const {
        categories,
        setCurrentCategory
    } = props;

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const onDeleteCategory = async (catId: string) => {
        if (!confirm("Are you sure?")) return;
        const showSnackbar = (isError = false) => {
            enqueueSnackbar(
                isError ? "Error while deleting categories!" : "Category deleted!",
                {
                    variant: isError ? "error" : "success",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                    }
                });
        };
        try {
            await CategoryService.deleteCategory(catId, storeSubject.currentGroupId);
            showSnackbar();
            storeSubject.updateStore();
        } catch (e) {
            showSnackbar(true);
        }
    };

    return (
        <Box className={classes.root} bgcolor={"background.dp04"} >
            <Box display="flex" height="57px" alignItems="center" justifyContent="center">
                <Box flexGrow={1} ml={3}>
                    <Typography variant="h6">Categories</Typography>
                </Box>
                <Box className={`${classes.buttonNew}`}>
                    <NewCategoryDialog />
                </Box>
            </Box>
            <Divider />
            <Box>
                <TableContainer className={classes.table}>
                    <Table>
                        <Box m={1.5} >
                            <Tabs orientation="vertical" aria-label="Categories" style={{ scrollbarColor: "transparent transparent" }}>
                                <TableRow>
                                    <Button className={classes.tab} variant="outlined" onClick={() => setCurrentCategory(-1)}>
                                        <Typography variant="body1">All</Typography>
                                    </Button>
                                </TableRow>
                                {categories.map((cat) => (
                                    <TableRow key={cat.categoryId}>
                                        <Button className={classes.tab} variant="outlined" onClick={() => setCurrentCategory(Number(cat.categoryId))}>
                                            <Typography variant="body1">{cat.name}</Typography>
                                        </Button>
                                        {
                                            AuthService.isSuperUser && (
                                                <Button className={classes.deleteIcon} onClick={() => onDeleteCategory(cat.categoryId)}>
                                                    <DeleteIcon />
                                                </Button>)
                                        }
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
