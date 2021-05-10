import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "../containers/Public/Landing";
import Explore from "../containers/Public/Explore";
import Newsfeed from "../containers/Private/Newsfeed";
import Dashboard from "../containers/Private/Dashboard";
import PrivateRoute from "../components/PrivateRoute.js";
import Chatroom from "../containers/Private/Chatroom";
import Search from "../containers/Private/Search";
import SinglePost from "../containers/SinglePost";
import Analytics from "../containers/Private/Analytics";
import ErrorPage from "../containers/Public/ErrorPage";
import PublicDash from "../containers/Public/PublicDash";
import SettingsPage from "../containers/Private/Settings";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute
        exact
        path="/newsfeed"
        redirectTo="/"
        component={Newsfeed}
      />
      <PrivateRoute
        exact
        path="/dashboard"
        redirectTo="/"
        component={Dashboard}
      />
      <PrivateRoute
        exact
        path="/chatroom"
        redirectTo="/"
        component={Chatroom}
      />
      <PrivateRoute
        exact
        path="/dashboard/:id"
        redirectTo="/"
        component={PublicDash}
      />
      <PrivateRoute
        exact
        path="/search/:action/:search"
        redirectTo="/"
        component={Search}
      />
      <PrivateRoute
        exact
        path="/settings"
        redirectTo="/"
        component={SettingsPage}
      />
      <Route path="/explore" exact component={Explore} />
      <Route path="/post/:id" exact component={SinglePost} />
      <Route path="/analytics" exact component={Analytics} />
      <Route path="/404" exact component={ErrorPage} />
      <Route path="/" exact component={Landing} />
    </Switch>
  );
};

export default Routes;
