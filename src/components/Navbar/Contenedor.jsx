import React, {useState} from 'react';
import {
    makeStyles,
    Hidden,
}from '@material-ui/core'
import Navbar from './Navbar';
import Cajon from './Cajon';

const styles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(0),
    }
}))

const Contenedor = () => {
    const classes = styles();
    const [abrir, setAbrir] = React.useState(false)
    const accionAbrir = () => {
        setAbrir(!abrir)
    }


    return ( 
        <div className={classes.root}>
            <Navbar accionAbrir={accionAbrir} />
            <Hidden smUp>
                    <Cajon
                    variant= 'temporary'
                    open={abrir}
                    onClose={accionAbrir}
                    />
            </Hidden>
                <div className= {classes.content}>
                    <div className={classes.toolbar}></div>
                </div>
            
        </div>
     );
}
 
export default Contenedor;