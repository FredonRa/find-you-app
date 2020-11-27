import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import firebaseConfig from "../firebase";
import {makeStyles, Button, Container, TextField} from '@material-ui/core';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  containerForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'pink',
    borderRadius: '20px'
    
  },
  form: {
    backgroundColor: '',
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
  const classes = useStyles()
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
        
        <TextField
          name="email" 
          type="email"  
          label="Email"
          variant="outlined"
          fullWidth
          type="text"
          autoComplete="lname"
          required
          autoFocus
          margin='normal'
        />

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
        <Container className={classes.containerButtonSubmit}>
          <Button type="submit" variant="contained" color="primary" fullWidth className={classes.buttonSubmit}>Sign Up</Button>
        </Container>
        <Container className={classes.containerLink}>
          <Link to="/login" className={classes.Link}>¿Ya tenes cuenta? Click aquí</Link>
        </Container>
      </form>
      
    </Container>
      
  );
};

export default withRouter(SignUp);