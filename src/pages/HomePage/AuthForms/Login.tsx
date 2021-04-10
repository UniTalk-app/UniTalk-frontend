import * as React from 'react';
import { Button, CssBaseline, FormControlLabel, Checkbox, Typography, Container } from '@material-ui/core';
import { useFormik, FormikErrors, Form, Field } from 'formik';

interface FormValues{
  password: string,
  email: string,
}

const validate = (values: FormValues)=> {
  
  const errors: FormikErrors<FormValues> = {};

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length > 10) {
    errors.password = 'Must be 10 characters or less';
  }


  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const SignIn: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Field
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            autoFocus
          />
          {formik.errors.email ? <>{formik.errors.email}</> : null}
          <Field
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={formik.handleChange}
            autoComplete="current-password"
            value={formik.values.password}
          />
          {formik.errors.password ? <>{formik.errors.password}</> : null}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
        </Form>
    </Container>
  );
}

export default SignIn;