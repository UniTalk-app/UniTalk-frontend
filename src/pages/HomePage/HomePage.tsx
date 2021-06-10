import * as React from "react";
import { 
    Box, 
    Container,
    makeStyles,
    createStyles
} from "@material-ui/core";
import ThreadsList from "../../components/ThreadsList";
import Categories from "components/Categories";
import Lock from "../../components/Lock";
import authHeader from "services/auth-header";
import { useStore } from "store/storeProvider";
import UsersTab from "components/UsersTab";


const useStyles = makeStyles(() => createStyles({
    mainBox: {
        display: "flex"
    }
}));

const compareMax = (a: Thread, b: Thread) : number => {
    const dateA = Math.max(Date.parse(a.lastReplyTimestamp) || 0, Date.parse(a.creationTimestamp));
    const dateB = Math.max(Date.parse(b.lastReplyTimestamp) || 0, Date.parse(b.creationTimestamp));
    return dateB - dateA;
};

const compareMin = (a: Thread, b: Thread) : number => {
    const dateA = Math.max(Date.parse(a.lastReplyTimestamp) || 0, Date.parse(a.creationTimestamp));
    const dateB = Math.max(Date.parse(b.lastReplyTimestamp) || 0, Date.parse(b.creationTimestamp));
    return dateA - dateB;
};


const HomePage: React.FC = () => {
    const loggedIn = authHeader();
    const classes = useStyles();
    const appData = useStore();

    const [currentCategory, setCurrentCategory] = React.useState(-1);
    const handleSetCurrentCategory = (id: number) => setCurrentCategory(id);

    const [sortingType, setSortingType] = React.useState(0);
    const handleSetSortingType = (id: number) => setSortingType(id);

    const getThreads = () : Thread[]  => {
        let threads = [...appData.threads];
        if (currentCategory != -1) {
            threads = threads.filter(t => t.categoryId == currentCategory);
        }

        threads = sortingType == 0 
            ? threads.sort(compareMax)
            : threads.sort(compareMin);

        return threads;
    };

    return (
        <>
            {(Object.keys(loggedIn).length === 0)?( 
                <Container className={classes.mainBox}>
                    <Lock/>
                </Container>
            ) : (
                <Container className={classes.mainBox}>
                    <Box width="20%">
                        <Categories categories={appData.categories} setCurrentCategory={handleSetCurrentCategory}/>
                        <Box mt={4}>
                            <UsersTab users={appData.users}/>
                        </Box>        
                    </Box>

                    <Box width="80%" m={10}>
                        <ThreadsList threads={getThreads()} setSortingType={handleSetSortingType}/>
                    </Box>
                </Container>
            )}
        </>
    );
};

export default HomePage;