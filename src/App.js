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
import ListItemForm from './components/ListItemForm';
import ItemList from './components/ItemList';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterForm from './components/RegistrerForm';
import ConnectWallet from './components/ConnectWallet';
import TokenSwap from './components/TokenSwap';
import TournamentList from './components/TournamentList';
import CreateTournament from './components/CreateTournament';
import DeployNFTForm from './components/DeployNFTForm';
import TransferNFTForm from './components/TransferNFTForm';
import NFTList from './components/NFTList';
import NFtMarketplace from './components/NFTMarketPlace';

const Container = styled.div`
  background-color: ${props => props.theme.colors.base1};
  color: white;
  min-height: 100vh;
  display: flex;
  background-image: url('/assets/backhome.webp');
  background-size: cover;
  background-position: center;
  position: relative;
  // z-index: 1; /* Asegura que el fondo esté detrás del nav */
`;

const Nav = styled.nav`
  
`;

const MainContent = styled.div`
 align-items: center;
    justify-content: center;
    display: flex;
    flex:1;
;
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
  height: 40px; /* Ajustar el tamaño del hexágono */
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
            <NavLink to="/swap"><span>Intercambiar Tokens</span></NavLink>
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
            <NavLink to="/list-item"><span>Listar Artículo</span></NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/items"><span>Ver Artículos</span></NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/tournaments"><span>Torneos</span></NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/create-tournament"><span>Crear Torneo</span></NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/deploy-nft"><span>Desplegar NFT</span></NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/transfer-nft"><span>Transferir NFT</span></NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/my-nfts"><span>Mis NFTs</span></NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/NFtMarketplace"><span>Marketplace</span></NavLink>
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
          <Route path="/swap" element={<TokenSwap />} />
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
          <Route path="/list-item" element={<ListItemForm />} />
          <Route path="/items" element={<ItemList />} />
          <Route path="/tournaments" element={<TournamentList />} />
          <Route path="/create-tournament" element={<CreateTournament />} />
          <Route path="/deploy-nft" element={<DeployNFTForm />} />
          <Route path="/transfer-nft" element={<TransferNFTForm />} />
          <Route path="/my-nfts" element={<NFTList />} />
          <Route path="/NFtMarketplace" element={<NFtMarketplace />} />
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

