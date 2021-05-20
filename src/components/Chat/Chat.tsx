import * as React from "react";
import { useEffect, useState, KeyboardEvent } from "react";
import {
    Box,
    Divider,
    Button,
    Typography,
    makeStyles,
    createStyles,
    Grid,
    TextField,
} from "@material-ui/core";
import { FormikErrors, Form, Formik } from "formik";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ChatService from "services/chatData.service";
import ScrollableFeed from "react-scrollable-feed";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BackendAPI from "services/backendAPI";

const useStyles = makeStyles(() =>
    createStyles({
        textField: {
            width: "100%"
        },
        header: {
            textAlign: "center",
        },
        grid: {
            alignItems: "center",
        },
        bold: {
            textAlign: "center",
            fontWeight: 600
        },
        messageBox: {
            height: "590px",
        },
        image: {
            display: "block",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            width: "50%",
            textAlign: "center"
        },
        message: {
            wordWrap: "break-word",
            width: "700px",
            whiteSpace: "pre-line",
            paddingLeft: 20,
        }
    })
);

type ChatProps = {
    onClose: () => void,
    threadId: string,
    threadTitle: string
}

type Message = {
    content: string,
    senderUsername: string,
    sendingTimestamp: string,
}

interface FormValues {
    content: string;
}

let bIsShiftDown = false;

const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.content) {
        errors.content = "Required";
    }

    return errors;
};

let stompClient: Stomp.Client;
let socket: WebSocket;

const Chat: React.FC<ChatProps> = (props) => {
    const classes = useStyles();
    const {
        onClose,
        threadId,
        threadTitle
    } = props;
    const [messages, setMessages] = useState([] as Array<Message>);

    useEffect(() => {
        connect();
        loadMessages();

        return function cleanup() {
            stompClient.disconnect(onDisconnect);
            socket.close();
        };
    }, []);

    const connect = () => {
        socket = new SockJS(BackendAPI.WEB_SOCKET);
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, (error) => console.log(error));
    };

    const onConnected = () => {
        stompClient.subscribe(
            "/topic/room/" + threadId,
            onMessageReceived
        );
    };

    const onDisconnect = () => {
        console.log("Disconnected");
    };

    const onMessageReceived = (msg: Stomp.Frame) => {
        console.log(msg);
        const date = new Date(JSON.parse(msg.body).sendingTimestamp);
        const dateStr = date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString() + " " +
            date.getHours().toString() + ":" + date.getMinutes().toString();

        const newMsg = {
            content: JSON.parse(msg.body).content,
            senderUsername: JSON.parse(msg.body).senderUsername,
            sendingTimestamp: dateStr,
        };

        setMessages(p => [...p, newMsg]);
    };

    const sendMessage = (msg: string) => {
        if (!/\S/.test(msg)) return;

        const message = {
            content: msg,
            senderUsername: "username",
        };
        stompClient.send("/chat/room/" + threadId, {}, JSON.stringify(message));
    };

    const loadMessages = () => {
        const messagesPromise = ChatService.messages(Number(threadId));
        messagesPromise.then(function (messages: Message[]) {
            messages.map(function (message: Message) {
                const date = new Date(message.sendingTimestamp);
                const dateStr = date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString() + " " +
                    date.getHours().toString() + ":" + date.getMinutes().toString();

                const newMessage = {
                    content: message.content,
                    senderUsername: message.senderUsername,
                    sendingTimestamp: dateStr,
                };

                setMessages(p => [...p, newMessage]);
            });
        });
    };

    return (
        <Box bgcolor={"background.dp02"}>
            <Box mt={1} pl={3} pr={3} pb={1} >
                <Grid container direction={"row"} spacing={1} className={classes.grid} >
                    <Grid item >
                        <Button onClick={onClose}> <ArrowBackIcon /></Button>
                    </Grid>
                    <Grid item >
                        <Typography variant="h5" color="textPrimary" className={classes.header}>{threadTitle} </Typography>
                    </Grid>
                    <Grid item >
                        <Typography variant={"caption"} color={"textSecondary"} className={classes.header}>20.04.2021</Typography>
                    </Grid>
                </Grid>
                <Divider />
            </Box>

            <Box mt={4} className={classes.messageBox}>
                <ScrollableFeed>
                    <Box pl={8} pr={8}>
                        <Grid container direction={"column"} spacing={1}>
                            <img className={classes.image} src={process.env.PUBLIC_URL + "pluto-sign-up.png"} />
                            <Typography variant={"h5"} className={classes.bold} >
                                Beginning of everything!
                            </Typography>

                            <Typography color="textSecondary" className={classes.header}>
                                Write Something!
                            </Typography>

                            <Divider />
                        </Grid>
                    </Box>

                    <Box mt={2} pl={8} pr={8} >
                        {messages.map((msg, index) => (
                            <Grid container direction={"column"} key={index} >

                                <Grid container direction={"row"} spacing={1} className={classes.grid}>
                                    <Grid item >
                                        <Typography variant={"body2"} color="textPrimary" className={classes.bold}>{msg.senderUsername}</Typography>
                                    </Grid>
                                    <Grid item >
                                        <Typography variant={"caption"} color="textSecondary" className={classes.header}>{msg.sendingTimestamp}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item >
                                    <Typography className={classes.message} display={"block"} variant={"body2"} color="textPrimary">
                                        {msg.content}
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                </ScrollableFeed>
            </Box>

            <Box mt={10} pb={5} pl={5} pr={5}>
                <Formik
                    initialValues={{
                        content: "",
                    }}
                    validate={validate}
                    onSubmit={(values, actions) => {
                        sendMessage(values.content);
                        actions.resetForm();
                    }}
                >
                    {
                        (props) => (
                            <Form noValidate
                                onKeyDown={(e: KeyboardEvent) => {
                                    if (e.key === "Shift") {
                                        console.log("shift enter");
                                        bIsShiftDown = true;
                                    }
                                    if (e.key === "Enter" && bIsShiftDown === false) {
                                        e.preventDefault();
                                        props.handleSubmit();
                                        console.log("enter");
                                    }
                                }}
                                onKeyUp={(e: KeyboardEvent) => {
                                    if (e.key === "Shift") {
                                        bIsShiftDown = false;
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
                                    inputProps={{ maxLength: 512 }}
                                />

                            </Form>
                        )}
                </Formik>
            </Box>
        </Box>
    );
};

export default Chat;
