import React, { useEffect, useState } from 'react';
import {TextField} from '@material-ui/core'

const ConsumirAPI = ({setProvincia}) => {

    const [provincias, setProvincias] = useState();
    const urlProvincias = 'https://apis.datos.gob.ar/georef/api/provincias'
    
    const fetchApiProv = async () => {
        const response = await fetch(urlProvincias);     
        const responseJSON = await response.json();
        setProvincias(responseJSON)
    }

    useEffect(() =>{
        fetchApiProv();
    }, [])

    return ( 
        <div>
            <TextField
                        select  
                        fullWidth
                        SelectProps={{
                            native: true,
                        }}
                        onChange={(e)=>{setProvincia(e.target.value)}}
                        variant="outlined"
                        ><option value="">Selecciona una provincia</option>
                            {!provincias ? "Cargando... " : 
                            provincias.provincias.map((provincia, index) => {
                                // const id= `${provincia.id}`
                                // console.log(id)
                                return (<option>{provincia.nombre}</option>)
                                
                            })}
            </TextField>
        </div>
     );
}
 
export default ConsumirAPI;