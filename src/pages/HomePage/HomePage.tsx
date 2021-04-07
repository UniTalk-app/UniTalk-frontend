import { Box } from '@material-ui/core';
import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThreadsList from '../../components/ThreadsList';

const HomePage: React.FC = () => {
    //const [ s, uS] = React.useState(0);

    return (
        <React.Fragment>
            <CssBaseline />
            <Box width="50%" m={10}>
                <ThreadsList threads={[
                    {title: "How to die successfully", author: "rafi", lastReply: "TrytianKurek", replyTime: "10h ago", creationTime: "1 day ago"},
                    {title: "How to die successfully", author: "rafi", lastReply: "TrytianKurek", replyTime: "10h ago", creationTime: "1 day ago"},
                    {title: "How to die successfully", author: "rafi", lastReply: "TrytianKurek", replyTime: "10h ago", creationTime: "1 day ago"}
                ]} />
            </Box>
        </React.Fragment>

    )
};

export default HomePage;