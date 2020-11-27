import React from 'react';
import {withWidth,} from '@material-ui/core';

const OcultarNavbar = (props) => {
    return ( 
        <div>

        {/* <Typography variant="h6" color="initial">
            Ancho: {props.width}
        </Typography>
        <Hidden smUp>
            <Button>xs</Button>
        </Hidden> */}
        </div>
     );
}
 
export default withWidth() (OcultarNavbar);