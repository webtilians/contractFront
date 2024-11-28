import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import TournamentABI from '../contracts/Tournament.json';
import styled from 'styled-components';
const tournamentAddress = '0x79211af64e801B2a8C7A416B9cdFf958b50Fae67';

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
const TournamentList = () => {
    const [tournaments, setTournaments] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [prizePool, setPrizePool] = useState('0');

  useEffect(() => {
    const loadTournaments = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(tournamentAddress, TournamentABI.abi, provider);
      const count = await contract.tournamentCount();
      const loadedTournaments = [];
      for (let i = 1; i <= count; i++) {
        const tournament = await contract.tournaments(i);
        loadedTournaments.push(tournament);
      }
      setTournaments(loadedTournaments);
    };
    loadTournaments();
  }, []);

  const loadTournamentDetails = async (id) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(tournamentAddress, TournamentABI.abi, provider);
    const participants = await contract.getParticipants(id);
    const prizePool = await contract.getPrizePool(id);
    setSelectedTournament(id);
    setParticipants(participants);
    setPrizePool(ethers.formatEther(prizePool));
  };

  const register = async (id, fee) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(tournamentAddress, TournamentABI.abi, signer);
    await contract.registerParticipant(id, { value: fee });
    alert('Inscripción exitosa');
    loadTournamentDetails(id); // Actualizar detalles después de la inscripción
  };

  return (
    <FormContainer>
      <h2>Torneos Disponibles</h2>
      {tournaments.map((tournament) => (
        <div key={tournament.id}>
          <h3>{tournament.name}</h3>
          <p>Cuota: {ethers.formatEther(tournament.entryFee)} ETH</p>
          <button onClick={() => register(tournament.id, tournament.entryFee)}>Inscribirse</button>
          <button onClick={() => loadTournamentDetails(tournament.id)}>Ver Detalles</button>
        </div>
      ))}
      {selectedTournament && (
        <div>
          <h3>Detalles del Torneo</h3>
          <p>Fondo de Premios: {prizePool} ETH</p>
          <h4>Participantes:</h4>
          <ul>
            {participants.map((participant, index) => (
              <li key={index}>{participant}</li>
            ))}
          </ul>
        </div>
      )}
    </FormContainer>
  );
};

export default TournamentList;