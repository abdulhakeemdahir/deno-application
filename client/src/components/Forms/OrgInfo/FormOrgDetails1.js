import React from "react";
import formStyles from "../useStyles/formStyles";
import { TextField, Button } from "@material-ui/core";

const FormOrgDetails1 = props => {
  const continueOne = e => {
    e.preventDefault();
    props.nextStep();
  };

  const { values, handleChange, validate, validateEmail } = props;
  const classes = formStyles();

  return (
    <>
      <TextField
        error={values.firstNameError}
        helperText={values.firstNameError}
        onBlur={validate}
        name="firstName"
        value={values.firstName}
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
        onBlur={validate}
        name="lastname"
        value={values.lastname}
        onChange={handleChange}
        variant="outlined"
        label="Last Name"
        placeholder="Enter Last Name"
        fullWidth
        className={classes.mgstyle}
      />
      <TextField
        error={values.orgnameError}
        helperText={values.orgnameError}
        onBlur={validate}
        name="orgname"
        value={values.orgname}
        onChange={handleChange}
        variant="outlined"
        label="Organization Name"
        placeholder="Enter Organization Name"
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

export default FormOrgDetails1;
