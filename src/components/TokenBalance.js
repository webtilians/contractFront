// TokenBalance.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CustomERC20Token from '../contracts/CustomERC20Token.json'; // Asegúrate de tener la ABI del contrato
import { useSelector } from 'react-redux';

const TokenBalance = ({ tokenAddress }) => {
  const [balance, setBalance] = useState('');
  const userAddress = useSelector((state) => state.user.address); // Obtén la dirección del usuario desde Redux

  useEffect(() => {
    const getBalance = async () => {
      try {
        if (!userAddress) {
          console.error('No wallet connected');
          return;
        }

        // Solicitar acceso a Metamask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Instanciar el contrato
        const contract = new ethers.Contract(tokenAddress, CustomERC20Token.abi, signer);

        // Obtener el balance del usuario
        const balanceBigNumber = await contract.balanceOf(userAddress);
        const balanceFormatted = ethers.formatUnits(balanceBigNumber, 18);

        setBalance(balanceFormatted);
      } catch (error) {
        console.error('Error fetching token balance:', error);
      }
    };

    getBalance();
  }, [userAddress, tokenAddress]);

  return (
    <div>
      <h3>Token Balance</h3>
      <p>Balance: {balance} tokens</p>
    </div>
  );
};

export default TokenBalance;
