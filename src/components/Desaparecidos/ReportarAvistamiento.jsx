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
  }
});


export default function ReportarAvistamiento({desaparecidos}) {
  const classes = useStyles();
  const array = [desaparecidos]
  const [desaparecido] = array;
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [id, setId] = useState(null);
  const [usuario, setUsuario] = useState(null)
  const [emailUsuario, setEmailUsuario] = useState(null)

  const handleClickOpen = () => {
    setOpen(true);
    setId(desaparecido.id)
  };

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
    (!usuario)? 
    alert("Debe iniciar sesión para reportar un avistamiento")
    :
    (function(){
      const date = new Date();
      const numeroDia = date.getDate();
      const mes = date.getMonth();
      const año = date.getFullYear();
      const hora = date.getHours();
      const minuto = date.getMinutes();
      const segundo = date.getSeconds();
      const meses = [
          "Enero", "Febrero", "Marzo",
          "Abril", "Mayo", "Junio", "Julio",
          "Agosto", "Septiembre", "Octubre",
          "Noviembre", "Diciembre"
      ]
      const fechaRegistro = `${numeroDia} de ${meses[mes]} del ${año} a las ${hora}:${minuto}:${segundo}`
      console.log(fechaRegistro)
      db.collection('mensaje-avistamiento').add({
          idDesaparecido: id,
          emailUsuario: emailUsuario,
          mensaje: mensaje,
          foto: desaparecido.foto,
          nombreDesaparecido: desaparecido.nombre,
          apellidoDesaparecido: desaparecido.apellido,
          fechaRegistro: fechaRegistro
      })
      setTimeout(function(){ window.location.replace("/missing"); }, 1000);
    })();
  }

  return (
    <div>
        <br />
        <Button  color="primary" onClick={handleClickOpen}>
            Reportar avistamiento
        </Button>
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth className={classes.Dialog}>
        <DialogTitle id="simple-dialog-title">Reportar avistamiento de {desaparecido.nombre} {desaparecido.apellido}</DialogTitle>
            
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