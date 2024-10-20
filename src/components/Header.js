import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: black; /* Background color */
  color: violet; /* Text color */
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 1000;
  height:42px;
`;

const Logo = styled.div`
  font-size: 24px; /* Font size */
  font-weight: bold;
`;

const Nav = styled.nav`
  a {
    color: violet; /* Link color */
    margin: 0 15px;
    text-decoration: none; /* No underline */
    transition: color 0.3s;

    &:hover {
      color: #dda0dd; /* Lighter violet on hover */
    }
  }
`;

const Header = () => (
  <HeaderContainer>
    <Logo>Startup Ecosystem</Logo>
    <Nav>
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#contact">Contact</a>
    </Nav>
  </HeaderContainer>
);

export default Header;
