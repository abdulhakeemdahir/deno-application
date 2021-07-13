// Import all relevant packages and components
import React from "react";
import { Button, ButtonGroup, List, ListItem } from "@material-ui/core";
import updateFormStyles from "../useStyles/formStyles";

// Create the component function and export for use
const FormUserConfirm = props => {
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
    values: { firstName, lastname, role, email, bio, thumbnail }
  } = props;
  // Call the styles function
  const classes = updateFormStyles();
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
          onClick={previousOne}>
          Go Back
        </Button>
        <Button
          size='large'
          className={classes.styleMain}
          onClick={continueOne}>
          Submit
        </Button>
      </ButtonGroup>
    </>
  );
};

export default FormUserConfirm;
