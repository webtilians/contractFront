import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { ethers } from 'ethers'; // Importamos ethers desde la versión 6
import { toast } from 'react-toastify';
import CreateTokenForm from '../components/CreateTokenForm'
import DeployTokenForm from '../components/DeployTokenForm';
import TransferTokenForm from '../components/TransferTokenForm';
import TokenBalance from '../components/TokenBalance';
import DeployVotingForm from '../components/DeployVotingForm';
import VotingInterface from '../components/VotingInterface';
import UserProfile from '../components/UserProfile';
import styled from 'styled-components';
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: white;
  font-family: 'Roboto', sans-serif; /* Puedes cambiar esto a cualquier fuente sofisticada que prefieras */
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.base3};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.base3};
`;

const Balance = styled.p`
  font-size: 1.5rem;
  margin: 0.5rem 0;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 2px solid ${props => props.theme.colors.base2};
  border-radius: 5px;
  width: 300px;
  font-size: 1rem;
  background-color: ${props => props.theme.colors.base3};
  color: ${props => props.theme.colors.base1};
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  margin: 0.5rem;
  background-color: ${props => props.theme.colors.base2};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.base3};
    color: ${props => props.theme.colors.base1};
  }
`;

function Profile() {
  const [ethBalance, setEthBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const userAddress = useSelector((state) => state.user.address);
const [contractAddress, setContractAddress] = useState("");

  const dispatch = useDispatch();

  // Usamos ethers.JsonRpcProvider directamente de ethers v6
  const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/7d8be3fd631b4b2ea429c8063b5866f4");

  // Obtener balance de ETH
  // Obtener balance de ETH
  useEffect(() => {
    const getEthBalance = async () => {
      if (userAddress) {
        try {
          const balance = await provider.getBalance(userAddress);
          setEthBalance(ethers.formatEther(balance));
        } catch (error) {
          console.error('Error al obtener el balance de ETH:', error);
        }
      }
    };
    getEthBalance();
  }, [userAddress]);

  // Obtener balance de tokens personalizados mediante API del servidor
  // Obtener balance de tokens personalizados mediante API del servidor
  const getTokenBalance = async () => {
    if (!contractAddress) {
      toast.error("Por favor, introduce la dirección del contrato del token.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/token/balance', {
        contractAddress,
        userAddress,
      });

      if (response.data.success) {
        setTokenBalance(response.data.balance);
      } else {
        toast.error("Error al obtener el balance del token.");
      }
    } catch (error) {
      console.error('Error al obtener el balance de tokens:', error);
      toast.error("Error al obtener el balance del token.");
    }
  };

  // Reclamar tokens de prueba desde el faucet
  const claimTestTokens = async () => {
    try {
      const response = await fetch('http://localhost:4000/faucet/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: userAddress }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Tokens de prueba enviados exitosamente.');
        // Actualizar balance de tokens después de reclamar tokens
        getTokenBalance();
      } else {
        toast.error(`Error al enviar tokens: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al reclamar tokens:', error);
    }
  };

  // Cerrar sesión del usuario
  const handleLogout = () => {
    dispatch(logout());
    toast.info('Sesión cerrada');
  };

  return (
    <ProfileContainer>
      <Title>Perfil de Usuario</Title>
      <UserProfile/>
      <Subtitle>Administra tu wallet y consulta tus balances aquí.</Subtitle>
      <Balance>Balance de ETH: {ethBalance} ETH</Balance>
      <Balance>Balance de Tokens Personalizados: {tokenBalance} TEST</Balance>
      <Input
        type="text"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
        placeholder="Dirección del contrato del token"
      />
      <TokenBalance tokenAddress="0x3F936088053469DfaA7B14aCd372674309858F73"/>
      <Button onClick={claimTestTokens}>Solicitar Tokens de Prueba</Button>
      <Button onClick={handleLogout}>Cerrar Sesión</Button>
      <DeployTokenForm/>
      <TransferTokenForm/>
      <DeployVotingForm/>
      <VotingInterface/>
    </ProfileContainer>
  );
}

export default Profile;
