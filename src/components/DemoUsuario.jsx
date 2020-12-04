import React, { useEffect, useState } from "react";
import {db} from './firebase'
import firebaseConfig from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Container, Typography } from '@material-ui/core';
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
          backgroundColor: 'pink',
          borderRadius: '20px',
          marginBottom: '20px',
      },
      accordionFoto: {
          display: 'flex',
          justifyContent: 'center',
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
            })
            eliminar(persona.id)
            setTimeout(redireccionar, 2000);
        }
        return (
            <Container className={classes.containerDesaparecido}>
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
            Nombre: {persona.nombre}
        </Typography>
        <Typography>
            Apellido: {persona.apellido}
        </Typography>
        <Typography>
            Descripción: {persona.descripcion}
        </Typography>                
                                
                            
                            <Button onClick={() => eliminar(persona.id)}>Eliminar</Button>                            
                            <Button onClick={EnviarRegistro}>Aceptar</Button>
                            
            </Container>
                        
        ) 
    }) : <Container className={classes.containerAviso}><h3>No hay desaparecidos cargados</h3> </Container>

    const ListaDatos = datos.length ? datos.map((dato, index)=>{
        if( emailUsuario === dato.email && dato.admin !== true){
            window.location.replace("/");
        } else if (emailUsuario === dato.email && dato.admin === true) {
            // {setPending(false)}
            return (
                <div>
                    <ul>
                        <li>{dato.email}</li>
                        <li>{dato.nombre}</li>
                    </ul>
                    {ListaDesaparecidos}
                </div>
                
            )
        }
        
    }) : <h1>Cargando..</h1> 

    return ( 
        <div>
            {ListaDatos}
            
        </div>
    );
}
 
export default DemoUsuario;