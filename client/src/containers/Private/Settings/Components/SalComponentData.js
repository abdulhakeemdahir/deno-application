import { Divider, List, useMediaQuery, useTheme } from "@material-ui/core";
import ListItemComponent from "./ListItemComponent";

const SalComponentData = ({ handleOpen }) => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  const keyList = [
    "username",
    "password"
  ];
  return (
    <>
      {(() => {
        if (matches)
          return <Divider/>;
      })()}
      <List style={!matches ? { paddingLeft: "15px" } : {padding: "0px", margin: "0px"}} component="nav">
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
    </>
  );
};

export default SalComponentData;
