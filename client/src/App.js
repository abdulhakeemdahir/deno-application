import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Landing from "./containers/Landing";
import Newsfeed from "./containers/Newsfeed";
import Dashboard from "./containers/Dashboard";
import { UserProvider } from "./utils/GlobalStates/UserContext";
import { CauseProvider } from "./utils/GlobalStates/CauseContext";
import { PostProvider } from "./utils/GlobalStates/PostContext";
import { useAuthTokenStore } from "./utils/auth.js";
import { SocketProvider } from "./utils/GlobalStates/SocketProvider";
// import { ConvoProvider } from "./utils/GlobalStates/ConvoContext";
import PrivateRoute from "./components/PrivateRoute.js";
import Chatroom from "./containers/Chatroom";
//import GuestRoute from "./components/GuestRoute.js"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1dc4e9"
    },
    secondary: { main: "#d500f9" },
    default: {
      main: "#454545"
      // second: "#899fd4"
    }
  }
});
function App() {
  useAuthTokenStore();

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className='App'>
          <SocketProvider>
            <UserProvider>
              <CauseProvider>
                  <PostProvider>
                      <Switch>
                        <PrivateRoute
                          exact
                          path='/newsfeed'
                          redirectTo='/'
                          component={Newsfeed}
                        />

                        <PrivateRoute
                          exact
                          path='/dashboard'
                          redirectTo='/'
                          component={Dashboard}
                        />

                        <Route path='/explore' exact component={Newsfeed} />

                        <Route path='/chatroom' exact component={Chatroom} />

                        <Route path='/' exact component={Landing} />
                      </Switch>
                  </PostProvider>
              </CauseProvider>
            </UserProvider>
          </SocketProvider>
        </div>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
