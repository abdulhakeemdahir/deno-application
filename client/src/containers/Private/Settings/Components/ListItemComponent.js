import { Divider, Grid, IconButton, ListItem, ListItemText } from "@material-ui/core";
import { useGlobalContext } from "../../../../utils/GlobalStates/GlobalState";
import EditIcon from "@material-ui/icons/Edit";


// This component is designed to be imported into the Settings Tab components for dynamic rendering.
const ListItemComponent = ({ handleOpen, action }) => {
  const [globalState] = useGlobalContext();

  const capitalizeFirstLetter = (string) => {
    if (action === "orgName") return "Org Name"
    if (action === "phoneNumber") return "Phone"

    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <>
      <ListItem style={{ width: "100%", paddingLeft: "0", paddingRight: "0", marginTop: "10px", marginBottom: "10px" }}>
        <ListItemText
          style={{width: "5%"}}
          primary={`${capitalizeFirstLetter(action)}: `} />
        <ListItemText 
          primary={globalState.user[action] ? globalState.user[action] : " - - - - "} 
          style={{width: "55%", textAlign: "center"}}
          multiline
          />
        <IconButton
          className="editButton"
          onClick={() => handleOpen(action)}
          edge="end"
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default ListItemComponent;
