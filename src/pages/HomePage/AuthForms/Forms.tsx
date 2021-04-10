import * as React from 'react';
import { Button, Dialog, DialogActions } from '@material-ui/core';
import {
  HowToReg as HowToRegIcon,
  AddToHomeScreen as AddToHomeScreenIcon
 } from '@material-ui/icons';
import SignIn from "./Login";
import Register from "./Register";

const Forms: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [LoginForm, SetLoginForm] = React.useState(false);

  const trigger = (value: boolean) => {
    SetLoginForm(value);
    setOpen(true);
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
        //  handleClickOpen();
          trigger(true);
        }}
      >
      <HowToRegIcon/>
        Login
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
        //  handleClickOpen();
          trigger(false);
        }}
      >
        <AddToHomeScreenIcon/>
        Register
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <b>{LoginForm ? <SignIn /> : <Register />}</b>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            <b>{LoginForm ? "Login" : "Register"}</b>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
 export default Forms;