import React, {useState, useEffect} from 'react';
import firebaseConfig from '../firebase';
import {db} from '../firebase'
import {makeStyles, Grid, Typography, Container} from '@material-ui/core';

const useStyle = makeStyles(() => ({
    gridContainer: {
        // backgroundColor: 'pink',
        display: 'flex',
        justifyContent: 'center'
    },
    fotoDesaparecido: {
        width: '250px'
    },
    gridDesaparecidos: {
        width: '70%',
        margin: '20px',
        padding: '10px',
        boxShadow: '2px 2px 8px 2px rgba(0, 0, 0, 0.4)',
        borderRadius: '22px'
    },
    titulo: {
        textAlign: 'center'
    }
}))



const Usuario = () => {
    const [datos, setDatos] = useState([]);
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
    });



    const ListaDatos = datos.length ? datos.map((dato, index)=>{
        if(emailUsuario === dato.emailUsuario) {
            return (
                <Grid item xs={12} sm={6} md={4} className={classes.gridDesaparecidos}>
                        <Grid className={classes.gridContainer}>
                            <img src={dato.foto} alt="foto del desaparecido" className={classes.fotoDesaparecido}/>
                        </Grid>
                        <Typography>
                            Nombre: {dato.nombre} {dato.apellido}
                        </Typography>
                        <Typography>
                            Desaparecido desde: {dato.fechaDesaparicion}
                        </Typography>
                        <Typography >
                            Cargaste este registro el: {dato.fechaRegistro}
                        </Typography>        
                </Grid>
            )
        }
        
    }) : <h1>Cargando..</h1> 

    firebaseConfig.authentication.onAuthStateChanged(function(user) {
        if (user) {
            setEmailUsuario(user.email);
        }
    });

    return ( 
        <Grid container>
            <Grid item xs={12} className={classes.titulo}>
                <Typography variant="h5">Personas cargadas</Typography>
            </Grid>
            {ListaDatos}
        </Grid>
    );
}
 
export default Usuario;