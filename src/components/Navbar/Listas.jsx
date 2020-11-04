import React from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import InfoIcon from '@material-ui/icons/Info';

const Listas = () => {
    return ( 
        <div>
            
            <List component="nav">
                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Home"/>                  
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Desaparecidos"/>                  
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="About Us"/>                  
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <InfoIcon/>
                    </ListItemIcon>
                    <ListItemText primary="¿Qué hacer?"/>                  
                </ListItem>

            </List>
            
        </div>
     );
}

export default Listas;