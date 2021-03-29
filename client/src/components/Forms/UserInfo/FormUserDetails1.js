import React from "react";
import updateFormStyles from "../useStyles/formStyles";
import { TextField, Button } from "@material-ui/core";

const FormUserDetails1 = props => {
  const continueOne = e => {
    e.preventDefault();
    props.nextStep();
  };

  const { values, handleChange, validate, validateEmail } = props;
  const classes = updateFormStyles();

  return (
    <>
      <TextField
        error={values.firstNameError}
        helperText={values.firstNameError}
        name="firstName"
        value={values.firstName}
        onBlur={validate}
        onChange={handleChange}
        variant="outlined"
        label="First Name"
        placeholder="Enter First Name"
        fullWidth
        className={classes.mgstyle}
      />
      <TextField
        error={values.lastnameError}
        helperText={values.lastnameError}
        name="lastname"
        value={values.lastname}
        onBlur={validate}
        onChange={handleChange}
        variant="outlined"
        label="Last Name"
        placeholder="Enter Last Name"
        fullWidth
        className={classes.mgstyle}
      />
      <TextField
        error={values.emailError}
        helperText={values.emailError}
        onBlur={validateEmail}
        name="email"
        value={values.email}
        onChange={handleChange}
        variant="outlined"
        label="E-mail"
        placeholder="Enter Email"
        fullWidth
        type="email"
        className={classes.mgstyle}
      />
      <Button
        size="large"
        className={classes.styleMain}
        onClick={continueOne}
        fullWidth
      >
        Continue
      </Button>
    </>
  );
};

export default FormUserDetails1;
