import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {colors, Grid, Paper, Typography} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import hug3 from './hug3.jpg';
import hug2 from './hug2.jpg'
import {Link} from 'react-router-dom';
import { BorderColor } from '@material-ui/icons';




const useStyles = makeStyles ((theme) => ({
    root: {
        margin: '0',
    },
    containerPhoto: {
        backgroundColor: 'black',
        width: '100%',
        height: '600px',
        backgroundImage: `url(${hug3})`,
        backgroundPosition: 'center', 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column'
    },
    containerPhoto2: {
        backgroundColor: 'black',
        width: '100%',
        height: '600px',
        backgroundImage: `url(${hug2})`,
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        
        
    },
    Carousel: {
        width: '100%',
        height: '500px',
        backgroundColor: 'pink',
    },
    Grid: {
        position: 'relative',
        backgroundColor: 'pink',
        // '&:hover': {
        //     transition: 'opacity .1s linear .3s',
        //     opacity: '70%',  
        // }     
    },
    Link: {
        textDecoration: 'none',
        color: 'black',
        border: '3px',
    },
    LinkMasInfo: {
        textDecoration: 'none',
        color: 'white',
    },
    textoFoto: {
        color: 'white'
    }
}))
 
function Carrusel(props){
    const classes = useStyles()
    const description = "Reporta un desaparecido";
    var items = [
        {
            route: '/',
            name: <div>hola</div>,
            content: 
            <Grid container>
               <Grid item sm={12} className={classes.Grid}> <Container className={classes.containerPhoto2}><Typography variant='h2' >Ayudanos a encontrarte</Typography></Container></Grid>
            </Grid>
            
        },

        {
            route: '/',
            name: <div>hola</div>,
            content: 
            <Grid container>
               <Grid item sm={12} className={classes.Grid}> <Container className={classes.containerPhoto}><Typography variant='h3' color="light" className={classes.textoFoto}>Reporta un desaparecido</Typography><Button variant="contained" color="primary"><Link to="/missing" className={classes.LinkMasInfo}>Mas información</Link></Button></Container></Grid>
            </Grid>
            
        },
        
    ]
 
    return (
        <Carousel className={classes.Carousel}>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}
 
function Item(props)
{
    const classes = useStyles()
    return (
        <Link to={props.item.route} className={classes.Link}>
            <Paper>
                {props.item.content}
            </Paper>
        </Link>
    )
}

export default Carrusel;