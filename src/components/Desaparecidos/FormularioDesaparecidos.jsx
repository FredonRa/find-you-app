import React, {useState} from 'react';
import {makeStyles, TextField, Grid, Button, Typography, Container} from '@material-ui/core';
import {db} from '../firebase'
import {storage} from '../firebase'
import firebaseConfig from '../firebase'
import ConsumirAPI from './ConsumirAPI'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    containerForm: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    grid: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink',
        marginTop: '20px',
        width: '100%',
        [theme.breakpoints.up('sm')] : {
            width: '60%',
        }
    },
    containerButtons: {
        height: '15px',
        backgroundColor: 'blue'
    },
    inputFile:{
        padding: '10px',
        margin: '10px',
        backgroundColor:'black',
    },
    tituloForm: {
        textAlign: 'center'
    },
    containerPaso2: {
        display: 'none',
        marginTop: '20px',
        width: '100%', 
        [theme.breakpoints.up('sm')] : {
            width: '60%',
        }
        // backgroundColor: 'pink'
    },
    containerFormP3: {
        width: '80%',
        // backgroundColor: 'black'
    },
    containerSubmit: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px'
    },
    containerFormP2: {
        display: 'flex',
        justifyContent: 'center',
        
    },
    
    buttonSig: {
        display: 'flex',
        justifyContent: 'center',
    }
}));


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FormularioDesaparecidos = () => {
    const classes = useStyles();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [apodo, setApodo] = useState('');
    const [age, setAge] = useState('');
    const [descripcion, setDescripcion] = useState('')
    const [sexo, setSexo] = useState('');
    const [Imagen, setImagen] = useState(null);
    const [urlFoto, setUrlFoto] = useState(null)
    console.log(urlFoto)
    const [mostrarSnackbar, setMostrarSnackbar] = useState(false)
    const [fechaDesaparicion, setFechaDesaparicion] = useState("")
    const [provincia, setProvincia] = useState('')
    const [zona, setZona] = useState('')
    const [emailUsuario, setEmailUsuario] = useState('')

    

    const handleChangeNombre = (e) => {
        setNombre(e.target.value)
        // console.log(nombre)
    }

    const handleChangeApellido = (e) => {
        setApellido(e.target.value)
        // console.log(apellido)
    }

    const handleChangeApodo = (e) => {
        setApodo(e.target.value)
        // console.log(apodo)
    }

    const handleChangeEdad = (e) => {
        setAge(e.target.value);
        // console.log(age)
    };
    
    const handleChangeDescripcion = (e) => {
        setDescripcion(e.target.value)
        // console.log(descripcion)
    }
    
    const handleChangeSexo = (e) => {
        setSexo(e.target.value)
        // console.log(sexo)
    }

    const handleFechaDesaparicion = (e) => {
        setFechaDesaparicion(e.target.value)
    }

    const changeImagen = (e) => {
        setImagen(e.target.files[0]);
        // console.log(Imagen)
    }
    
    const handleZona = (e) => {
        setZona(e.target.value)
    }



    firebaseConfig.authentication.onAuthStateChanged(function(user) {
        if (user) {
            setEmailUsuario(user.email);
        }
    });

    const sexoPesona = [
        {
            value: null,
            label: 'Seleccione un Género'
        },
        {
            value: 'Hombre',
            label: 'Hombre'
        },
        {
            value: 'Mujer',
            label: 'Mujer'
        },
        {
            value: 'Otro',
            label: 'Otro'
        }
    ]

    const nuevoRegistro = async (e) => {
        e.preventDefault();
        console.log("Visualizando los datos...")
            const date = new Date();
            const numeroDia = date.getDate();
            const mes = date.getMonth();
            const año = date.getFullYear();
            const hora = date.getHours();
            const minuto = date.getMinutes();
            const segundo = date.getSeconds();
            const meses = [
                "Enero", "Febrero", "Marzo",
                "Abril", "Mayo", "Junio", "Julio",
                "Agosto", "Septiembre", "Octubre",
                "Noviembre", "Diciembre"
            ]
            const fechaRegistro = `${numeroDia} de ${meses[mes]} del ${año} a las ${hora}:${minuto}:${segundo}`
            console.log(fechaRegistro)
            db.collection('desaparecidos').add({
                emailUsuario: emailUsuario,
                fechaRegistro: fechaRegistro,
                nombre: nombre,
                apellido: apellido,
                apodo: apodo,
                edad: age,
                descripcion: descripcion,
                sexo: sexo,
                foto: urlFoto,
                fechaDesaparicion: fechaDesaparicion,
                provincia: provincia,
                zona: zona
            })

            console.log("Datos cargados con éxito.");
            setMostrarSnackbar(true)
        
        setTimeout(function() {
            window.location.replace("/missing");
        }, 2000)
    }

    const Snackbar = () => {
        (mostrarSnackbar) ?
        <div>
            soy un snackbar
        </div> 
        : 
        <></>
    }


    const uploadImage = async (e) => {
        const uploadTask = storage.ref(`images/${Imagen.name}`).put(Imagen)
        uploadTask.on(
            'state_changed',
            snapshot =>{},
            error =>{
                console.log(error);
            },
            () => {
                storage
                    .ref('images')
                    .child(Imagen.name)
                    .getDownloadURL()
                    .then(url => {  
                        setUrlFoto(url)
                        console.log(urlFoto) 
                    })
            }
        )

        // setTimeout(function(){
        //     (urlFoto !== null) ?
        //         nuevoRegistro()
        //     :
        //         alert("Ocurrió un error, intente nuevamente")
        // }, 7000);
    }



    const handleSiguiente = () => {
        document.getElementById('paso1').style.display = 'none'
        document.getElementById('paso2').style.display = 'flex'
    }

    const handleAtras = () => {
        document.getElementById('paso1').style.display = 'flex'
        document.getElementById('paso2').style.display = 'none'
    }

    const handleSiguiente2 = () => {
        uploadImage()
        document.getElementById('paso2').style.display = 'none'
        document.getElementById('paso3').style.display = 'flex'
        
    }

    const handleAtras2 = () => {
        document.getElementById('paso2').style.display = 'flex'
        document.getElementById('paso3').style.display = 'none'
    }

    return ( 
        <form onSubmit={nuevoRegistro}  className={classes.containerForm}>

            <Grid container spacing={3} className={classes.grid} id="paso1">
                <Grid item xs={12}>
                    <Typography variant='h5' className={classes.tituloForm}>Paso 1</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6' className={classes.tituloForm}>Llena los campos acerca de la persona que está reportando</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    name="nombre" 
                    type="text"  
                    label="Nombre/s"
                    onChange={handleChangeNombre}
                    variant="outlined"
                    fullWidth
                    autoComplete="fname"
                    required
                    autoFocus
                    />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <TextField
                    name="apellido" 
                    type="text"  
                    label="Apellido/s"
                    onChange={handleChangeApellido}
                    variant="outlined"
                    fullWidth
                    autoComplete="lname"
                    required
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                    name="apodo" 
                    type="text"  
                    onChange={handleChangeApodo}
                    label="Apodo (opcional)"
                    variant="outlined"
                    fullWidth
                    autoComplete="lname"           
                    />
                </Grid>

                <Grid item xs={12} >
                    <TextField
                    name="edad" 
                    type="number"
                    onChange={handleChangeEdad}
                    label="Edad aproximada"
                    variant="outlined"
                    fullWidth
                    autoComplete="lname"   
                    required                
                    />
                </Grid>

                <Grid item xs={12} >
                    <TextField
                    name="descripcion"
                    type="text"
                    label="Descripción (caracteristicas físicas)"
                    onChange={handleChangeDescripcion}
                    placeholder="Ejemplo: mide 1.70m, flaco, pelo oscuro, tatuaje en el brazo derecho, llevaba jean y remera blanca"
                    required
                    id="outlined-multiline-static"
                    multiline
                    rows={6}
                    variant="outlined"
                    fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                    select  
                    value={sexo}
                    onChange={handleChangeSexo}
                    fullWidth
                    SelectProps={{
                        native: true,
                    }}
                    variant="outlined"
                    >
                        {sexoPesona.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </Grid>

                <Grid>
                    <Button onClick={handleSiguiente} variant="contained">Siguiente</Button>
                </Grid>

            </Grid>   

            <Grid container spacing={5} className={classes.grid, classes.containerPaso2} id='paso2'>
                <Grid item xs={12} >
                    <Button onClick={handleAtras} variant="contained" >Atras</Button>
                </Grid>
                <Grid item xs ={12} className={classes.containerFormP2}>
                    <Typography variant="h5">Paso 2</Typography>
                </Grid>
                <Grid item xs={12} className={classes.containerFormP2}>
                    <Typography variant="h6">Carga una foto de la persona desaparecida</Typography>
                </Grid>           

                <Grid item xs={12} className={classes.containerFormP2}>
                    <input type="file" name="imagen" onChange={changeImagen} />
                </Grid>
                <Grid item xs={12} className={classes.buttonSig}>
                    <Button onClick={handleSiguiente2} variant="contained" >Siguiente</Button>
                </Grid>
            </Grid>

            <Grid container spacing={5} className={classes.containerPaso2} id='paso3'>
                <Grid item xs={12} >
                    <Button onClick={handleAtras2} variant="contained" >Atras</Button>
                </Grid>
                <Grid item xs ={12} className={classes.containerFormP2}>
                    <Typography variant="h5">Paso 3</Typography>
                </Grid>
                <Grid item xs={12} className={classes.containerFormP2}>
                    <Typography variant="h6">Cargá la fecha y el lugar en donde desapareció</Typography>
                </Grid>           

                <Grid item xs={12} >
                    <TextField
                        id="date"
                        label="Fecha de desaparición"
                        type="date"
                        defaultValue="2017-05-24"
                        variant="outlined"
                        fullWidth
                        className={classes.textField}
                        onChange={handleFechaDesaparicion}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </Grid>

                <Grid item xs={12} >
                    <ConsumirAPI setProvincia={setProvincia} />
                </Grid>
                
                <Grid item xs={12} >
                    <TextField
                    name="zona" 
                    type="text"
                    onChange={handleZona}
                    label="Zona"
                    variant="outlined"
                    fullWidth
                    autoComplete="lname"   
                    required                
                    />
                </Grid>

                <Grid container>
                    <Grid item xs={12} className={classes.containerSubmit}>
                        <Button type="submit" variant="contained" color="primary" >Añadir registro</Button>
                    </Grid>
                    {Snackbar()}
                </Grid>
                
            </Grid>


        </form>
     );
}

export default FormularioDesaparecidos;