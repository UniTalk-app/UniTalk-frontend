import * as React from "react";
import { 
    Box, 
    Container,
    makeStyles,
    createStyles
} from "@material-ui/core";
import ThreadsList from "../../components/ThreadsList";
import Categories from "components/Categories";
import { StoreProvider, useMainData } from "./store/StoreProvider";

const useStyles = makeStyles(() => createStyles({
    mainBox: {
        display: "flex"
    }
}));

const HomePage: React.FC = () => {
    const classes = useStyles();
    const {
        threads,
        categories
    } = useMainData();
    return (
        <StoreProvider>
            <Container className={classes.mainBox}>
                <Box width="20%">
                    <Categories categories={categories()}/>            
                </Box>
                <Box width="80%" m={10}>
                    <ThreadsList threads={threads()} />
                </Box>
            </Container>
        </StoreProvider>
    );
};

export default HomePage;