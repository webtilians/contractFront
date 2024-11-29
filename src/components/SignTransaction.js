import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const SignTransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  text-align: center;
  color: white;
  font-family: 'Roboto', sans-serif;
`;

const Hexagon = styled.div`
  position: relative;
  width: 120px;
  height: 69.28px;
  background: linear-gradient(135deg, rgba(38, 191, 227, 1), rgba(0, 121, 145, 1));
  border: 4px solid rgba(255, 255, 255, 0.6);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);

  &::before, &::after {
    content: '';
    position: absolute;
    background: inherit;
    border: inherit;
    clip-path: inherit;
    transform: translateY(-50%) rotate(30deg);
  }

  &::after {
    transform: translateY(50%) rotate(-30deg);
  }
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

const SignTransaction = () => {
  const [destinationAddress, setDestinationAddress] = useState('');
  const [amount, setAmount] = useState('');

  const walletAddress = useSelector((state) => state.address);

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
