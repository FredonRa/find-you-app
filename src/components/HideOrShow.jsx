import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    div2: {
        display: 'none'
    }
}))

const HideOrShow = () => {
    const classes = useStyles();

    const handleClickMostrar = () =>{
        document.getElementById('h1Hola').style.display = "none"
        document.getElementById('h1Hola2').style.display = "block"
        
    }   

    const handleClickOcultar = () =>{
        document.getElementById('h1Hola').style.display = "none"
        document.getElementById('h1Hola2').style.display = "block"
        document.getElementById('boton1').style.display = "none"
    }

    const handleClickAtras = () =>{
        document.getElementById('h1Hola').style.display = "block"
        document.getElementById('h1Hola2').style.display = "none"
        
    }
    
    
    return (
        <div>
            <div id='h1Hola'>
                <h1>hola</h1>
                <button onClick={handleClickMostrar} id="boton1">siguiente1</button>
            </div>
            <div id='h1Hola2' className={classes.div2}>
                <h1>hola2</h1>
                <button onClick={handleClickOcultar} id="boton2">siguiente2</button>
                <button onClick={handleClickAtras} id="botonAtras">atras</button>
            </div>

            <div>
                
                
                
            </div>

        </div> 
     );
}
 
export default HideOrShow;