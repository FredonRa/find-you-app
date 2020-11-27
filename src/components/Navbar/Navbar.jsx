import React from 'react';
import {AppBar, makeStyles, Toolbar, Typography, IconButton, Button, Hidden, Drawer} from '@material-ui/core'
import Image from 'material-ui-image'
import theme from '../TemaConfig'
import MenuIcon from '@material-ui/icons/Menu';
import indigo from '@material-ui/core/colors/indigo'
import logo23 from './logo23.png'
import {Link} from "react-router-dom";
import TemporaryDrawer from './Drawer';


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
    },
    Link: {
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            transition: 'color 0.2s linear 0.3s',
            color: '#e8e8e8',
        }
    },
    
    // appBar: {

    // }
    
}))

const Navbar = (props) => {
    const classes = useStyles();
    return ( 
        <div>
            <AppBar position="fixed" color='primary'>
                <Toolbar>
                    {/* <IconButton 
                        className={classes.boton} 
                        aria-label="menu" 
                        color="inherit"
                        onClick={()=> props.accionAbrir()}
                    >
                        <MenuIcon  />
                    
                    </IconButton> */}
                    
                    <TemporaryDrawer/>
                    

                    <img src={logo23} alt="" className={classes.logo}/>
                    <Typography variant="h6" className={classes.title}>
                        Find You
                    </Typography>
                    <Hidden xsDown>
                        <Button variant="text" color="inherit"><Link className={classes.Link} to="/">Home</Link></Button>
                        <Button variant="text" color="inherit"><Link className={classes.Link} to="/missing">Desaparecidos</Link></Button>
                        <Button variant="text" color="inherit"><Link className={classes.Link} to="/about-us">About US</Link></Button>
                        {/* <Button variant="text" color="inherit">¿Qué hacer?</Button> */}
                    </Hidden>
                    <Button variant="text" color="inherit"><Link className={classes.Link} to="/login">Iniciar Sesión</Link></Button>
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </div>
     );
}
 
export default Navbar;