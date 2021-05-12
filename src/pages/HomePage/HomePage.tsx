import * as React from "react";
import { 
    Box, 
    Container,
    makeStyles,
    createStyles
} from "@material-ui/core";
import ThreadsList from "../../components/ThreadsList";
import Categories from "components/Categories";
import LatestThreads from "../../components/LatestThreads";
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
                    <Box mt={4}>
                        <LatestThreads  latestthreads={[
                            {name:"How to die succesfully", comments:"162"},{name:"Did you ever hear the tragedy of Darth Plagueis The Wise?",comments:"16"},
                            {name:"Juwenalia",comments:"143"}
                        ]} />
                    </Box>        
                </Box>

                <Box width="80%" m={10}>
                    <ThreadsList threads={threads()} />
                </Box>
            </Container>
        </StoreProvider>
    );
};

export default HomePage;