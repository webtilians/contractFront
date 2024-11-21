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
    <div>
      <h2>Perfil de Usuario</h2>
      <p>Administra tu wallet y consulta tus balances aquí.</p>
      <p>Balance de ETH: {ethBalance} ETH</p>
      <p>Balance de Tokens Personalizados: {tokenBalance} TEST</p>
      <input
        type="text"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
        placeholder="Dirección del contrato del token"
      />
      
      <TokenBalance tokenAddress="0x3F936088053469DfaA7B14aCd372674309858F73"/>
      <button onClick={claimTestTokens}>Solicitar Tokens de Prueba</button>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <UserProfile/>
      <DeployTokenForm/>
      <TransferTokenForm/>
      <DeployVotingForm/>
      <VotingInterface/>
    </div>
  );
}

export default Profile;
