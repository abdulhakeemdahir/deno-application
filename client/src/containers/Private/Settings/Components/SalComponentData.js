import { List } from "@material-ui/core";
import ListItemComponent from "./ListItemComponent";

const SalComponentData = ({ handleOpen }) => {

  const keyList = [
    "username",
    "password"
  ];
  return (
    <List style={{ padding: "0px 0px 0px 10px" }} component="nav">
      {/* Username  */}

      {keyList.map((item, index) => {
        return (
          <ListItemComponent 
            handleOpen = {handleOpen}
            key = {index}
            action = {item}
          />)
      })}
    </List>
  );
};

export default SalComponentData;
