import React, {useState, useEffect} from 'react';
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
import { Container, Grid, Typography, Button, makeStyles } from '@material-ui/core';
import {db} from '../firebase'
const useStyles = makeStyles(()=>({

}))

const BajaDesaparecido = () => {
    const classes = useStyles()
    const [personas, setPersonas] = useState([])
    
    useEffect(()=>{
        const obtenerDatos = async () => {
            const data = await db.collection('desaparecidos-confirmados').get()
            const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setPersonas(arrayData)
        }
        obtenerDatos();  
    })

    const eliminar = async (id) => {
        try {
        await db.collection('desaparecidos-confirmados').doc(id).delete()
        const arrayFiltrado = personas.filter(persona => persona.id !== id)
        setPersonas(arrayFiltrado);
        // setTimeout(redireccionar, 1000);
        } catch (error) {
        console.log(error)
        }
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
            eliminar(persona.id)            
        }

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
    }) : <Container className={classes.containerAviso}><h3>No hay desaparecidos cargados</h3> </Container>



    return ( 
        {ListaDesaparecidos}
    );
}
 
export default BajaDesaparecido;