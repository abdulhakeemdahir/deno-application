import React from "react";
import updateFormStyles from "../useStyles/formStyles";
import { TextField, Button, ButtonGroup } from "@material-ui/core";

const FormUserDetails2 = props => {
  const continueOne = e => {
    e.preventDefault();
    props.nextStep();
  };
  const previousOne = e => {
    e.preventDefault();
    props.previousStep();
  };

  const { values, handleChange, validate, validatePassword } = props;
  const classes = updateFormStyles();

  return (
    <>
      <TextField
        error={values.usernameError}
        helperText={values.usernameError}
        onBlur={validate}
        name="username"
        value={values.username}
        onChange={handleChange}
        variant="outlined"
        label="Username"
        placeholder="Enter Username"
        fullWidth
        className={classes.mgstyle}
      />
      <TextField
        error={values.passwordError}
        helperText={values.passwordError}
        onBlur={validatePassword}
        name="password"
        value={values.password}
        onChange={handleChange}
        variant="outlined"
        label="Password"
        placeholder="Enter Password"
        type="password"
        fullWidth
        className={classes.mgstyle}
      />
      <ButtonGroup fullWidth>
        <Button
          size="large"
          className={classes.styleSecondary}
          onClick={previousOne}
        >
          Go Back
        </Button>
        <Button
          size="large"
          className={classes.styleMain}
          onClick={continueOne}
        >
          Continue
        </Button>
      </ButtonGroup>
    </>
  );
};

export default FormUserDetails2;
