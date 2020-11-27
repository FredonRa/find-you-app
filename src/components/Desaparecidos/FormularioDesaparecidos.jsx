import { Container } from '@material-ui/core';
import React, {useState} from 'react';
import {makeStyles, TextField, Grid, Button, Typography, } from '@material-ui/core';
import {db} from '../firebase'
import storage from '../firebase'

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
        backgroundColor: 'pink',
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
    tituloForm: {
        textAlign: 'center'
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
    const [url, setUrl] = useState('')

    const handleChangeNombre = (e) => {
        setNombre(e.target.value)
        console.log(nombre)
    }

    const handleChangeApellido = (e) => {
        setApellido(e.target.value)
        console.log(apellido)
    }

    const handleChangeApodo = (e) => {
        setApodo(e.target.value)
        console.log(apodo)
    }

    const handleChangeEdad = (e) => {
        setAge(e.target.value);
        console.log(age)
    };
    
    const handleChangeDescripcion = (e) => {
        setDescripcion(e.target.value)
        console.log(descripcion)
    }
    
    const handleChangeSexo = (e) => {
        setSexo(e.target.value)
        console.log(sexo)
    }

    const changeImagen = e => {
        setImagen(e.target.files[0]);
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

    function nuevoRegistro (){
        db.collection('desaparecidos').add({
            fechaRegistro: Date(),
            nombre: nombre,
            apellido: apellido,
            apodo: apodo,
            edad: age,
            descripcion: descripcion,
            sexo: sexo,
            foto: url
        })
    }

    const uploadImage = async () => {
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
                        let urlImagenPersona = url;   
                        console.log(urlImagenPersona)
                    })
            }
        )
    
    };

    


    return ( 
        <Container className={classes.containerForm}>
            <Grid container spacing={3} className={classes.grid}>
            <Typography variant='h5' className={classes.tituloForm}>Llena los campos acerca de la persona que está reportando</Typography>
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
                
                <Grid item xs={12}>
                <aside id="modal" className="modal">
                    <div className="content-modal">
                        <header>
                            <input type="file" onChange={changeImagen} />
                        </header>
                    </div>
                </aside>                          
                </Grid>

                <Grid >
                    <button onClick={nuevoRegistro}>Añadir registro</button>
                    <button onClick={uploadImage} >GUARDAR</button>
                </Grid>

            </Grid>   
        </Container>
     );
}
 
export default FormularioDesaparecidos;