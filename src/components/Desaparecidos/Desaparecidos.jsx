import React, {useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom'
import {db} from '../firebase'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
  gridDesaparecidos: {
    //   backgroundColor: 'pink',
      display: 'flex',
      justifyContent: 'center'
  },
  Card: {
      width: '80%',
      marginTop: '20px'
  },
  gridButton: {
    //   backgroundColor: 'blue',
      marginTop:'25px',
      display: 'flex',
      justifyContent: 'center'
  },
  containerProgress:{
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  Link: {
    textDecoration: 'none',
    color: 'white'
  },
  containerAviso: {
    display: 'flex',
    justifyContent: 'center',
  }
});

const Desparecidos = () => {
    const classes = useStyles();
    const [desaparecido, setDesaparecido] = useState([]);
    const [pending, setPending] = useState(true);

    useEffect(()=>{
        db.collection("desaparecidos")
        .onSnapshot((snapshot)=>{
          const data = [];
          snapshot.forEach((doc)=>{
            data.push(doc.data());
    
          })
          setDesaparecido([...data])        
          setPending(false)
        })
      });

    const handleClick = () =>{
      <Redirect to="/"></Redirect>
    }
    
      const ListaDesaparecidos = desaparecido.length ? desaparecido.map((desaparecido, index)=>{
        return (
            <Grid xs="12" sm="6" md="4" className={classes.gridDesaparecidos}>
                <Card className={classes.Card}>
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image={desaparecido.foto}
                        onClick={handleClick}
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
                    {/* <iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&layout=button&size=small&width=89&height=20&appId" width="89" height="20"  scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe> */}
                        <Button size="small" color="primary">
                        Share
                        </Button>
                        <Button size="small" color="primary">
                        Learn More
                        </Button>
                    </CardActions>
                    </Card>
                </Grid>
        ) 
    }) : <Container className={classes.containerAviso}><h3>No hay Desaparecidos cargados</h3> </Container>
    
    if(pending){
        return <Container className={classes.containerProgress}>
                  <CircularProgress/>
              </Container>
    }
    return ( 
        <Grid container spacing={2} >
            <Grid xs="12" className={classes.gridButton}>
                <Button variant="contained" color="primary">
                    <Link to="/missing/form" className={classes.Link}>
                        Reportar un desaparecido
                    </Link>
                </Button>
            </Grid>            
            {ListaDesaparecidos}
        </Grid>
    );
}
 
export default Desparecidos;