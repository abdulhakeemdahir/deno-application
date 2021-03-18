import React, { useState } from "react";
import { Typography, Grid, Avatar, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import api from "../../utils/api";
import { useHistory } from "react-router";


const useStyles = makeStyles(theme => ({
	paper: {
		background:
			"linear-gradient( 90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 0% )",
		borderRadius: "0px",
		boxShadow: "0 3.42857px 23px rgb(0 0 0 / 10%)",
		padding: "20px",
	},
	mgstyle: {
		marginTop: "5px",
		marginBottom: "5px",
	},
	styleMain: {
		background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
		color: "#ffffff",
		padding: "15px",
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},

	styleIcon: {
		background: "#3f4d67",
	},
}));
export default function SignUpOrg() {
	const [stateOrg, setStateOrg] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastname: "",
    role: "Organization",
    orgName: "",
  });

  const history = useHistory();

	const handleChange = function(event) {
		const { name, value } = event.target;
    setStateOrg({
      ...stateOrg,
      [name]: value,
    });
	};

	history.go(0);

	const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Register the user.

      await api.register(stateOrg);

	  history.push("/");

      // User has been successfully registered, logged in and added to state. Perform any additional actions you need here such as redirecting to a new page.
    } catch (err) {
      // Handle error responses from the API. This will include
      if (err.response && err.response.data) console.log(err.response.data);
    }
  };

	const classes = useStyles();

	return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.paper}
    >
      <Grid item align="center">
        <Avatar className={classes.styleIcon}>
          <CreateIcon />
        </Avatar>
        <Typography variation="h6" color="default">
          Sign Up
        </Typography>
      </Grid>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          value={setStateOrg.firstName}
          onChange={handleChange}
          variant="outlined"
          label="Firstname"
          placeholder="Enter First Name"
          fullWidth
          className={classes.mgstyle}
        />
        <TextField
          name="lastname"
          value={setStateOrg.lastname}
          onChange={handleChange}
          variant="outlined"
          label="Lastname"
          placeholder="Enter Last Name"
          fullWidth
          className={classes.mgstyle}
        />
        <TextField
          name="orgName"
          value={setStateOrg.orgName}
          onChange={handleChange}
          variant="outlined"
          label="Organization name"
          placeholder="Enter Organization Name"
          fullWidth
          className={classes.mgstyle}
        />
        {/* <TextField
					// name='userName'
					// value=''
					variant='outlined'
					label='Bio'
					placeholder='Enter Organization Bio'
					fullWidth
					className={classes.mgstyle}
				/>
				<TextField
					// name='userName'
					// value=''
					variant='outlined'
					label='Website'
					placeholder='Enter Website'
					fullWidth
					className={classes.mgstyle}
				/>
				<TextField
					// name='userName'
					// value=''
					variant='outlined'
					label='Address'
					placeholder='Enter Address'
					fullWidth
					className={classes.mgstyle}
				/> */}
        <TextField
          name="email"
          value={setStateOrg.email}
          onChange={handleChange}
          variant="outlined"
          label="E-mail"
          placeholder="Enter E-mail"
          fullWidth
          className={classes.mgstyle}
        />
        <TextField
          name="username"
          value={setStateOrg.username}
          onChange={handleChange}
          variant="outlined"
          label="Username"
          placeholder="Enter Username"
          fullWidth
          className={classes.mgstyle}
        />
        <TextField
          name="password"
          value={setStateOrg.password}
          onChange={handleChange}
          variant="outlined"
          label="Password"
          placeholder="Enter Password"
          type="password"
          fullWidth
          className={classes.mgstyle}
        />
        <Button
          size="large"
          className={classes.styleMain}
          fullWidth
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </form>
    </Grid>
  );
}
