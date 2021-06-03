import { Avatar, Box, createStyles, Divider, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import * as React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        user: {
            "&:hover": {
                cursor: "pointer",
            },
        }
    })
);


type UsersTabProps = {
    users: UserInfo[]
};

const UsersTab : React.FC<UsersTabProps> = (props) => {
    const {
        users
    } = props;

    const classes = useStyles();

    return (
        <Box bgcolor={"background.dp04"} boxShadow={1} borderRadius={"borderRadius"}>
            <Box display="flex" alignItems="center" height={57} pl={3}>
                <Typography variant="h6">Users</Typography>
            </Box>
            <Divider />
            <Box p={2} maxHeight="200px" overflow="auto">
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    {users.map(user => 
                        <Grid item key={user.id}>
                            <Box display="flex" alignItems="center" className={classes.user}>
                                <Avatar className={classes.small}/>
                                <Box ml={1}>
                                    <Typography variant="body1">{user.username}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    );
};

export default UsersTab;