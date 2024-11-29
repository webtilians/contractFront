import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import styled, { keyframes } from 'styled-components';
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
import LotteryApp from './components/LotteryApp'; 

const Container = styled.div`
  background-color: ${props => props.theme.colors.base1};
  color: white;
  min-height: 100vh;
  display: flex;
  align-items: center; /* Centrar en el eje vertical */
  justify-content: center; /* Centrar en el eje horizontal */
  background-image: url('/assets/fondo2.webp');
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Nav = styled.nav`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const MainContent = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  position: relative;
`;

const expandAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const NavItem = styled.li`
  position: absolute;
  margin: 1rem 0;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  animation: ${expandAnimation} 1s ease-out; /* Duración aumentada a 2 segundos */
`;

const NavLink = styled(Link)`
  display: block;
  padding: 1rem 2rem;
  background: radial-gradient(circle, ${props => props.theme.colors.base3} 0%, ${props => props.theme.colors.base3} 40%, transparent 70%);
  color: white;
  text-decoration: none;
  border: 2px solid ${props => props.theme.colors.base4};
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: polygon(27% 9.7%, 72% 11.7%, 99% 48%, 78% 85.3%, 34% 97.3%, 2% 59%);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    color: ${props => props.theme.colors.base1};
  }

  & > span {
    transform: none;
  }
`;

function PrivateRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
}

const generateRandomPositions = (numItems) => {
  const positions = [];
  const minDistance = 10; // Distancia mínima entre elementos en porcentaje

  const isTooClose = (pos1, pos2) => {
    const distance = Math.sqrt(Math.pow(pos1.top - pos2.top, 2) + Math.pow(pos1.left - pos2.left, 2));
    return distance < minDistance;
  };

  for (let i = 0; i < numItems; i++) {
    let newPos;
    let isValid;
    do {
      newPos = {
        top: Math.random() * 90,
        left: Math.random() * 90,
      };
      isValid = positions.every(pos => !isTooClose(pos, newPos));
    } while (!isValid);
    positions.push(newPos);
  }
  return positions;
};

const AppContent = ({ showNav, setShowNav }) => {
  const [positions, setPositions] = useState([]);
  const menuItems = [
    { path: "/exchange", label: "Exchange" },
    { path: "/swap", label: "Intercambiar Tokens" },
    { path: "/profile", label: "Profile" },
    { path: "/nft", label: "NFT" },
    { path: "/PersonalAgreements", label: "Contratos personales" },
    { path: "/list-item", label: "Listar Artículo" },
    { path: "/items", label: "Ver Artículos" },
    { path: "/tournaments", label: "Torneos" },
    { path: "/create-tournament", label: "Crear Torneo" },
    { path: "/deploy-nft", label: "Desplegar NFT" },
    { path: "/transfer-nft", label: "Transferir NFT" },
    { path: "/my-nfts", label: "Mis NFTs" },
    { path: "/NFtMarketplace", label: "Marketplace" },
    { path: "/login", label: "Login" },
    { path: "/lottery", label: "Lottery" }
  ];

  useEffect(() => {
    setPositions(generateRandomPositions(menuItems.length));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home setShowNav={setShowNav} showNav={showNav} />} />
        <Route path="/home" element={
          <>
            {showNav && (
              <Nav>
                <NavList>
                  {menuItems.map((item, index) => (
                    <NavItem key={index} top={positions[index]?.top} left={positions[index]?.left}>
                      <NavLink to={item.path}><span>{item.label}</span></NavLink>
                    </NavItem>
                  ))}
                </NavList>
                <ConnectWallet />
              </Nav>
            )}
          </>
        } />
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
        <Route path="/lottery" element={<LotteryApp />} />
      </Routes>
    </>
  );
};

const App = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Router>
          <AppContent showNav={showNav} setShowNav={setShowNav} />
        </Router>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
};

export default App;

