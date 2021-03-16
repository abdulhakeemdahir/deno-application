import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Landing from "./containers/Landing";
<<<<<<< HEAD
import Main from "./containers/Main/Main";
import { UserProvider } from "../utils/GlobalStates/UserContext";
import { CauseProvider } from "../utils/GlobalStates/CauseContext";
import { NewsProvider } from "../utils/GlobalStates/NewsContext";
import { PostProvider } from "../utils/GlobalStates/PostContext";
import { TrendProvider } from "../utils/GlobalStates/TrendContext";
=======
import Main from "./containers/Main";
import Dashboard from "./containers/Dashboard";
>>>>>>> da984d4361a537f9fd95d9fb4de55a618603cf1b

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1dc4e9",
    },
    secondary: { main: "#d500f9" },
    default: {
      main: "#454545",
      // second: "#899fd4"
    },
  },
});
function App() {
<<<<<<< HEAD
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <UserProvider>
            <CauseProvider>
              <NewsProvider>
                <PostProvider>
                  <TrendProvider>
                    <Switch>
                      <Route path="/main" exact component={Main} />
                      <Route path="/" exact component={Landing} />
                    </Switch>
                  </TrendProvider>
                </PostProvider>
              </NewsProvider>
            </CauseProvider>
          </UserProvider>
        </div>
      </MuiThemeProvider>
    </Router>
  );
=======
	return (
		<Router>
			<MuiThemeProvider theme={theme}>
				<div className='App'>
					<Switch>
						<Route path='/main' exact component={Main} />
						<Route path='/dashboard' exact component={Dashboard} />
						<Route path='/' exact component={Landing} />
					</Switch>
				</div>
			</MuiThemeProvider>
		</Router>
	);
>>>>>>> da984d4361a537f9fd95d9fb4de55a618603cf1b
}

export default App;
