import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const SignTransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: white;
  font-family: 'Roboto', sans-serif; /* Puedes cambiar esto a cualquier fuente sofisticada que prefieras */
`;

const FormContainer = styled.div`
  background-color: ${props => props.theme.colors.base1};
  
  border: 2px solid ${props => props.theme.colors.base2};
     padding: 6rem;
    border: 2px solid rgb(41, 42, 51);
    clip-path: polygon(38% -6%, 75% 6%, 100% 43%, 74% 95%, 24% 88%, 2% 45%);
    width: 420px;
    max-width: 90%;
    margin: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

const SignTransaction = () => {
  const [destinationAddress, setDestinationAddress] = useState('');
  const [amount, setAmount] = useState('');

  // Acceder a la dirección del wallet desde Redux
  const walletAddress = useSelector((state) => state.address);

  // Función para firmar una transacción
  const signTransaction = async () => {
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
    <SignTransactionContainer>
      <FormContainer>
        <Title>Firmar Transacción</Title>
        <Input
          type="text"
          placeholder="Dirección de Destino"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Cantidad"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button onClick={signTransaction}>Firmar y Enviar</Button>
      </FormContainer>
    </SignTransactionContainer>
  );
};

export default SignTransaction;
