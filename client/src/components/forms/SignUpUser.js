// Import all relevant packages and components
import React, { useState } from "react";
import {
  Typography,
  Grid,
  Avatar,
  Container,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import api from "../../utils/api.js";
import FormUserDetails1 from "./UserInfo/FormUserDetails1.js";
import FormUserDetails2 from "./UserInfo/FormUserDetails2.js";
import FormUserConfirm from "./UserInfo/FormUserConfirm.js";
import { ThumbUp } from "@material-ui/icons";
import { useHistory } from "react-router";
import useForm from "./Utils/useForm.js";
import {
  useValidateEmail,
  useValidateLength,
  useValidatePassword
} from "./Utils/useValidations.js";
// Create a useStyles Material UI component for styling
const useStyles = makeStyles(theme => ({
  paper: {
    background:
      "linear-gradient( 90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 0% )",
    borderRadius: "0px",
    boxShadow: "0 3.42857px 23px rgb(0 0 0 / 10%)",
    padding: "20px"
  },
  mgstyle: {
    marginTop: "5px",
    marginBottom: "5px"
  },
  styleMain: {
    background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
    color: "#ffffff",
    padding: "15px"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },

  styleIcon: {
    background: "#3f4d67"
  }
}));
// Create the component function and export for use
export default function SignUpUser() {
  // Create the set and setState from useState
  const validateLength = useValidateLength;
  const validateEmail = useValidateEmail;
  const validatePassword = useValidatePassword;
  // Create the set and setState from useState
  const [stateForm, setStateForm] = useState({
    step: 1
  });
  // Create the nextStep function
  const nextStep = () => {
    const { step } = stateForm;
    setStateForm({
      step: step + 1
    });
  };
  // Create the previousStep function
  const previousStep = () => {
    const { step } = stateForm;
    setStateForm({
      step: step - 1
    });
  };
  const { inputs, handleChange, setInputs, clearForm } = useForm({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    username: "",
    usernameError: "",
    firstName: "",
    firstNameError: "",
    lastname: "",
    lastnameError: "",
    response: {},
    role: "Personal",
    bio: "",
    thumbnail: ""
  });

  const values = { ...inputs };

  // Call the useHistory function
  const history = useHistory();
  // Create the handleSubmit function
  const handleSubmit = async () => {
    //event.preventDefault();
    try {
      // Register the user.
      const { data } = await api.register(inputs);
      setInputs({
        ...inputs,
        response: data
      });

      console.log(inputs);
      clearForm();
      history.go(0);
      // User has been successfully registered, logged in and added to state. Perform any additional actions you need here such as redirecting to a new page.
    } catch (err) {
      // Handle error responses from the API. This will include
      if (err.response && err.response.data) console.log(err.response.data);
    }
  };
  // Call the styles function
  const classes = useStyles();
  const { step } = stateForm;

  const validate = event => validateLength(event, setInputs, inputs);
  const valEmail = () => validateEmail(values, setInputs, inputs);
  const valPass = () => validatePassword(values, setInputs, inputs);
  // Create a Switch Case for the different JSX components
  switch (step) {
    case 1:
      return (
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
          className={classes.paper}>
          <Grid item align='center'>
            <Avatar className={classes.styleIcon}>
              <CreateIcon />
            </Avatar>
            <Typography variation='h6' color='default'>
              Signup User
            </Typography>
          </Grid>
          <FormUserDetails1
            nextStep={nextStep}
            handleChange={handleChange}
            values={inputs}
            validate={validate}
            validateEmail={valEmail}
          />
        </Grid>
      );
    case 2:
      return (
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
          className={classes.paper}>
          <Grid item align='center'>
            <Avatar className={classes.styleIcon}>
              <CreateIcon />
            </Avatar>
            <Typography variation='h6' color='default'>
              Signup User
            </Typography>
          </Grid>
          <FormUserDetails2
            nextStep={nextStep}
            previousStep={previousStep}
            handleChange={handleChange}
            values={inputs}
            validate={validate}
            validatePassword={valPass}
          />
        </Grid>
      );
    case 3:
      return (
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
          className={classes.paper}>
          <Grid item align='center'>
            <Avatar className={classes.styleIcon}>
              <CreateIcon />
            </Avatar>
            <Typography variation='h6' color='default'>
              Signup User
            </Typography>
          </Grid>
          <FormUserConfirm
            nextStep={nextStep}
            previousStep={previousStep}
            values={inputs}
            handleSubmit={handleSubmit}
          />
        </Grid>
      );
    case 4:
      return (
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
          className={classes.paper}>
          <Container>
            <Grid item align='center'>
              <Avatar className={classes.styleIcon}>
                <ThumbUp />
              </Avatar>
              <Typography variation='h6' color='default'>
                Congratulations
              </Typography>
            </Grid>
            <Typography variation='h6' color='default'>
              Thank you for Signing Up!
            </Typography>
            <br />
            <Divider />
            <br />
            <Typography variation='h6' color='default'>
              Please Login.
            </Typography>
          </Container>
        </Grid>
      );
    default:
      return;
  }
}
