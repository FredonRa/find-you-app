import React from 'react';
import Container from '@material-ui/core/Container';
import Carrusel from './Carrusel'
import firebaseConfig from '../firebase'

const Home = () => {
    return ( 
        <Container>
            <Carrusel/>
            <button onClick={() => firebaseConfig.authentication.signOut()}>Sign out</button>
        </Container>
     );
}
 
export default Home;