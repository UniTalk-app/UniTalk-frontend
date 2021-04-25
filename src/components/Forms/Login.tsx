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
} from "@material-ui/core";
import { FormikErrors, Form, Field, Formik } from "formik";
import AuthService from "services/auth.service";

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

const Login: React.FC = () => {
    const classes = useStyles();

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
                onSubmit={(values) => {
                    AuthService.login(values);
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
                        </Form>
                    )}
                
            </Formik>
        </Container>
    );
};

export default Login;
