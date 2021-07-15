import { Divider, List, useMediaQuery, useTheme } from "@material-ui/core";
import ListItemComponent from "./ListItemComponent";

const GasComponentData = ({ handleOpen }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  const keyList = ["orgName", "email", "phoneNumber", "website", "address"];
  return (
    <>
      {(() => {
        if (matches) return <Divider />;
      })()}
      <List
        style={!matches ? { paddingLeft: "15px" } : { padding: "0px", margin: "0px" }}
        component="nav"
      >
        {keyList.map((item, index) => {
          return <ListItemComponent handleOpen={handleOpen} key={index} action={item} />;
        })}
      </List>
    </>
  );
};

export default GasComponentData;
