import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styled, { keyframes } from 'styled-components';
import SignTransaction from '../components/SignTransaction';
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

const ExchangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Cambiado a center para centrar en ambos ejes */
  justify-content: center; /* Cambiado a center para centrar en ambos ejes */
  
  text-align: center;
  color: white;
  font-family: 'Roboto', sans-serif; /* Puedes cambiar esto a cualquier fuente sofisticada que prefieras */
  animation: ${expandAnimation} .5s ease-out; /* Aplicar la animación */
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Exchange = () => {
  const navigate = useNavigate();

  return (
    <div>
      
      <button onClick={() => navigate('/home')}>atras</button>
      <ExchangeContainer>
        <Title>Intercambio de Tokens</Title>
        <SignTransaction/>
      </ExchangeContainer>
    </div>
  );
};

export default Exchange;
