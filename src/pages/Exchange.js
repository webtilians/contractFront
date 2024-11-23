import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import SignTransaction from '../components/SignTransaction';

const ExchangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100vh;
  text-align: center;
  color: white;
  font-family: 'Roboto', sans-serif; /* Puedes cambiar esto a cualquier fuente sofisticada que prefieras */
`;
const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;
function Exchange() {
  const [selectedToken, setSelectedToken] = useState('');
  const [amount, setAmount] = useState('');
  const [toAddress, setToAddress] = useState('');

  // const handleExchange = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:4000/contracts/transfer', {
  //       contractAddress: selectedToken,
  //       from: 'USER_ADDRESS', // Podríamos obtener esto del estado global
  //       to: toAddress,
  //       amount,
  //     });

  //     if (response.data.success) {
  //       toast.success('Token transferido con éxito');
  //     } else {
  //       toast.error('Error al transferir token');
  //     }
  //   } catch (error) {
  //     toast.error('Error al realizar el intercambio');
  //     console.error('Error al realizar el intercambio:', error);
  //   }
  // };

  return (
    <ExchangeContainer>
      <Title>Intercambio de Tokens</Title>
      <SignTransaction/>
      {/* <div>
        <input
          type="text"
          placeholder="Contract Address"
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Recipient Address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
        <button onClick={handleExchange}>Exchange</button>
      </div> */}
    </ExchangeContainer>
  );
}

export default Exchange;
