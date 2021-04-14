import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import {
  HowToReg as HowToRegIcon,
  ExitToApp as ExitToAppIcon,
} from "@material-ui/icons";
import Login from "./Login";
import Register from "./Register";

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

const Forms: React.FC = () => {
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
        className={classes.small + " " + classes.margin}
        variant="outlined"
        color="primary"
        onClick={() => {
          trigger(true);
        }}
      >
        <ExitToAppIcon />
        Login
      </Button>
      <Button
        className={classes.small + " " + classes.margin}
        variant="outlined"
        color="secondary"
        onClick={() => {
          trigger(false);
        }}
      >
        <HowToRegIcon />
        Register
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <b>{loginForm ? <Login /> : <Register />}</b>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            <b>{loginForm ? "Login" : "Register"}</b>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Forms;
