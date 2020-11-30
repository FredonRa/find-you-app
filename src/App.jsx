import './assets/App.css';
import Button from '@material-ui/core/Button'
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './components/TemaConfig'
import Navbar from './components/Navbar/Navbar'
import OcultarNavbar from './components/Navbar/OcultarNavbar';
import StickyFooter from './components/Footer/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import SignIn from './components/Sign-in/SingIn';
// import SingUp from './components/Sing-up/SingUp'
// import SingUp3 from './components/Sing-up/Singup3'

import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login';
import { AuthProvider } from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";
import Desaparecidos from './components/Desaparecidos/Desaparecidos'
import FormularioDesaparecidos from './components/Desaparecidos/FormularioDesaparecidos'
import DemoAPI from './components/DemoAPI';
import ConsumirAPI from './components/ConsumirAPI';
import AboutUs from './components/AboutUs/AboutUs';


function App() {
  return (
    <ThemeProvider theme={theme}>
        <AuthProvider>
        <Router>
        <Navbar/>
          <div>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/missing/form" component={FormularioDesaparecidos}/>
            <Route exact path="/login"  component={Login}/>
            <Route exact path="/signup"  component={SignUp}/>
            <Route exact path="/missing" component={Desaparecidos}/>
            <Route exact path="/DemoAPI" component={ConsumirAPI}/>
            <Route exact path="/about-us" component={AboutUs}/>
          </div>
        </Router>
      </AuthProvider>
      <OcultarNavbar />
      <StickyFooter/>
    </ThemeProvider>
  );
}

export default App;
