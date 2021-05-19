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
import Lock from "../../components/Lock";
import authHeader from "services/auth-header";
import { useStore } from "store/storeProvider";


const useStyles = makeStyles(() => createStyles({
    mainBox: {
        display: "flex"
    }
}));



const HomePage: React.FC = () => {
    const loggedIn = authHeader();
    const classes = useStyles();
    const appData = useStore();

    return (
        <>
            {(Object.keys(loggedIn).length === 0)?( 
                <Container className={classes.mainBox}>
                    <Lock/>
                </Container>
            ) : (
                <Container className={classes.mainBox}>
                    <Box width="20%">
                        <Categories categories={appData.categories}/>
                        <Box mt={4}>
                            <LatestThreads  latestthreads={[
                                {name:"How to die succesfully", comments:"162"},{name:"Did you ever hear the tragedy of Darth Plagueis The Wise?",comments:"16"},
                                {name:"Juwenalia",comments:"143"}
                            ]} />
                        </Box>        
                    </Box>

                    <Box width="80%" m={10}>
                        <ThreadsList threads={appData.threads}/>
                    </Box>
                </Container>
            )}
        </>
    );
};

export default HomePage;