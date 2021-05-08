import * as React from "react";
import {
    Button,
    Typography,
    Container,
    Grid,
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
            marginTop: theme.spacing(2),
            padding: theme.spacing(1),
        },
        margin: {
            marginRight: theme.spacing(2),
            height: theme.spacing(2),
            width: "100%",
        },
        textField: {
            marginBottom: theme.spacing(1),
            height: theme.spacing(3),
            width: "100%",
        },
        header: {
            textAlign: "center",
            marginTop: theme.spacing(1),
        },
    })
);

interface FormValues {
    username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    
    if (!values.username) {
        errors.username = "Required";
    } else if (values.firstName.length > 15) {
        errors.username = "Must be 15 characters or less";
    }

    if (!values.firstName) {
        errors.firstName = "Required";
    } else if (values.firstName.length > 15) {
        errors.firstName = "Must be 15 characters or less";
    }

    if (!values.lastName) {
        errors.lastName = "Required";
    } else if (values.lastName.length > 20) {
        errors.lastName = "Must be 20 characters or less";
    }

    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length > 10) {
        errors.password = "Must be 10 characters or less";
    }

    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }

    return errors;
};

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const Register : React.FC = () => {
    const classes = useStyles();
    
    const [open, setOpen] = React.useState(false);

    const handleClick = (status: number | undefined) => {
        console.log(status);
        if(status==200){
            setOpen(true);
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
        Sign up
            </Typography>
            <Formik
                initialValues={{
                    username: "",
                    firstName: "",
                    lastName: "",
                    password: "",
                    email: "",
                }}
                validate={validate}
                onSubmit={async (values) => {
                    const status = await AuthService.register(values);
                    handleClick(status);
                }}
            > 
                {
                    (props)=>(
                        <Form noValidate onSubmit={props.handleSubmit} className={classes.big}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography component="h3" variant="h6" color="primary">
                Username
                                    </Typography>
                                    <Field
                                        className={classes.textField}
                                        autoComplete="username"
                                        name="username"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        onChange={props.handleChange}
                                        value={props.values.username}
                                        autoFocus
                                    />
                                    {props.errors.username ? <>{props.errors.username}</> : null}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography component="h3" variant="h6" color="primary">
                First name
                                    </Typography>
                                    <Field
                                        className={classes.textField}
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        onChange={props.handleChange}
                                        value={props.values.firstName}
                                        autoFocus
                                    />
                                    {props.errors.firstName ? <>{props.errors.firstName}</> : null}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography component="h3" variant="h6" color="primary">
                Last name
                                    </Typography>
                                    <Field
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        onChange={props.handleChange}
                                        value={props.values.lastName}
                                    />
                                    {props.errors.lastName ? <>{props.errors.lastName}</> : null}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography component="h3" variant="h6" color="primary">
                Email
                                    </Typography>
                                    <Field
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={props.handleChange}
                                        value={props.values.email}
                                    />
                                    {props.errors.email ? <div>{props.errors.email}</div> : null}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography component="h3" variant="h6" color="primary">
                Password
                                    </Typography>
                                    <Field
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={props.handleChange}
                                        value={props.values.password}
                                    />
                                    {props.errors.password ? (
                                        <div>{props.errors.password}</div>
                                    ) : null}
                                </Grid>
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
                            </Button>
                            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success">
                                successfully registered
                                </Alert>
                            </Snackbar>
                        </Form>
                    )
                }
                
            </Formik>
        </Container>
    );
};

export default Register;
