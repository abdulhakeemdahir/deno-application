// Import all relevant packages and components
import { Typography, Grid, Avatar, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router";
import { useLogin } from "../../utils/auth";
import { ADD, LOADING } from "../../utils/actions/actions";
import { useGlobalContext } from "../../utils/GlobalStates/GlobalState";
import api from "../../utils/api";
import useForm from "./Utils/useForm";
import { useValidateLogin, useValidateLength } from "./Utils/useValidations";
// Create a useStyles Material UI component for styling
const useStyles = makeStyles({
  paper: {
    background:
      "linear-gradient( 90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 0% )",
    borderRadius: "0px",
    boxShadow: "0 3.42857px 23px rgb(0 0 0 / 10%)",
    padding: "20px"
  },
  centerPosition: {
    padding: "20px",
    textAlign: "center"
  },
  centerContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  bgstyle: {
    color: "#3f4d67"
  },
  mgstyle: {
    marginTop: "5px",
    marginBottom: "5px"
  },
  styleMain: {
    background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
    color: "#ffffff",
    padding: "15px",
    borderRadius: "0px"
  },
  styleSecondary: {
    background: "linear-gradient(-135deg,#899fd4,#a389d4)",
    color: "#ffffff"
  },
  styleIcon: {
    background: "#3f4d67"
  }
});
// Create the component function and export for use
export default function Signin() {
  // Call the styles function
  const classes = useStyles();
  // Create the set and setState from useState
  const { inputs, handleChange, setInputs, clearForm } = useForm({
    email: "",
    emailError: "",
    username: "",
    usernameError: "",
    errorLogin: ""
  });

  // Call useHistory
  const history = useHistory();
  // Get the helper login function from the `useLogin` hook.
  const login = useLogin();
  const validateLogin = useValidateLogin;
  const validateLength = useValidateLength;

  // Destructure State and Dispatch from Context
  const [, globalDispatch] = useGlobalContext();
  // Create the handleSubmit function
  const handleSubmit = async event => {
    event.preventDefault();
    // console.log(event)

    try {
      const res = await login(inputs);

      await validateLogin(res, inputs, setInputs);
      //User has been successfully logged in and added to state. Perform any additional actions you need here such as redirecting to a new page.
      const userInfo = await api.getUser(res._id);
      await globalDispatch({
        type: LOADING
      });
      await globalDispatch({
        type: ADD,
        payload: {
          user: userInfo.data,
          loading: false
        }
      });

      clearForm();

      history.push("/newsfeed");
    } catch (err) {
      // Handle error responses from the API
      if (err.response && err.response.data) {
        validateLogin(err.response.data, inputs, setInputs);
      }
    }
  };

  const validate = event => validateLength(event, setInputs, inputs);
  // Create the JSX for the component
  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      className={classes.paper}>
      <Grid item align='center'>
        <Avatar className={classes.styleIcon}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variation='h6' color='default'>
          Log In
        </Typography>
      </Grid>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          error={inputs.usernameError}
          helperText={inputs.usernameError}
          name='username'
          value={inputs.username}
          onChange={handleChange}
          onBlur={validate}
          variant='outlined'
          label='Username'
          placeholder='Enter Username'
          fullWidth
          className={classes.mgstyle}
        />
        <TextField
          error={inputs.passwordError}
          helperText={inputs.passwordError}
          name='password'
          value={inputs.password}
          onChange={handleChange}
          onBlur={validate}
          variant='outlined'
          label='Password'
          placeholder='Enter Password'
          type='password'
          fullWidth
          className={classes.mgstyle}
        />
        <Button
          size='large'
          className={classes.styleMain}
          fullWidth
          onClick={handleSubmit}>
          Log In
        </Button>
      </form>
    </Grid>
  );
}
