import * as React from "react";
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
import * as SockJS from "sockjs-client";
import { Client, Message } from "@stomp/stompjs";

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

const socket=new SockJS();
const client = new Client({brokerURL: "/app/topic/"});

console.log(client.brokerURL);

type ThreadProps = {
    thread: Thread
}

interface FormValues {
    content: string;
}

const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};

    if (!values.content) {
        errors.content = "Required";
    }

    return errors;
};

const Chat: React.FC<ThreadProps> = (props) => {
    const classes = useStyles();
    const {
        thread
    } = props;

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
                    ChatService.send(values.content,"1");
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
