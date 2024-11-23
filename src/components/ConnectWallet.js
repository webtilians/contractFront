import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import detectEthereumProvider from '@metamask/detect-provider';
import { setUserAddress } from '../redux/slices/userSlice';
import SignTransaction from './SignTransaction';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.theme.colors.base3};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 50px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    background-color: ${props => props.theme.colors.base4};
    transition: all 0.5s ease;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
  }

  &:hover:before {
    transform: translate(-50%, -50%) scale(1);
  }

  &:hover {
    color: ${props => props.theme.colors.base1};
  }

  &:active {
    transform: scale(0.95);
  }
`;
const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const dispatch = useDispatch();

  // Función para conectar la wallet
  const connectWallet = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        dispatch(setUserAddress(accounts[0]));
        console.log('Wallet conectada:', accounts[0]);
      } catch (error) {
        console.error('Error al conectar con Metamask:', error);
      }
    } else {
      alert('¡Por favor instala Metamask!');
    }
  };

  return (
    <div>
      {walletAddress ? (
        <div>
          <p>Wallet conectada: {walletAddress}</p>
          {/* <SignTransaction /> */}
        </div>
      ) : (
        <Button onClick={connectWallet}>Conectar Wallet</Button>
      )}
    </div>
  );
};

export default ConnectWallet;
