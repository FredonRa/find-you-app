import React from 'react';
import {AppBar, makeStyles, Toolbar, Typography, IconButton, Button, Hidden} from '@material-ui/core'
import Image from 'material-ui-image'
import theme from '../TemaConfig'
import MenuIcon from '@material-ui/icons/Menu';
import indigo from '@material-ui/core/colors/indigo'
import logo23 from './logo23.png'

const colorIndigo = indigo[600]

const useStyles = makeStyles (theme => ({
    offset: theme.mixins.toolbar,
    boton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')] : {
            display: 'none',
        }
    },
    title: {
        flexGrow: 1
    },
    logo: {
        width: '30px',
        marginRight: '10px',
    }
    // appBar: {

    // }
    
}))

const Navbar = (props) => {
    const classes = useStyles();
    return ( 
        <div>
            <AppBar position="fixed" color='primary'>
                <Toolbar>
                    <IconButton 
                        className={classes.boton} 
                        aria-label="menu" 
                        color="inherit"
                        onClick={()=> props.accionAbrir()}
                    >
                        <MenuIcon  />
                    </IconButton>

                    <img src={logo23} alt="" className={classes.logo}/>
                    <Typography variant="h6" className={classes.title}>
                        Find You
                    </Typography>
                    <Hidden xsDown>
                        <Button variant="text" color="inherit">Home</Button>
                        <Button variant="text" color="inherit">Desaparecidos</Button>
                        <Button variant="text" color="inherit">About US</Button>
                        {/* <Button variant="text" color="inherit">¿Qué hacer?</Button> */}
                    </Hidden>
                    <Button variant="text" color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </div>
     );
}
 
export default Navbar;