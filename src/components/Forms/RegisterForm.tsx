import * as React from "react";
import {
    Button,
    FormControlLabel,
    Checkbox,
    Typography,
    TextField,
    Box,
    Grid,
    Divider,
    Link,
    Snackbar
} from "@material-ui/core";
import { useFormik } from "formik";
import AuthService from "services/auth.service";
import * as Yup from "yup";
import BackendAPI from "services/backendAPI";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

type RegisterFormProps = {
    onClose: () => void,
    changeDialog: (b: boolean) => void,
};

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const RegisterForm : React.FC<RegisterFormProps> = (props) => {
    const { onClose, changeDialog } = props;
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            email: "",
            firstName: "",
            lastName: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(BackendAPI.MIN_USERNAME_CHARS)
                .max(BackendAPI.MAX_USERNAME_CHARS)
                .required(),
            password: Yup.string()
                .min(BackendAPI.MIN_PASSWORD_CHARS)
                .max(BackendAPI.MAX_PASSWORD_CHARS)
                .required(),
            email: Yup.string()
                .email()
                .min(BackendAPI.MIN_EMAIL_CHARS)
                .max(BackendAPI.MAX_EMAIL_CHARS)
                .required(),
            firstName: Yup.string()
                .min(BackendAPI.MIN_USERNAME_CHARS)
                .max(BackendAPI.MAX_USERNAME_CHARS)
                .required(),
            lastName: Yup.string()
                .min(BackendAPI.MIN_USERNAME_CHARS)
                .max(BackendAPI.MAX_USERNAME_CHARS)
                .required(),
        }),
        onSubmit: async (values) => {
            const status = await AuthService.register(values);
            handleClick(status);
        }
    });
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
        <Box p={2}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Box display="flex" justifyContent="center">
                            <Typography variant="h5">
                                Register
                            </Typography>
                        </Box>
                        <Typography variant="caption">
                            Already have an account? <Link onClick={() => changeDialog(true)} style={{cursor: "pointer"}}>Login here!</Link>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Divider />
                    </Grid>
                    <Grid item>
                        <Box display="flex" justifyContent="center">
                            <TextField
                                id="username"
                                name="username"
                                label="Username"
                                color="primary"
                                variant="outlined"
                                onChange={formik.handleChange}
                                error={formik.touched.username && formik.errors.username ? true : false}
                                helperText={(formik.touched.username && formik.errors.username) ?? false}
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box display="flex" justifyContent="center">
                            <TextField 
                                id="email" 
                                name="email"
                                label="Email"
                                color="primary"
                                variant="outlined"
                                type="email"
                                onChange={formik.handleChange} 
                                error={formik.touched.email && formik.errors.email ? true : false}
                                helperText={(formik.touched.email && formik.errors.email) ?? false}
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box display="flex" justifyContent="center">
                            <TextField 
                                id="firstName" 
                                name="firstName"
                                label="First name"
                                color="primary"
                                variant="outlined"
                                onChange={formik.handleChange} 
                                error={formik.touched.firstName && formik.errors.firstName ? true : false}
                                helperText={(formik.touched.firstName && formik.errors.firstName) ?? false}
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box display="flex" justifyContent="center">
                            <TextField 
                                id="lastName" 
                                name="lastName"
                                label="Last name"
                                color="primary"
                                variant="outlined"
                                onChange={formik.handleChange} 
                                error={formik.touched.lastName && formik.errors.lastName ? true : false}
                                helperText={(formik.touched.lastName && formik.errors.lastName) ?? false}
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box display="flex" justifyContent="center">
                            <TextField 
                                id="password" 
                                name="password"
                                label="Password"
                                color="primary"
                                variant="outlined"
                                type="password"
                                onChange={formik.handleChange} 
                                error={formik.touched.password && formik.errors.password ? true : false}
                                helperText={(formik.touched.password && formik.errors.password) ?? false}
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                    </Grid>
                    <Grid item>
                        <Grid container justify="space-around">
                            <Grid item>
                                <Button type="submit" variant="contained" color="secondary">
                                    Register
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={onClose} color="primary">
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        successfully registered
                    </Alert>
                </Snackbar>
            </form>
        </Box>
    );
};

export default RegisterForm;
