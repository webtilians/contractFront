import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centrar en ambos ejes */
  height: 100vh;
  text-align: center;
  color: white;
  font-family: 'Roboto', sans-serif; /* Puedes cambiar esto a cualquier fuente sofisticada que prefieras */
  animation: ${expandAnimation} 2s ease-out; /* Duración aumentada a 2 segundos */
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;

const Home = ({ setShowNav, showNav }) => {
  const navigate = useNavigate();

  const handleEnter = () => {
    setShowNav(true);
    navigate('/home');
  };

  return (
    <HomeContainer style={{ display: showNav ? 'none' : 'flex' }}>
      
      <button onClick={handleEnter}>Entrar</button>
    </HomeContainer>
  );
};

export default Home;
