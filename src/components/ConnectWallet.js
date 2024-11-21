import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import detectEthereumProvider from '@metamask/detect-provider';
import { setUserAddress } from '../redux/slices/userSlice';
import SignTransaction from './SignTransaction';

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
        <button onClick={connectWallet}>Conectar Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;
