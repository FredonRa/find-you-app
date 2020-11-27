import React, { useEffect, useState } from "react";
import app from "./firebase.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
  containerProgress:{
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  }
}))

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const classes = useStyles()
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.authentication.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return <Container className={classes.containerProgress}>
              <CircularProgress/>
          </Container>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
