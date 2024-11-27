import React, { useState } from 'react';
import { ethers } from 'ethers';
import TournamentABI from '../contracts/Tournament.json';

const tournamentAddress = '0x79211af64e801B2a8C7A416B9cdFf958b50Fae67'; // Reemplaza con la dirección del contrato desplegado

const CreateTournament = () => {
  const [name, setName] = useState('');
  const [entryFee, setEntryFee] = useState('');

  const handleCreateTournament = async () => {
    if (!window.ethereum) {
      alert('MetaMask no está instalado');
      return;
    }

    try {
      // Solicitar acceso a la cuenta de MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Crear una instancia del contrato utilizando la ABI y la dirección del contrato
      const contract = new ethers.Contract(tournamentAddress, TournamentABI.abi, signer);

      // Convertir la cuota de inscripción a wei
      const entryFeeInWei = ethers.parseUnits(entryFee, 'ether');

      // Llamar a la función createTournament del contrato
      const transaction = await contract.createTournament(name, entryFeeInWei);
      console.log('Creación de torneo enviada, esperando confirmación...');

      // Esperar hasta que la transacción sea confirmada
      await transaction.wait();
      console.log('Torneo creado');
      alert('¡Torneo creado exitosamente!');
    } catch (error) {
      console.error('Error al crear el torneo:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Crear Torneo</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleCreateTournament(); }}>
        <div>
          <label>Nombre del Torneo:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Cuota de Inscripción (ETH):</label>
          <input
            type="text"
            value={entryFee}
            onChange={(e) => setEntryFee(e.target.value)}
          />
        </div>
        <button type="submit">Crear Torneo</button>
      </form>
    </div>
  );
};

export default CreateTournament;