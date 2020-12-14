import React, { useState, useEffect } from 'react';
import {db} from '../firebase';
import {Grid, Container, makeStyles, Typography, Button} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  media: {
    height: 250,
  },
  Card: {
    width: '80%',
    marginTop: '20px'
  },
  fotoDesaparecido: {
    width: '200px'
  },
  gridContainer: {
    borderRadius: '20px',
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
    padding: '5px',
  },
  containerTitulo: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
},
containerProgress:{
  display:'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '90vh'
},

}))

const Avistamientos = () => {
    const classes = useStyles()
    const [mensajes, setMensajes] = useState([])
    const [desaparecidos, setDesaparecidos] = useState([])
    const [pending, setPending] = useState(true);
    const [pendingEliminar, setPendingEliminar] = useState(false)


    useEffect(()=>{
      const mensajeAvistamiento = () => {
        db.collection("mensaje-avistamiento")
        .onSnapshot((snapshot)=>{
          const data = [];
          snapshot.forEach((doc)=>{
            data.push({...doc.data(), id: doc.id});
          })
          setMensajes([...data])  
          setPending(false)    
        })
      }

      const desaparecidosConfirmados = () => {
        db.collection("desaparecidos-confirmados")
        .onSnapshot((snapshot)=>{
          const data = [];
          snapshot.forEach((doc)=>{
            data.push({...doc.data(), id: doc.id});
          })
          setDesaparecidos([...data])      
        })
      }

        const unSuscribe = {
          mensajeAvistamiento: mensajeAvistamiento(),
          desaparecidosConfirmados: desaparecidosConfirmados()
        }

        return unSuscribe

      }, [desaparecidos, mensajes]);

      const eliminar = async (id) => {
        setPendingEliminar(true)
        try {
        await db.collection('mensaje-avistamiento').doc(id).delete()
        const arrayFiltrado = mensajes.filter(mensaje => mensaje.id !== id)
        setMensajes(arrayFiltrado);
        } catch (error) {
        console.log(error)
        }
        setPendingEliminar(false)
    }
    
    if(pending){
      return <Container className={classes.containerProgress}>
                <CircularProgress/>
            </Container>
    }

    if (pendingEliminar){
      return <Container className={classes.containerProgress}>
                <CircularProgress/>
            </Container>
    }

      const ListaMensajes = mensajes.length ? mensajes.map((mensaje, index)=>{

        const subirMensaje = async () => {
          setPendingEliminar(true)
          db.collection('mensaje-avistamiento-confirmado').add({
              idDesaparecido: mensaje.idDesaparecido,
              emailUsuario: mensaje.emailUsuario,
              mensaje: mensaje.mensaje,
              fechaRegistro: mensaje.fechaRegistro      
          })
          eliminar(mensaje.id)
          // setPendingEliminar(false)
        }

        if(mensaje.id === "2dL0ino178RbTa1hdLhh"){  
        return (<></>) 
        }else{
        return (
            <Grid item xs={12} sm={6} md={4} >
                <Grid container className={classes.gridContainer}>
                   
                    <Typography gutterBottom component="h2">
                      {mensaje.fechaRegistro} 
                    </Typography>
                    <Typography gutterBottom component="h2">
                      Usuario: {mensaje.emailUsuario} 
                    </Typography>
                            <img src={mensaje.foto} alt="" className={classes.fotoDesaparecido} />
                      
                                <Typography gutterBottom variant="h5" component="h2">
                                    {mensaje.nombreDesaparecido} {mensaje.apellidoDesaparecido}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Mensaje de avistamiento: {mensaje.mensaje}
                                </Typography>
                                
                            
                        <Container className={classes.containerButtons}>
                           <Button onClick={() => eliminar(mensaje.id)} className={classes.buttonEliminar}>Eliminar</Button>                            
                            <Button onClick={subirMensaje} color="primary">Aceptar</Button> 
                        </Container>
                      
                    </Grid>
                </Grid>
        )} 
      }) : <Container className={classes.containerAviso}><h3>Cargando avistamientos</h3> </Container>
      
    return ( 
        <Grid container spacing={3}>
          <Container className={classes.containerTitulo}><Typography variant="h5">Avistamientos</Typography></Container>
        {ListaMensajes}
        </Grid>
    );
}
 
export default Avistamientos;