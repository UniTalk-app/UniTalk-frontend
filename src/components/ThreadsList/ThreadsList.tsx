import React from 'react';
import {Box, Divider, Button, Chip, Grid, Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ThreadInfo from "./ThreadInfo";

// Just for testing purpose
type dummyThread = {
    title: string,
    author: string,
    lastReply: string,
    replyTime: string,
    creationTime: string
}

type ThreadsListProps = {
    threads: Array<dummyThread>
}

const ThreadsList : React.FC<ThreadsListProps> = (props) => {
    const {
        threads
    } = props;

    const firstColumnSize = 5;
    const headers = [
        "Author",
        "Last replied by",
        "Reply time",
        "Creation time",
        "Options"
    ];

    const headerElement = (sm: any, variant: any, color: any, text: string) => {
        return (
            <Grid item sm={sm}>
                <Typography variant={variant} color={color}>{text}</Typography>
            </Grid>
        )
    }

    const latestChipClicked = () => {
        console.info("Latest chip clicked");
    }

    const oldestChipClicked = () => {
        console.info("Oldest chip clicked");
    }

    return (
        <Box>
            <Box display="flex" alignItems="center" mb={1.5} >
                <Box flexGrow={1}>
                    <Typography variant="h5">All</Typography>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        size="small"
                    >
                        Create thread
                    </Button>
                </Box>
            </Box>
            <Divider />
            <Box mt={1.5}>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                        <Box>
                            <Typography variant={"caption"} color={"textSecondary"}>{threads.length} threads</Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Chip
                            variant="outlined"
                            size="small"
                            label="Latest"
                            color="primary"
                            onClick={latestChipClicked}
                        />
                    </Grid>
                    <Grid item>
                        <Chip
                            variant="outlined"
                            size="small"
                            label="Oldest"
                            color="primary"
                            onClick={oldestChipClicked}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box mt={1} pl={1} pr={1}>
                <Grid container spacing={2} justify={"space-between"}>
                    {headerElement(firstColumnSize, "caption", "textSecondary", "Title")}
                    {headers.map(text => headerElement(false, "caption", "textSecondary", text))}
                </Grid>
            </Box>
            <Box mt={1}>
                <Grid container direction={"column"} spacing={1}>
                    {threads.map(value => <Grid item>{ThreadInfo({firstColumnSize: firstColumnSize, thread: value})}</Grid>)}
                </Grid>
            </Box>
        </Box>
        
    )
};

export default ThreadsList;