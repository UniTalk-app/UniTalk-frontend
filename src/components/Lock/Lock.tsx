import * as React from "react";
import {
    createStyles,
    Grid,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        center: {
            textAlign: "center",
            justifyContent:"center",
            alignContent:"center",
            marginTop: theme.spacing(10),
        },
        icon:{
            color: "#FFFFFF",
            opacity: 0.6,
            transform: "rotate(10deg)",
            fontSize: theme.spacing(60),
        },
        text:{
            color: "#FFFFFF",
            opacity: 0.6,
        },
        bold: {
            fontWeight: "bold",
        }
    })
);

const Lock: React.FC = () => {
    const classes = useStyles();
    return (
        <Grid container spacing={0} className={classes.center}>
            <Grid item  >
                <LockIcon className={classes.icon}/>
                <Typography component="p" className={classes.text} paragraph={true}>
                Sorry! You have no access to this page!
                </Typography>
                <Typography component="p" className={classes.text} paragraph={true}>
                    <span className={classes.bold}>Login </span>
                     to the website or 
                    <span className={classes.bold}> register.</span>
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Lock;
