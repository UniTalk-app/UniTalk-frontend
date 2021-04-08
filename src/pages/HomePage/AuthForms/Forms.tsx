import * as React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import HowToRegIcon from '@material-ui/icons/HowToReg';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import SignIn from "./Login";
import Register from "./Register";
import styled from 'styled-components'

const Forms: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [LoginForm, SetLoginForm] = React.useState(false);

  const trigger = (value: boolean) => {
    SetLoginForm(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const RegisterBtn = styled(Button)`
  color: rgba(255, 31, 75, 0.87);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;
  return (
    <div>
      <RegisterBtn
        variant="outlined"
        color="primary"
        onClick={() => {
          handleClickOpen();
          trigger(true);
        }}
      >
      <HowToRegIcon/>
        Login
      </RegisterBtn>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          handleClickOpen();
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
            <h3>Cancel</h3>
          </Button>
          <Button onClick={handleClose} color="primary">
            <b>{LoginForm ? <h3>Login</h3> : <h3>Register</h3>}</b>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
 export default Forms;