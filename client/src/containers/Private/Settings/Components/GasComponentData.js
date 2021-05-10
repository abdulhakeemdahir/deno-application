import { Divider, IconButton, List, ListItem, ListItemText } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useGlobalContext } from "../../../../utils/GlobalStates/GlobalState";


const GasComponentData = ({handleOpen}) => {

  const [globalState, ] = useGlobalContext();

  return (

    <List style={{ padding: "0px 0px 0px 10px" }} component="nav">
      
      {/* Org Name  */}

      {globalState.user.role === "Organization" && (
        <ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
          <ListItemText primary="Org Name:" />
          <ListItemText primary={`${globalState.user.orgName}`} />
          <IconButton
            className="editButton"
            onClick={() => handleOpen("orgName")}
            edge="end"
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
        </ListItem>
      )}

      {globalState.user.role === "Organization" && <Divider />}

      {/* Email  */}

      <ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
        <ListItemText primary="Email:" />
        <ListItemText
          className="boldify"
          primary={`${globalState.user.email ? globalState.user.email : "- - -"}`}
        />
        <IconButton
          className="editButton"
          onClick={() => handleOpen("email")}
          edge="end"
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
      </ListItem>
      <Divider />

      {/* Phone  */}

      <ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
        <ListItemText primary="Phone:" />
        <ListItemText
          primary={`${
            globalState.user.phoneNumber ? globalState.user.phoneNumber : "- - -"
          }`}
        />
        <IconButton
          className="editButton"
          onClick={() => handleOpen("phoneNumber")}
          edge="end"
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
      </ListItem>
      <Divider />

      {/* Website  */}

      <ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
        <ListItemText primary="Website:" />
        <ListItem button style={{ justifyContent: "center", fontSize: "1.3em" }}>
          <a href={`${globalState.user.website}`} target="_blank" rel="noreferrer">
            {`${globalState.user.website ? globalState.user.website : "- - -"}`}
          </a>
        </ListItem>
        <IconButton
          className="editButton"
          onClick={() => handleOpen("website")}
          edge="end"
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
      </ListItem>
      <Divider />

      {/* Addy  */}

      <ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
        <ListItemText primary="Address:" />
        <ListItemText
          primary={`${globalState.user.address ? globalState.user.address : "- - -"}`}
        />
        <IconButton
          className="editButton"
          onClick={() => handleOpen("address")}
          edge="end"
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
      </ListItem>    
      <Divider />
    </List>
  );
};

export default GasComponentData;