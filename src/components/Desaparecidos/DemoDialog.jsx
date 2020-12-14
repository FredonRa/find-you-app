
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import {Container, Grid} from '@material-ui/core'
import DialogContent from '@material-ui/core/DialogContent';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {db} from '../firebase'

const useStyles = makeStyles((theme)=>({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  Dialog: {
      height: 'auto',
      
  },
  container: {
      backgroundColor: 'black'
  },
  containerFoto: {
    display: 'flex',
    justifyContent: 'center',
    
  },
  containerDescripcion: {
    display: 'flex',
    flexDirection: 'column',
    justifyConten: 'space-between',
    
  },
  fotoDesaparecido: {
    width: 'auto',
    maxWidth: '200px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  containerMensaje: {
    // backgroundColor: 'blue',
    width: '100%',
    borderRadius: '20px',
    padding: '10px',
    marginBottom: '10px',
    boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.2)'
  }
}));


export default function SimpleDialogDemo({desaparecidos}) {
  const classes = useStyles();
  const array = [desaparecidos]
  const [desaparecido] = array
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mensajes, setMensajes] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  useEffect(()=>{
    db.collection("mensaje-avistamiento-confirmado")
    .onSnapshot((snapshot)=>{
      const data = [];
      snapshot.forEach((doc)=>{
        data.push({...doc.data(), id: doc.id});
      })
      setMensajes([...data])      
    })

  });


  const ListaMensajes = mensajes.length ? mensajes.map((mensaje, index)=>{
    if(desaparecido.id === mensaje.idDesaparecido){
      return (
        <Grid xs={12} className={classes.containerMensaje}>
          <Typography>{mensaje.fechaRegistro}</Typography>
          <Grid container>
            {mensaje.emailUsuario} dice:
          </Grid>
          <Grid container>
            {mensaje.mensaje}
          </Grid>
        </Grid>
        
        ) 
      }
}) : <Container className={classes.containerAviso}><h3>No hay mensajes cargados</h3> </Container>

  return (
    <div>
      <br />
      <Button  color="primary" onClick={handleClickOpen}>
        Más información
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth className={classes.Dialog}>
        <DialogTitle id="simple-dialog-title">{desaparecido.fechaRegistro}</DialogTitle>
          

          <Container className={classes.containerDescripcion}>
            <div className={classes.containerFoto}>
              <img src={desaparecido.foto} alt="" className={classes.fotoDesaparecido}/>
            </div>
          <div>
            <Typography variant="h6">
              {desaparecido.nombre} {desaparecido.apellido}, 
              de aproximadamente {desaparecido.edad} años de edad,
              con apodo {desaparecido.apodo}, 
              se perdió el {desaparecido.fechaDesaparicion}
            </Typography>
          </div>
          <div>
            <Typography variant="h6">
              Provincia: {desaparecido.provincia}
            </Typography>
          </div>
          <div>
          <Typography variant="h6">
              Zona: {desaparecido.zona}
            </Typography>
          </div>
          <div>
            <Typography variant="h6">
              Descripción: {desaparecido.descripcion}   
            </Typography>
          </div>
          </Container>

          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              Reportes de avistamiento
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                  {ListaMensajes}
              </Grid>
            </AccordionDetails>
          </Accordion>
      </Dialog>
    </div>
  );
}

