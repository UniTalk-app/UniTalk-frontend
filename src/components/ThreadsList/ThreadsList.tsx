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
            <Box mt={1} pl={1}>
                <Grid container spacing={2} justify={"space-between"}>
                    <Grid item sm={5}>
                        <Typography variant={"caption"} color={"textSecondary"}>Title</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} color={"textSecondary"}>Author</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} color={"textSecondary"}>Last replied by</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} color={"textSecondary"}>Reply time</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} color={"textSecondary"}>Creation time</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} color={"textSecondary"}>Options</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={1}>
                <Grid container direction={"column"} spacing={1}>
                    {threads.map(value =>
                        <Grid item>{ThreadInfo(value)}</Grid>
                    )}
                </Grid>
            </Box>
        </Box>
        
    )
};

export default ThreadsList;