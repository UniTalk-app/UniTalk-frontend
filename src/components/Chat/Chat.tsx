import * as React from "react";
import { useEffect, useState, KeyboardEvent } from "react";
import {FormHelperText,Box,Divider, Typography,makeStyles,InputAdornment,Input,createStyles,Grid,TextField,Avatar, Theme,IconButton} from "@material-ui/core";
import { FormikErrors, Form, Formik } from "formik";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ChatService from "services/chatData.service";
import ScrollableFeed from "react-scrollable-feed";
import {
    ArrowBack as ArrowBackIcon,
    Search as SearchIcon,
    FilterList as FilterListIcon,
    FormatBold as FormatBoldIcon,
    FormatItalic as FormatItalicIcon,
} from "@material-ui/icons/";
import { deepOrange,} from "@material-ui/core/colors/";
import BackendAPI from "services/backendAPI";
import ReactMarkdown from "react-markdown";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            width: "100%",
            background:"#282828",
        },
        header: {
            textAlign: "center",
        },
        bold: {
            fontWeight: "bold",
            textAlign: "center",
        },
        messageBox:{
            height: "60vh",
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
        },
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
        },
    })
);

type ChatProps = {
    onClose: () => void,
    threadId: string,
    threadTitle: string,
    threadDate: string,
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

const getDataString= ( date : Date) =>{
    const options = {day: "2-digit",  month: "2-digit" ,year: "numeric" ,hour:"2-digit",minute : "2-digit"}as const;
    const dataStr = date.toLocaleDateString("de-DE",options);
    return dataStr;
};

let stompClient : Stomp.Client;
let socket : WebSocket;

const Chat: React.FC<ChatProps> = (props) => {
    const classes = useStyles();
    const {
        onClose,
        threadId,
        threadTitle,
        threadDate,
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

    const onMessageReceived = (msg :Stomp.Frame) =>{
        const newMsg = {
            content: JSON.parse(msg.body).content,
            senderUsername: JSON.parse(msg.body).senderUsername,
            sendingTimestamp: getDataString(new Date(JSON.parse(msg.body).sendingTimestamp)),
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

    const loadMessages=()=>{
        const messagesPromise=ChatService.messages(Number(threadId));
        messagesPromise.then(function(messages : Message[]){
            messages.map(function(message : Message){
                const newMessage = {
                    content: message.content,
                    senderUsername: message.senderUsername,
                    sendingTimestamp: getDataString(new Date(message.sendingTimestamp)),
                };

                setMessages(p => [...p, newMessage]);
            });
        });
    };

    return (
        <Box bgcolor={"background.dp02"} >
            <Box pl={3} pr={3} >
                <Grid container direction="row" spacing={1} justify="space-between" alignItems="center">
                    <Grid item >
                        <Grid container direction="row" spacing={1} justify="flex-start" alignItems="center">
                            <Grid item>
                                <IconButton onClick={onClose}>
                                    <ArrowBackIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" color="textPrimary" className={classes.header}>{threadTitle} </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={"caption"}  color={"textSecondary"} className={classes.header}>{getDataString(new Date(threadDate))}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item >
                        <Input
                            placeholder="Search…"
                            startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                            endAdornment={<InputAdornment position="end"><FilterListIcon /></InputAdornment>}
                        />
                    </Grid>
                </Grid>
                <Divider/>
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

                    <Box mt={2} pl={4} pr={4} >
                        {messages.map( (msg,index) => (
                            <Grid container direction={"column"} key={index} spacing={1} justify="space-evenly" alignItems="stretch">
                                <Grid item>
                                    <Grid container direction={"row"} spacing={1} justify="flex-start" alignItems="flex-start">
                                        <Grid item>
                                            <Avatar src={process.env.PUBLIC_URL + "pluto-sign-up.png"} className={classes.orange}>
                                                User first letter
                                            </Avatar>
                                        </Grid>
                                        <Grid item >
                                            <Grid container direction={"row"} spacing={1} alignItems="center">
                                                <Grid item >
                                                    <Typography variant={"body2"} color="textPrimary" className={classes.bold}>{msg.senderUsername}</Typography>
                                                </Grid>
                                                <Grid item >
                                                    <Typography variant={"caption"} color="textSecondary" className={classes.header}>{msg.sendingTimestamp}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Typography className={classes.message} variant={"body2"} >
                                                <ReactMarkdown>
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                </ScrollableFeed>
            </Box>

            <Box mt={5} pb={5} pl={10} pr={10}>
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
                                <Box bgcolor={"background.dp04" } border={1} borderColor="grey.600" borderRadius={"borderRadius"}>
                                    <TextField
                                        id="content"
                                        label="Enter to send. Shift + Enter to add new line"
                                        name="content"
                                        autoComplete="content"
                                        onChange={props.handleChange}
                                        value={props.values.content}
                                        fullWidth={true}
                                        autoFocus
                                        multiline
                                        rows={4}
                                        variant="filled"
                                        inputProps={{
                                            maxLength:512,
                                        }}
                                    />
                                    <FormHelperText variant="filled" filled={true}>
                                        <IconButton onClick={(e) => {e.stopPropagation();props.setFieldValue("content",props.values.content+"**");}}>
                                            <FormatBoldIcon fontSize={"small"} />
                                        </IconButton>
                                        <IconButton onClick={(e) => {e.stopPropagation();props.setFieldValue("content",props.values.content+"*");}}>
                                            <FormatItalicIcon fontSize={"small"} />
                                        </IconButton>
                                    </FormHelperText>
                                </Box>
                            </Form>
                        )}
                </Formik>
            </Box>
        </Box>
    );
};

export default Chat;
