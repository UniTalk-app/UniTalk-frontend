import * as React from "react";
import { Box } from "@material-ui/core";
import ThreadsList from "../../components/ThreadsList";
import Categories from "components/Categories";

const HomePage: React.FC = () => {

    return (
        <>
            <Categories />
            <Box width="50%" m={10}>
                <ThreadsList threads={[
                    {title: "How to die successfully", author: "rafi", lastReply: "TrytianKurek", replyTime: "10h ago", creationTime: "1 day ago"},
                    {title: "How to die successfully", author: "rafi", lastReply: "TrytianKurek", replyTime: "10h ago", creationTime: "1 day ago"},
                    {title: "How to die successfully", author: "rafi", lastReply: "TrytianKurek", replyTime: "10h ago", creationTime: "1 day ago"}
                ]} />
            </Box>
        </>
    );
};

export default HomePage;