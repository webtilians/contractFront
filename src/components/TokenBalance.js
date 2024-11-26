import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CustomERC20Token from '../contracts/CustomERC20Token.json'; // Asegúrate de tener la ABI del contrato
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: white;
  font-family: 'Roboto', sans-serif; /* Puedes cambiar esto a cualquier fuente sofisticada que prefieras */
`;

const FormContainer = styled.div`
  background-color: ${props => props.theme.colors.base1};
  padding: 2rem;
  border: 2px solid ${props => props.theme.colors.base2};
  clip-path: polygon(
    25% 5%, 
    75% 5%, 
    100% 50%, 
    75% 95%, 
    25% 95%, 
    0% 50%
  ); /* Crear la forma de hexágono deformado */
  width: 400px;
  max-width: 90%;
  margin: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.base3};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const BalanceText = styled.p`
  font-size: 1.5rem;
  margin: 0.5rem 0;
  color: ${props => props.theme.colors.base3};
`;

const TokenBalance = ({ tokenAddress }) => {
  const [balance, setBalance] = useState('');
  const userAddress = useSelector((state) => state.user.address); // Obtén la direcci��n del usuario desde Redux

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
    <BalanceContainer>
      <FormContainer>
        <Title>Balance de Tokens</Title>
        <BalanceText>Dirección del Token: {tokenAddress}</BalanceText>
        <BalanceText>Balance: {balance} Tokens</BalanceText>
      </FormContainer>
    </BalanceContainer>
  );
};

export default TokenBalance;
