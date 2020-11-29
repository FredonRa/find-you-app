import React from 'react';
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
    }
    
}))





const Navbar = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleSignOut() {
        firebaseConfig.authentication.signOut()
    }

            
            const comprobarUsuario = () => {
                let user = firebaseConfig.authentication.currentUser;
                if(user) {
                    return(
                            
                            <div>
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                <Avatar>U</Avatar>
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
                        <Link to="/login" className={classes.Link}>Iniciar sesión</Link>
                    )
                }       
            }

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
                    <Button>{comprobarUsuario()}</Button>
                {/* <Button variant="text" color="inherit">{!!currentUser ? ():<Link className={classes.Link} to="/login">Iniciar Sesión</Link>}</Button> */}
                
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </div>
     );
}
 
export default Navbar;