import './css/App.css';
import Header from "./components/Navbar/Header";
import Inicio from './components/Inicio/Inicio';
import Carrousel from './components/Carrousel/Carrousel';

function App() {
  return (
    <div className="App"> 
      <Header/>
      <Inicio/>
      <Carrousel/>
    </div>
  );
}



export default App;
