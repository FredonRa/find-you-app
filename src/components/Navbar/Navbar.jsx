import React, {useState} from 'react';
import {AppBar, makeStyles, Toolbar, Typography, Button, Hidden} from '@material-ui/core'
import theme from '../TemaConfig'
import logo23 from './logo23.png'
import {Link} from "react-router-dom";
import TemporaryDrawer from './Drawer';
import firebaseConfig from "../firebase";
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';



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
    LinkMenu: {
        textDecoration: 'none',
        color: 'black'
    },
    Avatar: {
        width: '35px',
        height: '35px'
    },
    // containerAvatar: {
    //     backgroundColor: 'black',
    //     height: '50px'
    // }
    Navbar: {
        top: '0',
        position: 'fixed',
        lineHeight: '0'
    }
    
}))





const Navbar = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const redireccionar = () => {
        window.location.replace("/")
    }

    function handleSignOut() {
        firebaseConfig.authentication.signOut()
        setTimeout(redireccionar, 300);
    }

            
            const comprobarUsuario = () => {
                const user = firebaseConfig.authentication.currentUser
                if(user) {
                    return(
                            <div className={classes.containerAvatar}>
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                <Avatar className={classes.Avatar}>U</Avatar>
                            </Button>
                            <Menu
                              id="simple-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={handleClose}>Profile</MenuItem>
                              <MenuItem onClick={handleClose}>My account</MenuItem>
                              <MenuItem onClick={handleClose, handleSignOut}><Link to="/login" className={classes.LinkMenu}>Logout</Link></MenuItem>
                            </Menu>
                          </div>
                    )
                }else {
                    return(
                        <Button><Link to="/login" className={classes.Link}>Iniciar sesión</Link></Button>
                        )
                    }       
                }
                
                return ( 
        <div>
            <div className={classes.offset} />
            <AppBar position="fixed" color='primary'className={classes.Navbar}>
                <Toolbar>
                    <TemporaryDrawer/>
                        <img src={logo23} alt="logo find you" className={classes.logo}/>
                    <Typography variant="h6" className={classes.title}>
                        Find You
                    </Typography>
                    <Hidden xsDown>
                        <Button variant="text" color="inherit"><Link className={classes.Link} to="/">Home</Link></Button>
                        <Button variant="text" color="inherit"><Link className={classes.Link} to="/missing">Desaparecidos</Link></Button>
                        <Button variant="text" color="inherit"><Link className={classes.Link} to="/about-us">Sobre nosotros</Link></Button>
                        {/* <Button variant="text" color="inherit">¿Qué hacer?</Button> */}
                    </Hidden>
                    {comprobarUsuario()}
                {/* <Button variant="text" color="inherit">{!!currentUser ? ():<Link className={classes.Link} to="/login">Iniciar Sesión</Link>}</Button> */}
                </Toolbar>
            </AppBar>
        </div>
     );
}
 
export default Navbar;