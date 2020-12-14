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
    media: {
        height: 250,
      },
      containerBajas: {
        //   backgroundColor: 'blue',
          display: 'flex',
          flexFlow: 'column',
          marginBottom: '20px',
          borderRadius: '20px',
          boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
          padding: '5px'
      },
      containerTitulo: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px'
    },
    containerProgress:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      },
}))



const BajaDesaparecido = ({baja}) => { 
    const classes = useStyles();
    const [bajaDesaparecido, setBajaDesaparecido] = useState([]);
    const [desaparecidosConfirmados, setDesaparecidosConfirmados] = useState([])
    const [pending, setPending] = useState(true);


    useEffect(()=>{
        const reporteBajaDesaparecido = () => {
            db.collection("reporte-baja-desaparecido")
            .onSnapshot((snapshot)=>{
                const data = [];
                snapshot.forEach((doc)=>{
                    data.push({...doc.data(), id: doc.id});
                });
                setBajaDesaparecido([...data])     
                setPending(false)     
            });
        }

      const desaparecidosConfirmados = () => {
        db.collection("desaparecidos-confirmados")
        .onSnapshot((snapshot)=>{
          const data = [];
          snapshot.forEach((doc)=>{
            data.push({...doc.data(), id: doc.id});
          });
          setDesaparecidosConfirmados([...data])           
        });
      }

      const unSuscribe = {
        reporteBajaDesaparecido: reporteBajaDesaparecido(),
        desaparecidosConfirmados: desaparecidosConfirmados()
      }

      return unSuscribe;

    }, [bajaDesaparecido, desaparecidosConfirmados]);

    if(pending){
        return <Container className={classes.containerProgress}>
                  <CircularProgress/>
              </Container>
    }

    const eliminarBaja = async (id) => {
        try {
        await db.collection('reporte-baja-desaparecido').doc(id).delete()
        const arrayFiltrado = bajaDesaparecido.filter(bajaDesaparecido => bajaDesaparecido.id !== id)
        bajaDesaparecido(arrayFiltrado);
        } catch (error) {
        console.log(error)
        }

        }
        const eliminarDesaparecido = async (id, id2) => {
            try {
                await db.collection('desaparecidos-confirmados').doc(id).delete()
                const arrayFiltrado = desaparecidosConfirmados.filter(desaparecidosConfirmados => desaparecidosConfirmados.id !== id)
                bajaDesaparecido(arrayFiltrado);
                
            } catch (error) {
                console.log(error)
            }      
            eliminarBaja(id2)
        }

    const ListaBajas = bajaDesaparecido.length ? bajaDesaparecido.map((desaparecido, index)=>{


        if(desaparecido.id === 'nmYEkNrDR8PHmRVqeYaC') {
            return <></>
        } else {
            return(
                <div className={classes.containerBajas}>
                {desaparecido.id}
                {desaparecido.mensaje}
                <Button onClick={() => eliminarBaja(desaparecido.id)}>Ignorar</Button>
                <Button onClick={() => eliminarDesaparecido(desaparecido.idDesaparecido, desaparecido.id)}>Dar de baja</Button>
            </div>
        )}
    }) : <></>
    // const [desaparecidos, setDesaparecidos] = useState([]);
    // const [mensajeBaja, setMensajeBaja] = useState([])

    // useEffect(()=>{
    //     return db.collection("desaparecidos-confirmados")
    //     .onSnapshot((snapshot)=>{
    //       const data = [];
    //       snapshot.forEach((doc)=>{
    //         data.push({...doc.data(), id: doc.id});
    //       })
    //       setDesaparecidos([...data])      
    //     })
    // }, [desaparecidos] );





    //     const ListaBajas = () => {
    //         return <>{baja.id}</>
    //     }

    //   const ListaBajas = desaparecidos.length ? desaparecidos.map((desaparecido, index)=>{
    //       const BajaDesaparecido = () => {
    //           db.collection('desaparecidos-dados-baja').add({
    //               emailUsuario: desaparecido.emailUsuario,
    //               fechaRegistro: desaparecido.fechaRegistro,
    //               nombre: desaparecido.nombre,
    //               apellido: desaparecido.apellido,
    //               apodo: desaparecido.apodo,
    //               edad: desaparecido.edad,
    //               descripcion: desaparecido.descripcion,
    //               sexo: desaparecido.sexo,
    //               foto: desaparecido.foto,
    //               fechaDesaparicion: desaparecido.fechaDesaparicion,
    //               provincia: desaparecido.provincia,
    //               zona: desaparecido.zona      
    //             })
    //             eliminar(baja.id)
    //         }
            
            
    //     if(baja.idDesaparecido === desaparecido.id ){
    //         return (
    //             <Grid item xs={12} sm={6} md={4} className={classes.gridDesaparecidos}>
    //             <Grid container className={classes.gridContainer}>
    //                 <Card className={classes.Card}>
    //                     <CardActionArea>
    //                         <CardMedia
    //                         className={classes.media}
    //                         image={desaparecido.foto}
    //                         />
    //                         <CardContent>
    //                         <Typography gutterBottom variant="h5" component="h2">
    //                             {desaparecido.nombre} {desaparecido.apellido}
    //                         </Typography>
    //                         <Typography variant="body2" color="textSecondary" component="p">
    //                             Solicitud de baja: {baja.mensaje}
    //                         </Typography>
    //                         </CardContent>
    //                     </CardActionArea>
    //                     <CardActions>
    //                     </CardActions>
    //                     <CardActions>
    //                     </CardActions>
    //                   <Button onClick={() => eliminar(baja.id)}>Cancelar reporte</Button>
    //                   <Button onClick={BajaDesaparecido}>Dar de baja a desaparecido</Button>
    //                   </Card>
    //                 </Grid>
    //             </Grid>
    //         )
    //     }
            
    // }) : <></>

    // console.log(baja)
    return ( 
        <Grid container spacing={3}>
            <Container className={classes.containerTitulo}><Typography variant="h5">Solicitudes de baja</Typography></Container>
            {ListaBajas}
        </Grid>    
    );
}
 
export default BajaDesaparecido;