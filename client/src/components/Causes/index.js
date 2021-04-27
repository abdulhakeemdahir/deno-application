//Import all relevant packages and components
import React from "react";
import "./style.css";
import HomeCauses from "./HomeCauses";
import DashboardCauses from "./DashboardCauses";

//Create the component function and export for use
const Causes = props => {
  // Destructure State and Dispatch from Context

  const urlPath = window.location.pathname;

  //Create the JSX for the component
  return (
    <div>
      {urlPath.includes("newsfeed") && <HomeCauses {...props} />}
      {urlPath.includes("dashboard") && <DashboardCauses {...props} />}
      {urlPath.includes("search") && <DashboardCauses {...props} />}
    </div>
  );
};

export default Causes;
