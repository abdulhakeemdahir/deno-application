// Import all relevant packages and components
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup, List, ListItem } from "@material-ui/core";
// Create a useStyles Material UI component for styling
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
	styleSecondary: {
		background: "linear-gradient(-135deg, #899fd4, #a389d4)",
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
// Create the component function and export for use
export default function FormUserConfirm(props) {
	// Create the continueOne function
	const continueOne = async e => {
		e.preventDefault();

		await props.handleSubmit();

		props.nextStep();
	};
	// Create the previousOne function
	const previousOne = e => {
		e.preventDefault();
		props.previousStep();
	};

	const {
		values: {
			firstName,
			lastname,
			role,
			email,
			username,
			password,
			bio,
			thumbnail,
		},
	} = props;
	// Call the styles function
	const classes = useStyles();
	// Create the JSX for the component
	return (
		<>
			<List>
				<ListItem primaryText='First Name' secondaryText={firstName} />
				<ListItem primaryText='Last Name' secondaryText={lastname} />
				<ListItem primaryText='E-mail' secondaryText={email} />
				<ListItem primaryText='Bio' secondaryText={bio} />
				<ListItem primaryText='Thumbnail Picture' secondaryText={thumbnail} />
				<ListItem primaryText='Role' secondaryText={role} />
			</List>
			<ButtonGroup fullWidth>
				<Button
					size='large'
					className={classes.styleSecondary}
					onClick={previousOne}
				>
					Go Back
				</Button>
				<Button
					size='large'
					className={classes.styleMain}
					onClick={continueOne}
				>
					Submit
				</Button>
			</ButtonGroup>
		</>
	);
}
