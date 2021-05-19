import { List, } from "@material-ui/core";
import ListItemComponent from "./ListItemComponent";

const GasComponentData = ({ handleOpen }) => {

  const keyList = [
    "orgName",
    "email",
    "phoneNumber",
    "website",
    "address"
  ];
  return (
    <List style={{ padding: "0px 0px 0px 10px" }} component="nav">
      {keyList.map((item, index) => {
        return ( 
          <ListItemComponent 
            handleOpen={handleOpen} 
            key={index}
            action={item}
          />)
      })}
    </List>
  );
};

export default GasComponentData;
