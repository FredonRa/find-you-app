import React, { useEffect, useState } from "react";
import {db} from './firebase'
import firebaseConfig from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Container, Grid, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const useStyles = makeStyles((theme) => ({
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
          backgroundColor: 'pink',
          borderRadius: '20px',
          boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
          marginTop: '10px'
      },
      accordionFoto: {
          display: 'flex',
          justifyContent: 'center',
      },
      containerLista: {

      }
}))


const DemoUsuario = () => {
    const classes = useStyles()
    const [datos, setDatos] = useState([]);
    const [emailUsuario, setEmailUsuario] = useState()
    const [persona, setPersona] = useState([])
    const [pending, setPending] = useState(true);

    useEffect(()=>{
        db.collection("usuarios")
        .onSnapshot((snapshot)=>{
          const data = [];
          snapshot.forEach((doc)=>{
            data.push(doc.data());
    
          })
          setDatos([...data])        
          
        })

        const obtenerDatos = async () => {
            const data = await db.collection('desaparecidos').get()
            const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setPersona(arrayData)
        }
        obtenerDatos()      
        //   setPending(false)
    });

    const redireccionar = () => {
        window.location.replace("/DemoUsuario")
    }

    const eliminar = async (id) => {
        try {
        await db.collection('desaparecidos').doc(id).delete()
        const arrayFiltrado = persona.filter(persona => persona.id !== id)
        setPersona(arrayFiltrado);
        setTimeout(redireccionar, 1000);
        } catch (error) {
        console.log(error)
        }
    } 


    firebaseConfig.authentication.onAuthStateChanged(function(user) {
        if (user) {
            setEmailUsuario(user.email);
        }
    });


    const ListaDesaparecidos = persona.length ? persona.map((persona, index)=>{
        const EnviarRegistro = () => {
            console.log("Visualizando los datos...")
            db.collection('desaparecidos-confirmados').add({
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
            eliminar(persona.id)
            setTimeout(redireccionar, 2000);
        }
        return (
            

        <Grid item xs={12} sm={6} md={4}>
            <Container className={classes.containerDesaparecido}>
                <Typography>
                    Fecha del registro: {persona.fechaRegistro}
                </Typography>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>Foto del desaparecido</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionFoto}>
                        <img src={persona.foto} alt="foto del 'desaparecido'"/>
                    </AccordionDetails>
                </Accordion>
                <Typography>
                    Fecha de desaparición: {persona.fechaDesaparicion}
                </Typography>
                <Typography>
                    Nombre: {persona.nombre}
                </Typography>
                <Typography>
                    Apellido: {persona.apellido}
                </Typography>
                <Typography>
                    Descripción: {persona.descripcion}
                </Typography>    
                <Typography>
                    Provincia: {persona.provincia}
                </Typography>   
                <Typography>
                    Zona: {persona.zona}
                </Typography>         
               
                <Button onClick={() => eliminar(persona.id)}>Eliminar</Button>                            
                <Button onClick={EnviarRegistro}>Aceptar</Button>
                            
            </Container>
        </Grid>
    
                        
        ) 
    }) : <Container className={classes.containerAviso}><h3>No hay desaparecidos cargados</h3> </Container>

    const ListaDatos = datos.length ? datos.map((dato, index)=>{
        if( emailUsuario === dato.email && dato.admin !== true){
            window.location.replace("/");
        } else if (emailUsuario === dato.email && dato.admin === true) {
            // {setPending(false)}
            return (
                <Grid container spacing={2} className={classes.containerLista}>
                    {/* <ul>
                        <li>{dato.email}</li>
                        <li>{dato.nombre}</li>
                    </ul> */}
                    {ListaDesaparecidos}
                </Grid>
                
            )
        }
        
    }) : <h1>Cargando..</h1> 

    return (
        <> 
            {ListaDatos}
        </> 
        
    );
}
 
export default DemoUsuario;