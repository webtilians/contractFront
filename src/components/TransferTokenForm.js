import React, { useState } from 'react';
import { ethers } from 'ethers';
import CustomERC20Token from '../contracts/CustomERC20Token.json'

const TransferTokenForm = () => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [contractAddress, setContractAddress] = useState('');

  const handleTransfer = async () => {
    if (!window.ethereum) {
      alert('Metamask no está instalado');
      return;
    }

    try {
      // Solicitar acceso a la cuenta de Metamask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Crear una instancia del contrato utilizando la ABI y la dirección del contrato
      const tokenContract = new ethers.Contract(contractAddress, CustomERC20Token.abi, signer);

      // Realizar la transferencia de tokens
      const transaction = await tokenContract.transfer(recipientAddress, ethers.parseUnits(transferAmount, 18));
      console.log('Transferencia enviada, esperando confirmación...');

      // Esperar hasta que la transacción sea confirmada
      await transaction.wait();
      console.log('Transferencia completada');
      alert('¡Transferencia exitosa!');
    } catch (error) {
      console.error('Error al transferir tokens:', error);
      alert('Hubo un error al realizar la transferencia');
    }
  };

  return (
    <div>
      <h2>Transferir Tokens</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleTransfer();
        }}
      >
        <div>
          <label>Dirección del Contrato del Token:</label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="Dirección del contrato"
            required
          />
        </div>
        <div>
          <label>Dirección del Destinatario:</label>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="0x..."
            required
          />
        </div>
        <div>
          <label>Cantidad de Tokens a Transferir:</label>
          <input
            type="number"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            placeholder="Cantidad"
            required
          />
        </div>
        <button type="submit">Transferir Tokens</button>
      </form>
    </div>
  );
};

export default TransferTokenForm;
