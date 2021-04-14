import * as React from "react";
import {
  Button,
  Typography,
  Container,
  Grid,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { useFormik, FormikErrors, Form, Field, Formik } from "formik";

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
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

const validate = (values: FormValues) => {
  const errors: FormikErrors<FormValues> = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 5) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 5) {
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

function Register() {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container>
      <Typography component="h1" variant="h3" className={classes.header}>
        Sign up
      </Typography>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          password: "",
          email: "",
        }}
        validate={validate}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form noValidate onSubmit={formik.handleSubmit} className={classes.big}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" variant="h6" color="primary">
                Fisrt name
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
                onChange={formik.handleChange}
                value={formik.values.firstName}
                autoFocus
              />
              {formik.errors.firstName ? <>{formik.errors.firstName}</> : null}
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
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              {formik.errors.lastName ? <>{formik.errors.lastName}</> : null}
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
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email ? <div>{formik.errors.email}</div> : null}
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
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
        </Form>
      </Formik>
    </Container>
  );
}

export default Register;
