import React, { useState } from "react";
import { HeaderWrapper, HeaderTitulo } from "./styles/Header";
import Navbar from "./Navbar";
import MenuButton from "./MenuButton";
import logo from './logo.png'

function Header() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <HeaderWrapper>

      <HeaderTitulo>
        <img src={logo} width='40px'></img>
        <h2>Find You</h2>
      </HeaderTitulo>

      <Navbar open={open} />
      <MenuButton open={open} handleClick={handleClick} />
    </HeaderWrapper>
  );
}

export default Header;
