import React from 'react';
import Container from '@material-ui/core/Container';
import Carrusel from './Carrusel'
import firebaseConfig from '../firebase'
import {makeStyles} from '@material-ui/core'


const useStyles = makeStyles((theme) =>({
    container: {
        // backgroundColor: 'black'
        marginTop: '20px'
    }
}))

const Home = () => {
    const classes = useStyles()
    return ( 
        <Container className={classes.container}>
            <Carrusel/>
        </Container>
     );
}
 
export default Home;