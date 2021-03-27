import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Landing from "./containers/Public/Landing";
import Explore from "./containers/Public/Explore";
import Newsfeed from "./containers/Private/Newsfeed";
import Dashboard from "./containers/Private/Dashboard";
import { UserProvider } from "./utils/GlobalStates/UserContext";
import { CauseProvider } from "./utils/GlobalStates/CauseContext";
import { PostProvider } from "./utils/GlobalStates/PostContext";
import { useAuthTokenStore } from "./utils/auth.js";
import { useSocketConnection } from "./utils/GlobalStates/SocketProvider";
// import { ConvoProvider } from "./utils/GlobalStates/ConvoContext";
import PrivateRoute from "./components/PrivateRoute.js";
import Chatroom from "./containers/Private/Chatroom";
import SinglePost from "./containers/SinglePost";
import Analytics from "./containers/Private/Analytics";
import ErrorPage from "./containers/Public/ErrorPage";
import { TrendingProvider } from "./utils/GlobalStates/TrendingContext";
<<<<<<< HEAD
import { ConvoProvider } from "./utils/GlobalStates/ConvoContext";
=======
import { GuessProvider } from "./utils/GlobalStates/GuessContext";
import PublicDash from "./containers/Public/PublicDash";
>>>>>>> 182eb841b768145d9ebfd16dc68b60a071c1e896
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
  useSocketConnection();

  useAuthTokenStore();

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className='App'>
          <UserProvider>
<<<<<<< HEAD
            <CauseProvider>
              <TrendingProvider>
                <PostProvider>
                  <ConvoProvider>
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
=======
            <GuessProvider>
              <CauseProvider>
                <TrendingProvider>
                  <PostProvider>
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
>>>>>>> 182eb841b768145d9ebfd16dc68b60a071c1e896
                        component={Dashboard}
                      />
                      <PrivateRoute
                        exact
<<<<<<< HEAD
                        path='/chatroom'
                        redirectTo='/'
                        component={Chatroom}
                      />
                      <Route path='/explore' exact component={Explore} />
                      <Route path='/post' exact component={SinglePost} />
                      <Route path='/analytics' exact component={Analytics} />
                      <Route path='/404' exact component={ErrorPage} />
                      <Route path='/' exact component={Landing} />
                    </Switch>
                  </ConvoProvider>
                </PostProvider>
              </TrendingProvider>
            </CauseProvider>
=======
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
                      
                      <Route path="/explore" exact component={Explore} />
                      <Route path="/post" exact component={SinglePost} />
                      <Route path="/analytics" exact component={Analytics} />
                      <Route path="/404" exact component={ErrorPage} />

                      <Route path="/" exact component={Landing} />
                    </Switch>
                  </PostProvider>
                </TrendingProvider>
              </CauseProvider>
            </GuessProvider>
>>>>>>> 182eb841b768145d9ebfd16dc68b60a071c1e896
          </UserProvider>
        </div>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
