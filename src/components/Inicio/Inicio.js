import TituloInicio from './TituloInicio'
import styled from "styled-components";


const SectionTitulo = styled.section `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 20vh;
    background: #9ab3f5; 
    margin-top: 5.5rem;
    
    @media (min-width: 574px){
        margin-top: 4rem;
    }
`;

const Inicio = () => {
    return (
        <SectionTitulo>
            <TituloInicio/>
        </SectionTitulo>
     );
}
 
export default Inicio;
