import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import InfoIcon from '@material-ui/icons/Info';
import theme from '../TemaConfig'
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  Link: {
    textDecoration: 'none',
    color: 'black',
  },
  containerHamburger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    width: '65px',
    height: '50px',
    marginRight: '10px',
    marginLeft: '-5px'
    // [theme.breakpoints.up('sm')] : {
    //   display: 'none',
    // }
  },
  toolbar: theme.mixins.toolbar,
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({ 
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
      <div className={classes.toolbar}></div>
      <Divider/>
      <List component="nav">
                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        <Link to="/" className={classes.Link}>
                        Home
                        </Link>
                    </ListItemText>                  
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        <Link to="/missing" className={classes.Link}>Desaparecidos</Link>
                    </ListItemText>                 
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        <Link to="/" className={classes.Link}>About Us</Link>
                    </ListItemText>            
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <InfoIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        <Link to="/" className={classes.Link}>¿Qué hacer?</Link>
                    </ListItemText>               
                </ListItem>

            </List>
    </div>
  );

  return (
    <Hidden smUp>
      <div className={classes.containerHamburger}>
        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            <iconButton onClick={toggleDrawer(anchor, true)}><MenuIcon aria-label="menu" color="inherit" /></iconButton>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
        
      </div>
    </Hidden>
  );
}