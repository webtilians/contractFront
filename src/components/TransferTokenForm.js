import React, { useState } from 'react';
import { ethers } from 'ethers';
import CustomERC20Token from '../contracts/CustomERC20Token.json';
import styled from 'styled-components';

const FormContainer = styled.div`
  position: relative;
    width: 100%;
    padding: 62px;
    height: 400px;
    background: linear-gradient(135deg, rgb(25 46 55), rgba(0, 121, 145, 1));
    
    clip-path: polygon(47% -3%, 99% 30%, 88% 74%, 38% 92%, 8% 76%, 0% 24%);
    box-shadow: 0 0 15px rgb(50 167 164);
    background: repeating-radial-gradient(#193438, transparent 222px);
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
    <FormContainer>
      <Title>Transferir Tokens</Title>
      <div>
        <label>Dirección del Contrato:</label>
        <Input
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Dirección del Destinatario:</label>
        <Input
          type="text"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Cantidad a Transferir:</label>
        <Input
          type="text"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
        />
      </div>
      <Button onClick={handleTransfer}>Transferir Tokens</Button>
    </FormContainer>
  );
};

export default TransferTokenForm;
