// Import all relevant packages and components
import React from "react";
import formStyles from "../useStyles/formStyles";
import { Button, ButtonGroup, List, ListItem } from "@material-ui/core";

const FormOrgConfirm = props => {
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
  const classes = formStyles();
  // Create the JSX for the component
  return (
    <>
      <List>
        <ListItem primaryText="First Name" secondaryText={firstName} />
        <ListItem primaryText="Last Name" secondaryText={lastname} />
        <ListItem primaryText="E-mail" secondaryText={email} />
        <ListItem primaryText="Bio" secondaryText={bio} />
        <ListItem primaryText="Thumbnail Picture" secondaryText={thumbnail} />
        <ListItem primaryText="Role" secondaryText={role} />
      </List>
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
          Submit
        </Button>
      </ButtonGroup>
    </>
  );
};

export default FormOrgConfirm;
