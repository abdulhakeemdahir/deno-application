// Import all relevant packages and components
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useAuthTokenStore } from "./utils/auth.js";
import { useSocketConnection } from "./utils/GlobalStates/SocketProvider";
import Providers from "./components/Providers.js";
import Routes from "./components/Routes.js";

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
            <Routes />
          </Providers>
        </div>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
