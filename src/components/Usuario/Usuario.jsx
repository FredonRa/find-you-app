import React, {useState, useEffect} from 'react';
import firebaseConfig from '../firebase';
import {db} from '../firebase'
import {makeStyles, Grid, Typography, Container} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyle = makeStyles(() => ({
    gridContainer: {
        
    },
    gridContainerFoto: {
        // backgroundColor: 'pink',
        // width: '80%',
        display: 'flex',
        justifyContent: 'center'
    },
    fotoDesaparecido: {
        width: '250px'
    },
    gridDesaparecidos: {
        // width: '20%',
        // backgroundColor: 'blue',
        margin: '10px',
        padding: '10px',
        boxShadow: '2px 2px 8px 2px rgba(0, 0, 0, 0.4)',
        borderRadius: '22px'
    },
    titulo: {
        textAlign: 'center'
    },
    containerDesaparecidosCargados: {
        minHeight: '500px',
        // backgroundColor: 'blue'
    },
    Card: {
        width: '80%',
        marginTop: '20px'
    },
    media: {
        height: 250,
    },
    gridContainer: {
        display: 'flex',
        justifyContent: 'center'

    },
}))



const Usuario = () => {
    const [datos, setDatos] = useState([]);
    const [datos2, setDatos2] = useState([])
    const [emailUsuario, setEmailUsuario] = useState("")
    const classes = useStyle()

    useEffect(()=>{
        db.collection("desaparecidos")
        .onSnapshot((snapshot)=>{
          const data = [];
          snapshot.forEach((doc)=>{
            data.push(doc.data());
          })
          setDatos([...data])        
        })

        db.collection("desaparecidos-confirmados")
        .onSnapshot((snapshot)=>{
          const data = [];
          snapshot.forEach((doc)=>{
            data.push(doc.data());
          })
          setDatos2([...data])        
        })
    });



    const ListaDatos = datos.length ? datos.map((dato, index)=>{
        if(emailUsuario === dato.emailUsuario) {
            return (
                <Grid item xs={12} sm={6} md={4} >
                <Grid container className={classes.gridContainer}>
                    <Card className={classes.Card}>
                        <Typography >
                            {dato.fechaRegistro}
                        </Typography>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={dato.foto}
                            />
                            <CardContent>  
                                <Typography gutterBottom variant="h5" component="h2">
                                    {dato.nombre} {dato.apellido}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Ultimo avistamiento {dato.fechaDesaparicion}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Provincia: {dato.provincia}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Zona: {dato.zona}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                </Grid>
            )
        }
        
    }) : <h1>Cargando..</h1> 

    const ListaDatos2 = datos2.length ? datos2.map((dato, index)=>{
        if(emailUsuario === dato.emailUsuario) {
            return (

                <Grid item xs={12} sm={6} md={4} >
                <Grid container className={classes.gridContainer}>
                    <Card className={classes.Card}>
                        <Typography >
                            {dato.fechaRegistro}
                        </Typography>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={dato.foto}
                            />
                            <CardContent>
                                   
                                <Typography gutterBottom variant="h5" component="h2">
                                    {dato.nombre} {dato.apellido}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Ultimo avistamiento {dato.fechaDesaparicion}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Provincia: {dato.provincia}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Zona: {dato.zona}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                </Grid>



                // <Grid item xs={12} sm={5} md={4}  className={classes.gridDesaparecidos}>
                //         <Grid className={classes.gridContainerFoto}>
                //             <img src={dato.foto} alt="foto del desaparecido" className={classes.fotoDesaparecido}/>
                //         </Grid>
                //         <Typography>
                //             Nombre: {dato.nombre} {dato.apellido}
                //         </Typography>
                //         <Typography>
                //             Desaparecido desde: {dato.fechaDesaparicion}
                //         </Typography>
                //         <Typography >
                //             Cargaste este registro el: {dato.fechaRegistro}
                //         </Typography>        
                // </Grid>
            )
        }
        
    }) : <h1>Cargando..</h1>

    firebaseConfig.authentication.onAuthStateChanged(function(user) {
        if (user) {
            setEmailUsuario(user.email);
        }
    });

    return ( 
        <Grid container spacing={3} className={classes.containerDesaparecidosCargados}>
            <Grid item xs={12} className={classes.titulo}>
                <Typography variant="h5">Desaparecidos sin confirmar</Typography>
            </Grid>
            {ListaDatos}
            <Grid item xs={12} className={classes.titulo}>
                <Typography variant="h5">Desaparecidos confirmados</Typography>
            </Grid>
            {ListaDatos2}
        </Grid>
    );
}
 
export default Usuario;