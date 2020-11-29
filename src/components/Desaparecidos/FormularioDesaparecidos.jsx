import { Container } from '@material-ui/core';
import React, {useState} from 'react';
import {makeStyles, TextField, Grid, Button, Typography, Input, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons'
import {db} from '../firebase'
import {storage} from '../firebase'
import ConsumirAPI from '../ConsumirAPI'
import { Redirect } from 'react-router-dom';

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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        width: '100%'
    },
    containerSubmit: {
        display: 'flex',
        justifyContent: 'center'
    }

    
}));

const FormularioDesaparecidos = () => {
    const classes = useStyles();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [apodo, setApodo] = useState('');
    const [age, setAge] = useState('');
    const [descripcion, setDescripcion] = useState('')
    const [sexo, setSexo] = useState('');
    const [Imagen, setImagen] = useState(null);
    const [url, setUrl] = useState(null)
    const [pronvincia, setProvincia] = useState('')

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

    const changeImagen = e => {
        setImagen(e.target.files[0]);
        // console.log(Imagen)
    }
    
    
    const handleChangeProvincia = e => {
        setProvincia(e.target.value)
        // console.log(pronvincia)
    }

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


    const nuevoRegistro = () => {
        console.log("Visualizando los datos...")
        db.collection('desaparecidos').add({
            fechaRegistro: Date(),
            nombre: nombre,
            apellido: apellido,
            apodo: apodo,
            edad: age,
            descripcion: descripcion,
            sexo: sexo,
            foto: url,
        })
        alert("Datos cargados con éxito.")
        setTimeout(function() {
            window.location.replace("/missing")
        }, 2000)
    }

    const uploadImage = async (e) => {
        e.preventDefault();
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
                        setUrl(url)
                        console.log(url)
                    })
            }
        )

        setTimeout(function(){
            (url === null) ?
            alert("Ocurrió un error, vuelva a intentar por favor.") 
            :(
                nuevoRegistro()
            )}, 4000)


    };
 
    // function registro(e) {
        
    // }

    // function nuevoRegistro (e){
    //     e.preventDefault();
    //     (uploadImage()) ?           
    //     setTimeout(registro(), 5000) :
    //     console.log("error")
    //     setTimeout(window.location.replace("/"), 3000);
    // }



    

    const handleSiguiente = () => {
        document.getElementById('paso1').style.display = 'none'
        document.getElementById('paso2').style.display = 'flex'
    }

    const handleAtras = () => {
        document.getElementById('paso1').style.display = 'flex'
        document.getElementById('paso2').style.display = 'none'
    }

    const handleSiguiente2 = () => {
        document.getElementById('paso1').style.display = 'none'
        document.getElementById('paso2').style.display = 'flex'
    }

    


    return ( 
        <form onSubmit={uploadImage}  className={classes.containerForm}>
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
                    {/* <Input 
                    type="number" 
                    variant="outlined"
                    placeholder="Edad aproximada"
                    fullWidth
                    /> */}
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
                {/* <Grid item xs={12}>
                    <ConsumirAPI onChange={handleChangeProvincia} />
                </Grid> */}
                <Grid>
                    <Button onClick={handleSiguiente}>Siguiente</Button>
                </Grid>

            </Grid>   
            <Grid container spacing={3} className={classes.containerPaso2} id='paso2'>
                    <Typography variant="h5">Paso 2</Typography>
                <Grid item xs={12}>
                    <Typography variant="h6">Carga una foto de la persona desaparecida</Typography>
                </Grid>           

                <Grid item xs={12}>
                    <input type="file" name="imagen" onChange={changeImagen} />
                </Grid>

                <Grid item xs={12}>
                    <Button onClick={handleAtras}>Atras</Button>
                    {/* <Button onClick={handleSiguiente2}>Siguiente</Button> */}
                </Grid>
                <Grid item xs={12} className={classes.containerSubmit}>
                    <Button type="submit" variant="contained" color="primary" >Añadir registro</Button>
                </Grid>
            </Grid>


        </form>
     );
}
 
export default FormularioDesaparecidos;