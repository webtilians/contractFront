import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import styled from 'styled-components';
import Home from './pages/Home';
import Exchange from './pages/Exchange';
import Profile from './pages/Profile';
import Login from './pages/Login';
import NFT from './pages/NFT';
import PersonalAgreements from './pages/PersonalAgreements';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterForm from './components/RegistrerForm';
import ConnectWallet from './components/ConnectWallet';

const Container = styled.div`
  background-color: ${props => props.theme.colors.base1};
  color: white;
  min-height: 100vh;
  display: flex;
  background-image: url('/assets/backgroundhomme.webp');
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1; /* Asegura que el fondo esté detrás del nav */
`;

const Nav = styled.nav`
  padding: 1rem;
  max-width: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-image: url('/assets/fondonav.png');
  background-size: cover;
  background-position: center;
  z-index: 10; /* Asegura que el nav esté por encima del fondo */
  background-color: ${props => props.theme.colors.base2};
`;

const MainContent = styled.div`
  margin-left: 30vw;
  padding: 1rem;
  flex: 1;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  position: relative;
`;

const NavItem = styled.li`
  margin: 1rem 0;
  position: relative;
`;

const NavLink = styled(Link)`
  display: block;
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.base3};
  color: white;
  text-decoration: none;
  border: 2px solid ${props => props.theme.colors.base4};
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  width: 100px; /* Ajustar el tamaño del hexágono */
  height: 57.74px; /* Ajustar el tamaño del hexágono */
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: polygon(27% 9.7%, 72% 11.7%, 99% 48%, 78% 85.3%, 34% 97.3%, 2% 59%); /* Crear la forma de hexágono */

  &:hover {
    transform: scale(1.1); /* Escalar el hexágono */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    color: ${props => props.theme.colors.base1};
  }

  & > span {
    transform: none; /* No rotar el contenido */
  }
`;

function PrivateRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
}

const AppContent = () => {
  return (
    <>
      <Nav>
        <NavList>
          <NavItem>
            <NavLink to="/"><span>Home</span></NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/exchange"><span>Exchange</span></NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/profile"><span>Profile</span></NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/nft"><span>NFT</span></NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/PersonalAgreements"><span>Contratos personales</span></NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/login"><span>Login</span></NavLink>
          </NavItem>
        </NavList>
        <ConnectWallet />
      </Nav>
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/exchange"
            element={
              <PrivateRoute>
                <Exchange />
              </PrivateRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/PersonalAgreements" element={<PersonalAgreements />} />
          <Route
            path="/nft"
            element={
              <PrivateRoute>
                <NFT />
              </PrivateRoute>
            }
          />
          
        </Routes>
      </MainContent>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Router>
          <AppContent />
        </Router>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
};

export default App;

