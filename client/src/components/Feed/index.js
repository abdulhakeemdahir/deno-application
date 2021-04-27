// Import all relevant packages and components
import React from "react";
import DashboardFeed from "./DashboardFeed";
import ExploreFeed from "./ExploreFeed";
import HomeFeed from "./HomeFeed";

// Create the component function and export for use
const Feed = props => {
  return (
    <div>
      {window.location.pathname.includes("dashboard") && (
        <DashboardFeed {...props} />
      )}
      {window.location.pathname.includes("explore") && (
        <ExploreFeed {...props} />
      )}
      {window.location.pathname.includes("newsfeed") && <HomeFeed {...props} />}
      {window.location.pathname.includes("search") && <HomeFeed {...props} />}
    </div>
  );
};

export default Feed;
