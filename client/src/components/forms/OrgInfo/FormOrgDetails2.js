import React from "react";
import { TextField, Button, ButtonGroup } from "@material-ui/core";
import formStyles from "../useStyles/formStyles";

const FormOrgDetails2 = props => {
  const continueOne = e => {
    e.preventDefault();
    props.nextStep();
  };
  const previousOne = e => {
    e.preventDefault();
    props.previousStep();
  };

  const { values, handleChange, validate, validatePassword } = props;
  const classes = formStyles();

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

export default FormOrgDetails2;
