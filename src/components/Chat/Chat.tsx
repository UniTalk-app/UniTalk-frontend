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
import ChatService from "services/chatData.service";

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

type Message = {
    content: string,
    sender: string,
    timestamp: string,
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
let socket : any;

const Chat: React.FC<ThreadProps> = (props) =>
{
    const classes = useStyles();
    const {
        thread,
    } = props;

    const [messages, setMessages] = useState([] as Array<Message>);

    useEffect(() => {
        connect();
        loadMessages();

        return function cleanup() {
            stompClient.disconnect();
            socket.close();
        };
    },[]);

    const loadMessages=()=>{
        const msgs=ChatService.messages(Number(thread.threadId));
        msgs.then(function(msg : any){
            msg.map(function(message : any){
                const newMessage = {
                    content: message.content,
                    sender: message.senderUsername,
                    timestamp: message.sendingTimestamp
                };

                setMessages(p =>[...p,newMessage]);
            });
        });
    };

    const connect = () => {
        socket = new SockJS("http://localhost:8080/websocket");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
        stompClient.autoReconnect=false;
    };

    const onConnected = () => {
        stompClient.subscribe(
            "/topic/room/" + thread.threadId,
            onMessageReceived
        );
    };

    const onError = (err : any) => {
        console.log(err);
    };

    const onMessageReceived = (msg :any) =>{
        const newMsg = {
            content: JSON.parse(msg.body).content,
            sender: JSON.parse(msg.body).senderUsername,
            timestamp: JSON.parse(msg.body).sendingTimestamp,
        };

        setMessages(p =>[...p,newMsg]);
    };

    const sendMessage = (msg : any) =>{
        const message = {
            content: msg,
            senderUsername: "username",
        };
        stompClient.send("/chat/room/"+thread.threadId, {}, JSON.stringify(message));
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
                {messages.map( (msg) => (
                    <Grid container direction={"column"}  key={msg.sender+ msg.timestamp} >

                        <Grid container direction={"row"} spacing={1} className={classes.grid}>
                            <Grid item >
                                <Typography variant={"body2"} color="textPrimary" className={classes.bold}>{msg.sender}</Typography>
                            </Grid>
                            <Grid item >
                                <Typography variant={"caption"} color="textSecondary" className={classes.header}>{msg.timestamp}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <Typography variant={"body2"} color="textPrimary">
                                {msg.content}
                            </Typography>
                        </Grid>
                    </Grid>
                ))}
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
