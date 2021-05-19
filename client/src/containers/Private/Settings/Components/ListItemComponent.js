import { Divider, IconButton, ListItem, ListItemText } from "@material-ui/core";
import { useGlobalContext } from "../../../../utils/GlobalStates/GlobalState";
import EditIcon from "@material-ui/icons/Edit";

const ListItemComponent = ({ handleOpen, action }) => {
  const [globalState] = useGlobalContext();

  const capitalizeFirstLetter = (string) => {
    if (action === "orgName") return "Org Name"
    if (action === "phoneNumber") return "Phone Number"

    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <>
      <ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
        <ListItemText
          style={{width: "5%"}}
          primary={`${capitalizeFirstLetter(action)}: `} />
        <ListItemText 
          primary={globalState.user[action] ? globalState.user[action] : " - - - "} />
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
