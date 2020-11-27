import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import firebaseConfig from "../firebase.js";
import { AuthContext } from "../Auth.js";
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

const Login = ({ history }) => {
  const classes = useStyles();
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebaseConfig
          .authentication
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container className={classes.containerForm}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} className={classes.form}>
        
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
          <Button type="submit" variant="contained" color="primary" fullWidth className={classes.buttonSubmit}>Login</Button>
        </Container>
        <Container className={classes.containerLink}>
          <Link to="/signup" className={classes.Link}>¿No estás registrado registrado? Click aquí</Link>
        </Container>
      </form>
      
    </Container>
  );
};

export default withRouter(Login);
