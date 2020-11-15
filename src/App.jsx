import './assets/App.css';
import Button from '@material-ui/core/Button'

import {ThemeProvider} from '@material-ui/core/styles'
import theme from './components/TemaConfig'
import Navbar from './components/Navbar/Navbar'
import Listas from './components/Navbar/Listas'
import OcultarNavbar from './components/Navbar/OcultarNavbar';
import Contenedor from './components/Navbar/Contenedor';
import StickyFooter from './components/Footer/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Contenedor/>
      <OcultarNavbar />
      <StickyFooter/>
    </ThemeProvider>
  );
}

export default App;
