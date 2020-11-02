import styled from "styled-components";

export const NavbarWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,1) 57%, rgba(154,179,245,1) 86%, rgba(117,121,231,1) 100%);
  position: fixed;
  top: 12vh;
  right: ${props => (props.open ? "0" : "-100%")};
  width: 100%;
  height: 90vh;
  transition: right .6s linear;

  @media only screen and (min-width: 624px) {
    flex-direction: row;
    position: initial;
    height: auto;
    justify-content: center;
    background: white;
  }

  a {
    padding: 0.5rem 0.8rem;
    color: grey;
    text-decoration: none;
  }
`;
