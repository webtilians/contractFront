import React, { useState } from 'react';
import { ethers } from 'ethers';
import TournamentABI from '../contracts/Tournament.json';
import styled from 'styled-components';

const tournamentAddress = '0x79211af64e801B2a8C7A416B9cdFf958b50Fae67'; // Reemplaza con la dirección del contrato desplegado

const CreateTournamentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: white;
  font-family: 'Roboto', sans-serif;
`;

const FormContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 62px;
  height: 400px;
  background: linear-gradient(135deg, rgb(25 46 55), rgba(0, 121, 145, 1));
  clip-path: polygon(47% -3%, 99% 30%, 88% 74%, 38% 92%, 8% 76%, 0% 24%);
  box-shadow: 0 0 15px rgb(50 167 164);
  background: repeating-radial-gradient(#193438, #95b0b2 340px);
  &::before, &::after {
    content: '';
    position: absolute;
    width: 35%;
    height: 57%;
    background: inherit;
    border: inherit;
    clip-path: inherit;
    transform: translateY(-50%) rotate(30deg);
    top: 182px;
    left: 176px;
    z-index: -8;
  }

  &::after {
    content: '';
    position: absolute;
    background: inherit;
    border: inherit;
    clip-path: inherit;
    transform: translateY(-57%) rotate(0deg);
    top: 225px;
    left: 14px;
    opacity: 0.4;
    z-index: -1;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.base3};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 2px solid ${props => props.theme.colors.base2};
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  background-color: ${props => props.theme.colors.base3};
  color: ${props => props.theme.colors.base1};
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
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
    <CreateTournamentContainer>
      <FormContainer>
        <Title>Crear Torneo</Title>
        <form onSubmit={(e) => { e.preventDefault(); handleCreateTournament(); }}>
          <div>
            <Input
              type="text"
              placeholder="Nombre del Torneo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Cuota de Inscripción (ETH)"
              value={entryFee}
              onChange={(e) => setEntryFee(e.target.value)}
            />
          </div>
          <Button type="submit">Crear Torneo</Button>
        </form>
      </FormContainer>
    </CreateTournamentContainer>
  );
};

export default CreateTournament;