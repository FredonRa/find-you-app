import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {db} from '../firebase'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  gridDesaparecidos: {
      backgroundColor: 'pink',
      display: 'flex',
      justifyContent: 'center'
  },
  Card: {
      width: '80%',
      marginTop: '20px'
  },
  gridButton: {
      backgroundColor: 'blue',
      marginTop:'20px'
  }
});

const Desparecidos = () => {
    const classes = useStyles();
    const [desaparecido, setDesaparecido] = useState([]);

    useEffect(()=>{
        db.collection("desaparecidos")
        .onSnapshot((snapshot)=>{
          const data = [];
          snapshot.forEach((doc)=>{
            data.push(doc.data());
    
          })
          setDesaparecido([...data])        
        })
      });
    
      const ListaDesaparecidos = desaparecido.length ? desaparecido.map((desaparecido, index)=>{
        return (
            <Grid xs="8" sm="6" md="4" className={classes.gridDesaparecidos}>
                <Card className={classes.Card}>
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {desaparecido.nombre} {desaparecido.apellido}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {desaparecido.descripcion}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        Share
                        </Button>
                        <Button size="small" color="primary">
                        Learn More
                        </Button>
                    </CardActions>
                    </Card>
                </Grid>
        //   <ul key={index}>
        //     <li>Nombre: {desaparecido.nombre}</li>
        //     <li>Apellido: {desaparecido.apellido}</li>
        //     <li>Descripcion: {desaparecido.descripcion}</li>    
        //   </ul>
        ) 
      }) : <li>No hay usuarios nuevos</li> ;


    return ( 
        <Grid container spacing={3} >
            <Grid xs="12" className={classes.gridButton}>
                <Link to="/missing/form">
                    Reportar un desaparecido
                </Link>
            </Grid>
            
                {ListaDesaparecidos}
            
        </Grid>
    );
}
 
export default Desparecidos;