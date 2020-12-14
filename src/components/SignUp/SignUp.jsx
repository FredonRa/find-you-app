import React, { useCallback, useState } from "react";
import { withRouter } from "react-router-dom";
import firebaseConfig from "../firebase";
import {db} from "../firebase"
import {makeStyles, Button, Container, TextField, Grid} from '@material-ui/core';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  containerForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'pink',
    borderRadius: '20px',
    maxWidth: '450px',
    [theme.breakpoints.up('md')] : {
      width:'35%',
  }
    
  },
  form: {
    // backgroundColor: 'pink',
  },
  buttonSubmit: {
    margin: '20px 0 20px 0'
  },
  containerButtonSubmit: {
    display: 'flex',
    justifyContent: 'center',
  },
  containerLink: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  Link:{
    textDecoration: 'none',
    "&:hover": {
      textDecoration: 'underline'
    }
  }
}))


const SignUp = ({ history }) => {
  const classes = useStyles();
  const [nombre, setNombre] = useState(null);
  const [apellido, setApellido] = useState(null);
  const [email, setEmail] = useState(null)
  
  const nuevoRegistro = () => {
    console.log("Visualizando los datos...")
    if(nombre === null || apellido === null || email === null) {
      alert("Introduzca los datos que faltan")
    } else {
      db.collection('usuarios-registrados').add({
        fechaRegistro: Date(),
        nombre: nombre,
        apellido: apellido,
        email: email,
        admin: false
      })
    }
  }
  
  const handleNombre = (e) => {
    setNombre(e.target.value);
    console.log(nombre)
  }

  const handleApellido = (e) => {
    setApellido(e.target.value);
    console.log(apellido)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log(email)
  }
  
  
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await firebaseConfig
      .authentication
      .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }

  }, [history]);
  


  return (
    <Container className={classes.containerForm}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp} className={classes.form}>
      <Grid container spacing={1}>

        <Grid item xs={12} sm={6}>
          <TextField
              name="nombre" 
              type="nombre"  
              label="Nombre"
              variant="outlined"
              fullWidth
              autoComplete="lname"
              required
              autoFocus 
              margin='normal'
              onChange={handleNombre}    
          /> 
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
              name="apellido" 
              type="text"  
              label="Apellido"
              variant="outlined"
              fullWidth
              autoComplete="lname"
              required   
              margin='normal'   
              onChange={handleApellido}       
            /> 
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="email" 
            type="email"  
            label="Email"
            variant="outlined"
            fullWidth
            autoComplete="lname"
            required
            margin='normal'
            onChange={handleEmail}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField 
          name="password" 
          type="password"
          className={classes.input}
          label="Password"
          variant="outlined"
          fullWidth
          autoComplete="lname"
          required
          margin='normal'
          />
        </Grid>

      </Grid>

        <Container className={classes.containerButtonSubmit}>
          <Button type="submit" variant="contained" color="primary" fullWidth className={classes.buttonSubmit} onClick={nuevoRegistro}>Sign Up</Button>
        </Container>
        <Container className={classes.containerLink}>
          <Link to="/login" className={classes.Link}>¿Ya tenes cuenta? Click aquí</Link>
        </Container>
      </form>
    </Container>
      
  );
};

export default withRouter(SignUp);