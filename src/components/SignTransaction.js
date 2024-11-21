import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';

const SignTransaction = () => {
  const [destinationAddress, setDestinationAddress] = useState('');
  const [amount, setAmount] = useState('');

  // Acceder a la dirección del wallet desde Redux
  const walletAddress = useSelector((state) => state.address);

  // Función para firmar una transacción
  const signTransaction = async () => {
    // if (!walletAddress) {
    //   alert('Primero debes conectar tu wallet.');
    //   return;
    // }

    if (!destinationAddress || !amount) {
      alert('Por favor, rellena todos los campos.');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const transaction = {
        to: destinationAddress,
        value: ethers.parseEther(amount),
        gasLimit: 21000,
      };

      // Firmar y enviar la transacción
      const txResponse = await signer.sendTransaction(transaction);
      console.log('Transacción enviada:', txResponse);
      alert(`Transacción enviada con hash: ${txResponse.hash}`);
    } catch (error) {
      console.error('Error al firmar la transacción:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h3>Firmar Transacción</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Dirección de destino:</label>
          <input
            type="text"
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
            placeholder="Dirección de destino (ej. 0x...)"
            required
          />
        </div>
        <div>
          <label>Cantidad (en ETH):</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Cantidad a enviar"
            required
          />
        </div>
        <button type="button" onClick={signTransaction} >
          Firmar y Enviar Transacción
        </button>
      </form>
    </div>
  );
};

export default SignTransaction;
