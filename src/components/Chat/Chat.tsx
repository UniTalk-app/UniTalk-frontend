import * as React from "react";
import { useEffect, useState } from "react";
import {
    Button,
    FormControlLabel,
    Checkbox,
    Typography,
    Container,
    makeStyles,
    Theme,
    createStyles,
    Grid
} from "@material-ui/core";
import { FormikErrors, Form, Field, Formik } from "formik";
import ChatService from "services/chat.service";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        big: {
            width: theme.spacing(35),
            height: theme.spacing(35),
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: theme.spacing(3),
            padding: theme.spacing(3),
        },
        margin: {
            marginRight: theme.spacing(3),
            height: theme.spacing(3),
            width:"100%"
        },
        textField: {
            marginBottom: theme.spacing(3),
            height: theme.spacing(3),
            width:"100%"
        },
        header:{
            textAlign: "center",
            marginTop: theme.spacing(1),
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
        thread
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
        <Container>

            <Typography component="h1" variant="h3" className={classes.header}>
                {thread.title}
            </Typography>

            <Grid container direction={"column"} spacing={1}>

            </Grid>

            <Formik
                initialValues={{
                    content: "",
                }}
                validate={validate}
                onSubmit={(values) => {
                    sendMessage(values.content);
                }}
            >
                {
                    (props) => (
                        <Form noValidate onSubmit={props.handleSubmit} className={classes.big}>
                            <Field
                                className={classes.textField}

                                variant="outlined"
                                required
                                id="content"
                                label="Content"
                                name="content"
                                autoComplete="content"
                                onChange={props.handleChange}
                                value={props.values.content}
                                autoFocus
                            />

                            <Button type="submit" fullWidth variant="contained" color="primary">
                               Send Message
                            </Button>

                        </Form>
                    )}
            </Formik>
        </Container>
    );
};

export default Chat;
