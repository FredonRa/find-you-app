import React from 'react';
import FormularioDesaparecidos from './FormularioDesaparecidos'
import {Link} from 'react-router-dom'
const Desparecidos = () => {
    return ( 
        <Link to="/missing/form">
            Reportar un desaparecido
        </Link>
    );
}
 
export default Desparecidos;