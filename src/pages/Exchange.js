import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SignTransaction from '../components/SignTransaction';
function Exchange() {
  const [selectedToken, setSelectedToken] = useState('');
  const [amount, setAmount] = useState('');
  const [toAddress, setToAddress] = useState('');

  const handleExchange = async () => {
    try {
      const response = await axios.post('http://localhost:4000/contracts/transfer', {
        contractAddress: selectedToken,
        from: 'USER_ADDRESS', // Podríamos obtener esto del estado global
        to: toAddress,
        amount,
      });

      if (response.data.success) {
        toast.success('Token transferido con éxito');
      } else {
        toast.error('Error al transferir token');
      }
    } catch (error) {
      toast.error('Error al realizar el intercambio');
      console.error('Error al realizar el intercambio:', error);
    }
  };

  return (
    <div>
      <h2>Exchange Tokens</h2>
      <SignTransaction/>
      <div>
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
      </div>
    </div>
  );
}

export default Exchange;
