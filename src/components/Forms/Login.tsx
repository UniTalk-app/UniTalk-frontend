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
    Snackbar
} from "@material-ui/core";
import { FormikErrors, Form, Field, Formik } from "formik";
import AuthService from "services/auth.service";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

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

interface FormValues {
    username: string;
  password: string;
}

const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};

    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length > 10) {
        errors.password = "Must be 10 characters or less";
    }

    if (!values.username) {
        errors.username = "Required";
    } 

    return errors;
};

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Login: React.FC = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = (status: number | undefined) => {
        console.log(status);
        if(status==200){
            setOpen(true);
            window.location.reload(false);
        }
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    return (
        <Container>
            <Typography component="h1" variant="h3" className={classes.header}>
        Sign in
            </Typography>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                validate={validate}
                onSubmit={async (values) => {
                    const status = await AuthService.login(values);
                    handleClick(status);
                }}
            >
                {
                    (props) => (
                        <Form noValidate onSubmit={props.handleSubmit} className={classes.big}>
                            <Typography component="h3" variant="h6" color="primary">
                                Username
                            </Typography>
                            <Field
                                className={classes.textField}
            
                                variant="outlined"
                                required
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={props.handleChange}
                                value={props.values.username}
                                autoFocus
                            />
                            {props.errors.username ? <>{props.errors.username}</> : null}
                            <Typography component="h3" variant="h6" color="primary">
                                Password
                            </Typography>
                            <Field
                                className={classes.textField}

                                variant="outlined"
                                required
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={props.handleChange}
                                autoComplete="current-password"
                                value={props.values.password}
                            />
                            {props.errors.password ? <>{props.errors.password}</> : null}
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                Sign In
                            </Button>
                            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success">
                                successfully logged in
                                </Alert>
                            </Snackbar>
                        </Form>
                    )}
                
            </Formik>
        </Container>
    );
};

export default Login;
