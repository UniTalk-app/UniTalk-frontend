import * as React from "react";
import {
    Button,
    Dialog,
    makeStyles,
    Theme,
    createStyles,
} from "@material-ui/core";
import {
    HowToReg as HowToRegIcon,
    ExitToApp as ExitToAppIcon,
} from "@material-ui/icons";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        small: {
            width: theme.spacing(15),
            height: theme.spacing(5),
            borderRadius: theme.spacing(0),
        },
        margin: {
            marginRight: theme.spacing(3),
        },
    })
);

const Forms : React.FC = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [loginForm, setLoginForm] = React.useState(false);

    const trigger = (value: boolean) => {
        setLoginForm(value);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                className={`${classes.small} ${classes.margin}`}
                variant="outlined"
                color="primary"
                startIcon={<ExitToAppIcon/>}
                onClick={() => {
                    trigger(true);
                }}
            >
                Login
            </Button>
            <Button
                className={`${classes.small} ${classes.margin}`}
                variant="outlined"
                color="secondary"
                startIcon={<HowToRegIcon/>}
                onClick={() => {
                    trigger(false);
                }}
            >
                Register
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                {loginForm ? <LoginForm onClose={handleClose} changeDialog={trigger}/> : <RegisterForm onClose={handleClose} changeDialog={trigger}/>}
            </Dialog>
        </>
    );
};
export default Forms;
