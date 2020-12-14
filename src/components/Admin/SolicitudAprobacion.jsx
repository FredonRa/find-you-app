import React, { useEffect, useState } from "react";
import {db} from '../firebase'
import firebaseConfig from '../firebase'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Container, Grid, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';



const useStyles = makeStyles((theme) => ({
    media: {
        height: 250,
    },
    containerAviso: {
        display: 'flex',
        justifyContent: 'center',
    },
    containerProgress:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      },
      containerDesaparecido: {
          width: '90%',
          backgroundColor: '#d0e8f2',
          borderRadius: '20px',
          boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
          marginTop: '10px'
      },
      accordionFoto: {
          display: 'flex',
          justifyContent: 'center',
      },
      containerLista: {
      },
      gridContainer: {
          display: 'flex',
          justifyContent: 'center'

      },
      Card: {
        width: '80%',
        marginTop: '20px'
    },
    containerButtons: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    containerTitulo: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px'
    },
    buttonEliminar:{ 
        color: 'red'
    },
    containerListaDatos: {
        minHeight: '500px'
    }
}))


const SolicitudAprobacion = ({setDatosPersona}) => {
    const classes = useStyles()
    const [datos, setDatos] = useState([]);
    const [emailUsuario, setEmailUsuario] = useState()
    const [personas, setPersonas] = useState([])
    const [pending, setPending] = useState(true);

    useEffect(()=>{
        const obtenerUsuarios = () =>{
            db.collection("usuarios")
            .onSnapshot((snapshot)=>{
                const data = [];
                snapshot.forEach((doc)=>{
                    data.push(doc.data());
                });
                setDatos([...data])
                setPending(false)           
            });
        }
            
        const obtenerDatos = () => {
            db.collection("desaparecidos")
            .onSnapshot((snapshot)=>{
                const data = [];
                snapshot.forEach((doc)=>{
                    data.push({...doc.data(), id: doc.id});
                });
                setPersonas([...data])      
                setPending(false)     
            });
        }

        const unSuscribe = {
            obtenerUsuarios: obtenerUsuarios(),
            obtenerDatos: obtenerDatos()
        }

        return unSuscribe;

    }, [datos, personas]);


    const eliminar = async (id) => {
        try {
        await db.collection('desaparecidos').doc(id).delete()
        const arrayFiltrado = personas.filter(persona => persona.id !== id)
        setPersonas(arrayFiltrado);
        setPending(true)
        // setTimeout(redireccionar, 1000);
        } catch (error) {
        console.log(error)
        }
    } 

    firebaseConfig.authentication.onAuthStateChanged(function(user) {
        if (user) {
            setEmailUsuario(user.email);
        }
    });

    if(pending){
        return <Container className={classes.containerProgress}>
                  <CircularProgress/>
              </Container>
    }

    const ListaDesaparecidos = personas.length ? personas.map((persona, index)=>{
        const EnviarRegistro = () => {
            console.log("Visualizando los datos...")
            db.collection('desaparecidos-confirmados').add({
                emailUsuario: `${persona.emailUsuario}`,
                fechaRegistro: `${persona.fechaRegistro}`,
                nombre: `${persona.nombre}`,
                apellido: `${persona.apellido}`,
                apodo: `${persona.apodo}`,
                edad: `${persona.edad}`,
                descripcion: `${persona.descripcion}`,
                sexo: `${persona.sexo}`,
                foto: `${persona.foto}`,
                fechaDesaparicion: `${persona.fechaDesaparicion}`,
                provincia: `${persona.provincia}`,
                zona: `${persona.zona}`
            })
            setPending(true)
            eliminar(persona.id)            
        } 
        if(persona.id === "RHaHipZzVEsyJbnHQ1Ar"){
          return (<></>)  
        } else {

            return (
                <Grid item xs={12} sm={6} md={4} >
                <Grid container className={classes.gridContainer}>
                    <Card className={classes.Card}>
                    <Typography gutterBottom component="h2">
                                    {persona.fechaRegistro} 
                                </Typography>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={persona.foto}
                            />
                            <CardContent>  
                                <Typography gutterBottom variant="h5" component="h2">
                                    {persona.nombre} {persona.apellido}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Ultimo avistamiento {persona.fechaDesaparicion}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Provincia: {persona.provincia}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Zona: {persona.zona}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Descripción: {persona.descripcion}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <Container className={classes.containerButtons}>
                            <Button onClick={() => eliminar(persona.id)} className={classes.buttonEliminar}>Eliminar</Button>                            
                            <Button onClick={EnviarRegistro} color="primary">Aceptar</Button>
                        </Container>
                      </Card>
                    </Grid>
                </Grid>            
        ) 
    }
    }) : <Container className={classes.containerAviso}><h3>No hay desaparecidos cargados</h3> </Container>

    const ListaDatos = datos.length ? datos.map((dato, index)=>{
        if( emailUsuario === dato.email && dato.admin !== true){
            window.location.replace("/");
        } else if (emailUsuario === dato.email && dato.admin === true) {
            // {setPending(false)}
            return (
                <Grid container spacing={2} className={classes.containerLista}>
                    <Container >
                        <Typography variant="h6" >Solicitudes de aprobación</Typography>
                    </Container>
                    {ListaDesaparecidos}
                </Grid>
            )
        }
    }) : <h1>Cargando..</h1> 

    return (
        <Grid container className={classes.containerListaDatos}> 
            <Container className={classes.containerTitulo}><Typography variant="h5">Solicitudes de aprobación</Typography></Container>
            {ListaDesaparecidos}
        </Grid> 
        
    );
}
 
export default SolicitudAprobacion;