import React from "react";
import {
    Box,
    Divider,
    Chip,
    Grid,
    Typography,
    GridSize,
} from "@material-ui/core";
import ThreadInfo from "./ThreadInfo";
import NewThreads from "../NewThread/NewThreads";
import { Thread } from "store/store";

type ThreadsListProps = {
  threads: Array<Thread>;
};

const ThreadsList: React.FC<ThreadsListProps> = (props) => {
    const { threads } = props;

    const firstColumnSize = 5;
    const headers = [
        "Author",
        "Last replied by",
        "Reply time",
        "Creation time",
        "Options",
    ];

  
    const headerElement = (
        sm: boolean | GridSize,
        color: "textPrimary" | "textSecondary",
        text: string
    ) => {
        return (
            <Grid item sm={sm}>
                <Typography variant={"caption"} color={color}>
                    {text}
                </Typography>
            </Grid>
        );
    };

    const latestChipClicked = () => {
        console.info("Latest chip clicked");
    };

    const oldestChipClicked = () => {
        console.info("Oldest chip clicked");
    };

    return (
        <Box>
            <Box display="flex" alignItems="center" mb={1.5}>
                <Box flexGrow={1}>
                    <Typography variant="h5">All</Typography>
                </Box>
                <Box>
                    <NewThreads/>
                </Box>
            </Box>
            <Divider />
            <Box mt={1.5}>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                        <Box>
                            <Typography variant={"caption"} color={"textSecondary"}>
                                {threads.length} threads
                            </Typography>
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
                    {headerElement(firstColumnSize, "textSecondary", "Title")}
                    {headers.map((text) => headerElement(false, "textSecondary", text))}
                </Grid>
            </Box>
            <Box mt={1}>
                <Grid container direction={"column"} spacing={1}>
                    {threads.map((value) => (
                        <Grid item key={value.threadId}>
                            {ThreadInfo({
                                firstColumnSize: firstColumnSize,
                                thread: value,
                            })}
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default ThreadsList;
