import React from 'react';
import {Grid, makeStyles, Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    containerFoto: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    texto: {
        padding: '10px'
    },
    tituloTexto: {
        display: 'flex',
        justifyContent: 'center',
    }
}))

const AboutUs = () => {
    const classes = useStyles();
    return ( 
        <Grid container>
            {/* <Grid item xs={6} className={classes.containerFoto}>
                <img src={logo23} alt="Logo de Find You"/>
            </Grid> */}
            <Grid item xs={12} className={classes.texto}>
                <Grid container className={classes.tituloTexto}>
                    <Typography variant="h4">¿Qué es Find You?</Typography>
                </Grid>
                <Typography>Find you (Encontrarte) es una aplicación
                web de personas desaparecidas. En la
                misma podras cargar datos de una
                persona, consultarlos y darlos de baja.
                También podras observar la lista de
                desaparecidos, obtener información de
                ellos e informar algún avistamiento si
                ese es el caso.</Typography>
            </Grid>
            <Grid container>
                    <Typography variant="h5">Nuesta misión</Typography>
            </Grid>
            <Grid container className={classes.texto}>
                <Typography>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi adipisci architecto vel porro nostrum ratione ullam repellat maxime itaque earum odio saepe eos, est fugiat error libero eaque voluptates molestias.</Typography>
            </Grid>
        </Grid>    
    );
}
 
export default AboutUs;