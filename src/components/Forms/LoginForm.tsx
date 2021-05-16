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
} from "@material-ui/core";
import { useFormik } from "formik";
import AuthService from "services/auth.service";
import * as Yup from "yup";
import BackendAPI from "services/backendAPI";
import { useSnackbar } from "notistack";

type LoginFormProps = {
    onClose: () => void,
    changeDialog: (b: boolean) => void,
};

const LoginForm : React.FC<LoginFormProps> = (props) => {
    const { onClose, changeDialog } = props;
    const { enqueueSnackbar } = useSnackbar();
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(1)
                .max(BackendAPI.MAX_USERNAME_CHARS)
                .required(),
            password: Yup.string()
                .min(6)
                .max(BackendAPI.MAX_PASSWORD_CHARS)
                .required()
        }),
        onSubmit: async (values) => {
            const status = await AuthService.login(values);
            handleClick(status);
        }
    });

    const handleClick = (status: number | undefined) => {
        console.log(status);
        if(status==200){
            const message = "Successfully logged in!";
            enqueueSnackbar(message, {
                variant: "success",
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                },
            });
            window.location.reload(false);
        }else{
            const message = "Error";
            enqueueSnackbar(message, {
                variant: "error",
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                },
            });
        }
    };

    return (
        <Box p={2}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Box display="flex" justifyContent="center">
                            <Typography variant="h5">
                                Login
                            </Typography>
                        </Box>
                        <Typography variant="caption">
                            You dont have an account? <Link onClick={() => changeDialog(false)} style={{cursor: "pointer"}}>Register here!</Link>
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
                                <Button type="submit" variant="contained" color="primary">
                                    Sign In
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
            </form>
        </Box>
    );
};

export default LoginForm;
