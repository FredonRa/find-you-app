import styled from "styled-components";

const Titulo = styled.h1 `
    font-size: 1em;
    text-align: center;
    color: white;
    width: 40%;
`;

const TituloInicio = () => {
    return (
        <Titulo>
            <h1>Búsqueda de personas desaparecidas y extraviadas</h1>
        </Titulo> 
     );
}
 
export default TituloInicio;