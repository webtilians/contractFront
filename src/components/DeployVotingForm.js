import React, { useState } from 'react';
import { ethers, ContractFactory } from 'ethers';
import { useDispatch } from 'react-redux';
import { addVotingContract, addTokenContract } from '../redux/slices/userSlice';
import VotingToken from '../contracts/VotingToken.json';
import AdvancedVoting from '../contracts/AdvancedVoting.json';

const DeployVotingForm = () => {
  const [proposal, setProposal] = useState('');
  const [duration, setDuration] = useState('');
  const dispatch = useDispatch();

  const handleDeploy = async (e) => {
    e.preventDefault();

    if (typeof window.ethereum === 'undefined') {
      alert('Metamask no está instalado. Por favor, instálalo para continuar.');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Desplegar el token primero
      const tokenFactory = new ContractFactory(
        VotingToken.abi,
        VotingToken.bytecode,
        signer
      );
      const tokenContract = await tokenFactory.deploy();
      await tokenContract.waitForDeployment();
      const tokenAddress = tokenContract.target;

      // Desplegar el contrato de votación con la dirección del token
      const votingFactory = new ContractFactory(
        AdvancedVoting.abi,
        AdvancedVoting.bytecode,
        signer
      );

      const votingDurationInSeconds = parseInt(duration) * 86400;

      const votingContract = await votingFactory.deploy(
        proposal,
        votingDurationInSeconds,
        tokenAddress
      );
      await votingContract.waitForDeployment();

      const contractAddress = votingContract.target;
      alert(
        `Contrato de votación desplegado exitosamente en la dirección: ${contractAddress}`
      );
      console.log('Dirección del contrato:', contractAddress);

      // Despachar acciones para almacenar las direcciones en el estado global
      dispatch(addVotingContract(contractAddress));
      dispatch(addTokenContract(tokenAddress));
    } catch (error) {
      console.error('Error al desplegar el contrato:', error);
      alert('Error al desplegar el contrato');
    }
  };

  return (
    <form onSubmit={handleDeploy}>
      <div>
        <label>Propuesta de Votación:</label>
        <input
          type="text"
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Duración de la Votación (en días):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          min="1"
        />
      </div>
      <button type="submit">Crear Votación</button>
    </form>
  );
};

export default DeployVotingForm;
