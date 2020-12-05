
import React, {useState} from 'react';
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
import {Container} from '@material-ui/core'
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles({
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
  }
});


export default function SimpleDialogDemo({desaparecidos}) {
  const classes = useStyles();
  const array = [desaparecidos]
  const [desaparecido] = array
  
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

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
        
      </Dialog>
    </div>
  );
}

