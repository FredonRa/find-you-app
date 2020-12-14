import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SolicitudAprobacion from './SolicitudAprobacion'
import Avistamientos from './Avistamientos';
import firebaseConfig from '../firebase';
import {db} from '../firebase'
import BajaDesaparecido from './BajaDesaparecido';
import {Grid} from '@material-ui/core'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  divContenedor: {
    minHeight: '500px'    
  }
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [emailUsuario, setEmailUsuario] = useState(null);
  const [datos, setDatos] = useState([]);

  useEffect(()=>{
    const obtenerUsuarios = () => {
      db.collection("usuarios")
      .onSnapshot((snapshot)=>{
        const data = [];
        snapshot.forEach((doc)=>{
          data.push(doc.data());
        });
        setDatos([...data])           
      });
    }

  //   const obtenerBajaDesaparecido = () => {
  //     db.collection("reporte-baja-desaparecido")
  //     .onSnapshot((snapshot)=>{
  //       const data = [];
  //       snapshot.forEach((doc)=>{
  //         data.push({...doc.data(), id: doc.id});
  //       });
  //       setBajaDesaparecido([...data])           
  //     });

  //   }
    
    const unSuscribe = {
      obtenerUsuarios: obtenerUsuarios(),
      // obtenerBajaDesaparecido: obtenerBajaDesaparecido()
    }
    return unSuscribe


  }, [datos]);
  // console.log(bajaDesaparecido)

  // const ReporteBaja = bajaDesaparecido.length ? bajaDesaparecido.map((baja, index)=>{
  //       return (
  //           <BajaDesaparecido baja={baja}/>
  //       )
  // }) : <></>

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


  firebaseConfig.authentication.onAuthStateChanged(function(user) {
    if (user) {
        setEmailUsuario(user.email);
    }
  });

  const ListaDatos = datos.length ? datos.map((dato, index)=>{
    if( emailUsuario === dato.email && dato.admin !== true){
        window.location.replace("/");
    } else if (emailUsuario === dato.email && dato.admin === true) {
        // {setPending(false)}
        return (
          <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Solicitudes de aprobación" {...a11yProps(0)} />
              <Tab label="Solicitudes de baja" {...a11yProps(1)} />
              <Tab label="Avistamientos" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <SolicitudAprobacion />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Grid container spacing={3}>
              <BajaDesaparecido />
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <Avistamientos />
            </TabPanel>
          </SwipeableViews>
        </div>
        )
    }
}) : <h1>Cargando..</h1>

  return (
    <div className={classes.divContenedor}>
    {ListaDatos}
    </div>
  );
}
