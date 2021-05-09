import * as React from "react";
import { useEffect, useState } from "react";
import {
    Box,
    GridSize,
    Divider,
    Button,
    FormControlLabel,
    Checkbox,
    Typography,
    Container,
    makeStyles,
    Theme,
    createStyles,
    Grid,
    TextField
} from "@material-ui/core";
import { FormikErrors, Form, Field, Formik } from "formik";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            width:"100%"
        },
        header:{
            textAlign: "center",
        },
        grid:{
            alignItems: "center",
        },
        bold: {
            textAlign: "center",
            fontWeight: 600
        },
        messageBox:{
            overflowY: "scroll",
            overflowX: "auto",
            height: "330px",
        },
        image: {
            display: "block",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            width: "19%",
            textAlign: "center"
        }
    })
);

type ThreadProps =
{
    thread: Thread
}

interface FormValues
{
    content: string;
}

let bIsShiftDown=false;

const validate = (values: FormValues) =>
{
    const errors: FormikErrors<FormValues> = {};

    if (!values.content)
    {
        errors.content = "Required";
    }

    return errors;
};

let stompClient : any;
const Chat: React.FC<ThreadProps> = (props) =>
{
    const classes = useStyles();
    const {
        thread,
    } = props;

    useEffect(() => {
        connect();
    }, []);

    const connect = () => {
        const socket = new SockJS("http://localhost:8080/websocket");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        stompClient.subscribe(
            "/topic/room/" + thread.thread_id,
            onMessageReceived
        );
    };

    const onError = (err : any) => {
        console.log(err);
    };

    const onMessageReceived = (msg : any) => {
        console.log("received message");
    };

    const sendMessage = (msg : any) => {
        if (msg.trim() !== "")
        {
            const message = {
                content: msg,
                sender: "aaa",
                timestamp: new Date(),
            };
            stompClient.send("/chat/room/"+thread.thread_id, {}, JSON.stringify(message));
        }
    };

    return (
        <Box bgcolor={"background.dp02"}>

            <Box mt={1} pl={3} pr={3} pb={1} >
                <Grid container direction={"row"} spacing={1} className={classes.grid} >
                    <Grid item >
                        <Typography variant="h5" color="textPrimary" className={classes.header}>{thread.title} </Typography>
                    </Grid>
                    <Grid item >
                        <Typography variant={"caption"}  color={"textSecondary"} className={classes.header}>20.04.2021</Typography>
                    </Grid>
                </Grid>
            </Box>

            <Divider/>

            <Box mt={4} pl={4} pr={4} >
                <Grid container direction={"column"} spacing={1}>
                    <img  className={classes.image} src={process.env.PUBLIC_URL + "logo192.png"} />
                    <Typography variant={"h5"} className={classes.bold} >
                        Beginning of everything!
                    </Typography>

                    <Typography color="textSecondary" className={classes.header}>
                        Write Something!
                    </Typography>

                    <Divider />
                </Grid>
            </Box>

            <Box mt={1} pl={10} pr={10} className={classes.messageBox}>
                <Grid container direction={"column"} >

                    <Grid container direction={"row"} spacing={1} className={classes.grid} >
                        <Grid item >
                            <Typography variant={"body2"} color="textPrimary" className={classes.bold}>Msg sender</Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant={"caption"} color="textSecondary" className={classes.header}>msg timestamp</Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant={"body2"} color="textPrimary">
                                MSGCONTENT Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container direction={"row"} spacing={1} className={classes.grid} >
                        <Grid item >
                            <Typography variant={"body2"} color="textPrimary" className={classes.bold}>Msg sender</Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant={"caption"} color="textSecondary" className={classes.header}>msg timestamp</Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant={"body2"} color="textPrimary">
                                MSGCONTENT Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction={"row"} spacing={1} className={classes.grid} >
                        <Grid item >
                            <Typography variant={"body2"} color="textPrimary" className={classes.bold}>Msg sender</Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant={"caption"} color="textSecondary" className={classes.header}>msg timestamp</Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant={"body2"} color="textPrimary">
                                MSGCONTENT Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container direction={"row"} spacing={1} className={classes.grid} >
                        <Grid item >
                            <Typography variant={"body2"} color="textPrimary" className={classes.bold}>Msg sender</Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant={"caption"} color="textSecondary" className={classes.header}>msg timestamp</Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant={"body2"} color="textPrimary">
                                MSGCONTENT Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction={"row"} spacing={1} className={classes.grid} >
                        <Grid item >
                            <Typography variant={"body2"} color="textPrimary" className={classes.bold}>Msg sender</Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant={"caption"} color="textSecondary" className={classes.header}>msg timestamp</Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant={"body2"} color="textPrimary">
                                MSGCONTENT Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            <Box mt={10} pb={5} pl={5} pr={5}>
                <Formik
                    initialValues={{
                        content: "",
                    }}
                    validate={validate}
                    onSubmit={(values,actions) => {
                        sendMessage(values.content);
                        actions.resetForm();
                    }}
                >
                    {
                        (props) => (
                            <Form noValidate
                                onKeyDown={(e:any) => {
                                    if (e.key === "Shift"  ) {
                                        console.log("shift enter");
                                        bIsShiftDown=true;
                                    }
                                    if (e.key === "Enter" && bIsShiftDown === false) {
                                        e.preventDefault();
                                        props.handleSubmit();
                                        console.log("enter");
                                    }
                                }}
                                onKeyUp={(e:any)=>{
                                    if(e.key==="Shift"){
                                        bIsShiftDown=false;
                                    }
                                }}
                            >
                                <TextField
                                    className={classes.textField}
                                    id="content"
                                    label="Enter to send. Shift + Enter to add new line"
                                    name="content"
                                    autoComplete="content"
                                    onChange={props.handleChange}
                                    value={props.values.content}
                                    autoFocus
                                    multiline
                                    rows={4}
                                    variant="filled"
                                />

                            </Form>
                        )}
                </Formik>
            </Box>
        </Box>
    );
};

export default Chat;
