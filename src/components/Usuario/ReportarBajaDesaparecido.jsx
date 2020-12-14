import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import {Container} from '@material-ui/core'
import {TextField} from '@material-ui/core';
import {db} from '../firebase';
import firebaseConfig from '../firebase';
import CircularProgress from '@material-ui/core/CircularProgress';


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
  containerMensaje: {
    marginBottom: '20px',
    width: '100%'
    
  },
  fotoDesaparecido: {
    width: 'auto',

    maxWidth: '200px'
  },
  containerProgress:{
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default function ReportarBajaDesaparecido({dato}) {
  const classes = useStyles();
  const array = [dato]
  const [desaparecido] = array;
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [id, setId] = useState(null);
  const [usuario, setUsuario] = useState(null)
  const [emailUsuario, setEmailUsuario] = useState(null)
  const [pending, setPending] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setId(desaparecido.id)
  };
  //  console.log(desaparecido)
  
  const handleClose = (value) => {
    setOpen(false);
  };

  const handleMensaje = (e) => {
      setMensaje(e.target.value)
  }

  firebaseConfig.authentication.onAuthStateChanged(function(user) {
    setUsuario(user);
    if (user) {
        setEmailUsuario(user.email);
    }
  });

  const subirMensaje = () => {
    setPending(true)
      db.collection('reporte-baja-desaparecido').add({
          idDesaparecido: id,
          emailUsuario: emailUsuario,
          mensaje: mensaje,
      })
      setTimeout(function(){ window.location.replace("/missing"); }, 1000);
      console.log("mensaje enviado")
  }

  if(pending){
    return <Container className={classes.containerProgress}>
              <CircularProgress/>
          </Container>
  } 


  return (
    <div>
        <br />
        <Button  color="primary" onClick={handleClickOpen}>
            Solicitar dar de baja
        </Button>

        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth className={classes.Dialog}>
            <DialogTitle id="simple-dialog-title">Solicitar dar de baja a {desaparecido.nombre} {desaparecido.apellido}</DialogTitle>
            
            <Container className={classes.containerMensaje}>
                {/* {desaparecido.id} */}
                <TextField
                    id="outlined-multiline-static"
                    label="Mensaje"
                    multiline
                    fullWidth
                    rows={4}
                    variant="outlined"
                    onChange={handleMensaje}
                />
            </Container>
            <Button onClick={subirMensaje}>Enviar</Button>
        </Dialog>
    </div>
  );
}