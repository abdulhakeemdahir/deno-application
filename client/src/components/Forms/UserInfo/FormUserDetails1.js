// Import all relevant packages and components
import updateFormStyles from "../useStyles/formStyles";
import { TextField, Button } from "@material-ui/core";
import "./style.css";

// Create the component function and export for use
const FormUserDetails1 = props => {
  // Create the continueOne function
  const continueOne = e => {
    e.preventDefault();
    props.nextStep();
  };

  const { values, handleChange, validate, validateEmail } = props;

  // Call the styles function
  const classes = updateFormStyles();
  // Create the JSX for the component
  return (
    <>
      <TextField
        helperText={values.firstNameError}
        name='firstName'
        value={values.firstName}
        onBlur={validate}
        onChange={handleChange}
        variant='outlined'
        label='First Name'
        placeholder='Enter First Name'
        fullWidth
        className={"mgstyle"}
      />
      <TextField
        helperText={values.lastnameError}
        name='lastname'
        value={values.lastname}
        onBlur={validate}
        onChange={handleChange}
        variant='outlined'
        label='Last Name'
        placeholder='Enter Last Name'
        fullWidth
        className={"mgstyle"}
      />
      <TextField
        helperText={values.emailError}
        onBlur={validateEmail}
        name='email'
        value={values.email}
        onChange={handleChange}
        variant='outlined'
        label='E-mail'
        placeholder='Enter Email'
        fullWidth
        type='email'
        className={"mgstyle"}
      />
      <Button
        size='large'
        className={classes.styleMain}
        onClick={continueOne}
        fullWidth>
        Continue
      </Button>
    </>
  );
};

export default FormUserDetails1;
