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

const useStyles = makeStyles(() => createStyles({
    mainBox: {
        display: "flex"
    }
}));

const HomePage: React.FC = () => {
    const classes = useStyles();
    return (
        <Container className={classes.mainBox}>
            <Box width="20%">
                <Categories categories={[
                    {name:"All",creationTime:"1 day ago"},  {name:"Linux",creationTime:"1 day ago"},
                    {name:"Course schedule (IS2)",creationTime:"1 day ago"},  {name:"WGGiOŚ",creationTime:"1 day ago"},
                    {name:"Course retake fee:(",creationTime:"1 day ago"}, {name:"How to die successfully",creationTime:"1 day ago"}
                ]}/>            
        
                <LatestThreads  latestthreads={[
                    {name:"How to die succesfully", comments:"162"},{name:"Did you ever hear the tragedy of Darth Plagueis The Wise?",comments:"16"},
                    {name:"Juwenalia",comments:"143"}
                ]} />
            </Box>
            <Box width="80%" m={10}>
                <ThreadsList threads={[
                    {title: "How to die successfully", author: "rafi", lastReply: "TrytianKurek", replyTime: "10h ago", creationTime: "1 day ago"},
                    {title: "How to die successfully", author: "rafi", lastReply: "TrytianKurek", replyTime: "10h ago", creationTime: "1 day ago"},
                    {title: "How to die successfully", author: "rafi", lastReply: "TrytianKurek", replyTime: "10h ago", creationTime: "1 day ago"}
                ]} />
            </Box>
        </Container>
    );
};

export default HomePage;