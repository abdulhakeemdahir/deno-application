// Import all relevant packages and components
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Landing from "./containers/Public/Landing";
import Explore from "./containers/Public/Explore";
import Newsfeed from "./containers/Private/Newsfeed";
import Dashboard from "./containers/Private/Dashboard";
import { useAuthTokenStore } from "./utils/auth.js";
import { useSocketConnection } from "./utils/GlobalStates/SocketProvider";
import PrivateRoute from "./components/PrivateRoute.js";
import Providers from "./components/Providers.js";
import Chatroom from "./containers/Private/Chatroom";
import Search from "./containers/Private/Search";
import SinglePost from "./containers/SinglePost";
import Analytics from "./containers/Private/Analytics";
import ErrorPage from "./containers/Public/ErrorPage";
import PublicDash from "./containers/Public/PublicDash";
// import { Settings } from "@material-ui/icons";
import SettingsPage from "./containers/Private/Settings";
// Create a useStyles Material UI component for styling
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1dc4e9"
    },
    secondary: { main: "#d500f9" },
    default: {
      main: "#454545"
    }
  }
});
// Create the component function and export for use
function App() {
  // Connect Socket
  useSocketConnection();
  // Connect Authentication
  useAuthTokenStore();
  // Create the JSX for the component
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Providers>
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
          </Providers>
        </div>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
