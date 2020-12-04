import React, { useEffect, useState } from 'react';
import {TextField} from '@material-ui/core'

const ConsumirAPI = () => {

    const [provincias, setProvincias] = useState();
    const [municipios, setMunicipios] = useState();
    const [provinciaElegida, setProvinciaElegida] = useState();
    console.log(provinciaElegida)
    var prov = provinciaElegida + "";
    prov = prov.replace(/ /, "")
    
    const urlProvincias = 'https://apis.datos.gob.ar/georef/api/provincias'
    const urlMunicipios = {url: `https://apis.datos.gob.ar/georef/api/municipios?provincia=${prov}&campos=id,nombre&max=100`}
    console.log(urlMunicipios)

    const fetchApiProv = async () => {
        const response = await fetch(urlProvincias);     
        const responseJSON = await response.json();
        setProvincias(responseJSON)
    }
    
    const fetchApiMuni = async () => {
        const response = await fetch(urlMunicipios.url);     
        const responseJSON = await response.json();
        setMunicipios(responseJSON)
    }


    
    useEffect(() =>{
        fetchApiMuni();
        fetchApiProv();
    }, [])

    // useEffect(() =>{
    //      fetchApiProv();
    // }, [])
    
    
    const handleProvinciaSeleccionada = (e) => {
        setProvinciaElegida(e.target.value);
        handleUrlMunicipio()
        
        // const prov = provinciaElegida;
        // const ult2Char = prov.substr(prov.length - 2)
        // console.log(ult2Char)
    }
    
    const handleUrlMunicipio = () => {
        
    }
    
    return ( 
        <div>
            
        <TextField
                    select  
                    fullWidth
                    onChange={handleProvinciaSeleccionada}
                    SelectProps={{
                        native: true,
                    }}
                    variant="outlined"
                    ><option value="">Selecciona una provincia</option>
                        {!provincias ? "Cargando... " : 
                        provincias.provincias.map((provincia, index) => {
                            // const id= `${provincia.id}`
                            // console.log(id)
                            return (<option>{provincia.nombre}</option>)
                            
                        })}
        </TextField>
        
        <TextField
                    select  
                    fullWidth
                    onChange={handleProvinciaSeleccionada}
                    SelectProps={{
                        native: true,
                    }}
                    variant="outlined"
                    ><option value="">Selecciona un municipio</option>
                        {!municipios ? "Cargando... " : 
        municipios.municipios.map((provincia, index) => {
            return <option>{provincia.nombre}</option>
            
        })}
        </TextField>

        

        </div>
     );
}
 
export default ConsumirAPI;