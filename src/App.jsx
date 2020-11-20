import './assets/App.css';
import Button from '@material-ui/core/Button'
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './components/TemaConfig'
import Navbar from './components/Navbar/Navbar'
import Listas from './components/Navbar/Listas'
import OcultarNavbar from './components/Navbar/OcultarNavbar';
import Contenedor from './components/Navbar/Contenedor';
import StickyFooter from './components/Footer/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignIn from './components/Sign-in/SingIn';
import SingUp from './components/Sing-up/SingUp'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Contenedor/>
        <Switch>
          <Route exact path="/">
            <h1>
              hola
            </h1>
          </Route>

          <Route path="/sing-in">
            <SignIn /> 
          </Route>

          <Route path="/sing-up">
            <SingUp /> 
          </Route>

          <Route path="/hola2">
            <h1>
              hola2
            </h1>
          </Route>
        </Switch>
      </Router>
      <OcultarNavbar />
      <StickyFooter/>
    </ThemeProvider>
  );
}

export default App;
