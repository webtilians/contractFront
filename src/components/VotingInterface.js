import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AdvancedVoting from '../contracts/AdvancedVoting.json';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const VotingInterface = () => {
  const [contract, setContract] = useState(null);
  const [proposal, setProposal] = useState('');
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [votingEnded, setVotingEnded] = useState(false);
  const [result, setResult] = useState('');
  const [delegateAddress, setDelegateAddress] = useState('');

  const votingContracts = useSelector((state) => state.user.votingContracts);
  const tokenContracts = useSelector((state) => state.user.tokenContracts);

  const [selectedContractAddress, setSelectedContractAddress] = useState('');

  useEffect(() => {
    const init = async () => {
      if (!selectedContractAddress) return;

      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          selectedContractAddress,
          AdvancedVoting.abi,
          signer
        );

        setContract(contract);

        const proposal = await contract.proposal();
        const yesCount = await contract.yesCount();
        const noCount = await contract.noCount();
        const currentTime = Math.floor(Date.now() / 1000);
        const endTime = await contract.endTime();

        setProposal(proposal);
        setYesCount(yesCount);
        setNoCount(noCount);
        setVotingEnded(currentTime > endTime);

        // Suscribirse a eventos
        contract.on('VoteCast', (voter, vote) => {
          updateCounts();
        });

        contract.on('VoteDelegated', (from, to) => {
          // Opcionalmente, puedes actualizar el estado o mostrar una notificación
        });

        contract.on('VotingEnded', (yesCount, noCount) => {
          setVotingEnded(true);
        });
      }
    };

    const updateCounts = async () => {
      if (contract) {
        const yesCount = await contract.yesCount();
        const noCount = await contract.noCount();
        setYesCount(yesCount);
        setNoCount(noCount);
      }
    };

    init();

    // Limpieza
    return () => {
      if (contract) {
        contract.removeAllListeners('VoteCast');
        contract.removeAllListeners('VoteDelegated');
        contract.removeAllListeners('VotingEnded');
      }
    };
  }, [selectedContractAddress]);

  const handleSelectContract = (e) => {
    setSelectedContractAddress(e.target.value);
  };

  const handleVote = async (vote) => {
    try {
      const tx = await contract.vote(vote);
      await tx.wait();
      alert('Voto registrado exitosamente');
    } catch (error) {
      console.error('Error al votar:', error);
      alert('Error al votar');
    }
  };

  const handleDelegate = async () => {
    try {
      const tx = await contract.delegate(delegateAddress);
      await tx.wait();
      alert(`Has delegado tu voto a ${delegateAddress}`);
    } catch (error) {
      console.error('Error al delegar el voto:', error);
      alert('Error al delegar el voto');
    }
  };

  const handleGetResult = async () => {
    try {
      const result = await contract.getResult();
      setResult(result);
    } catch (error) {
      console.error('Error al obtener el resultado:', error);
      alert('Error al obtener el resultado');
    }
  };

  // Datos para el gráfico
  const data = {
    labels: ['Sí', 'No'],
    datasets: [
      {
        label: 'Votos',
        data: [yesCount.toString(), noCount.toString()],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div>
      <h2>Interfaz de Votación</h2>
      <div>
        <label>Selecciona un Contrato de Votación:</label>
        <select onChange={handleSelectContract} value={selectedContractAddress}>
          <option value="">-- Selecciona un Contrato --</option>
          {votingContracts.map((address, index) => (
            <option key={index} value={address}>
              Contrato #{index + 1}: {address}
            </option>
          ))}
        </select>
      </div>
      {selectedContractAddress && (
        <>
          <h3>Propuesta: {proposal}</h3>
          <div>
            <Bar data={data} />
          </div>
          <p>
            La votación {votingEnded ? 'ha finalizado' : 'está en curso'}
          </p>
          {!votingEnded && (
            <div>
              <button onClick={() => handleVote(true)}>Votar Sí</button>
              <button onClick={() => handleVote(false)}>Votar No</button>
              <div>
                <label>Delegar Voto a:</label>
                <input
                  type="text"
                  value={delegateAddress}
                  onChange={(e) => setDelegateAddress(e.target.value)}
                  placeholder="Dirección Ethereum"
                />
                <button onClick={handleDelegate}>Delegar Voto</button>
              </div>
            </div>
          )}
          {votingEnded && (
            <div>
              <button onClick={handleGetResult}>Ver Resultado</button>
              {result && <p>Resultado: {result}</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VotingInterface;
