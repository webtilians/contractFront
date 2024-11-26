import React, { useState } from 'react';
import { ethers, ContractFactory } from 'ethers';
import MyBasicNFT from '../contracts/MyBasicNFT.json'; // Asegúrate de tener la ABI y el bytecode del contrato
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: ${props => props.theme.colors.base1};
  padding: 7rem;
  border: 2px solid ${props => props.theme.colors.base2};
  clip-path: polygon(26% 7%, 64% 1%, 99% 44%, 70% 95%, 30% 95%, 0% 50%);
  width: 400px;
  max-width: 90%;
  margin: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(103deg, rgba(218, 234, 255, 0.05), rgba(34, 15, 0, 0.2));
    clip-path: polygon(30% 5%, 70% 5%, 100% 50%, 70% 95%, 30% 95%, 0% 50%);
    z-index: -1;
    transform: translate(-3px, 7px);
    box-shadow: 0 44px 44px rgba(0, 0, 0, 0.2);
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

const DeployNFTForm = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');

  const handleDeploy = async (e) => {
    e.preventDefault();

    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask no está instalado. Por favor, instálalo para continuar.');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress(); // Obtener la dirección del signer

      const nftContractFactory = new ContractFactory(
        MyBasicNFT.abi,
        MyBasicNFT.bytecode,
        signer
      );

      const nftContract = await nftContractFactory.deploy(name, symbol, signerAddress);
      await nftContract.waitForDeployment();

      alert(`Contrato NFT desplegado en: ${nftContract.target}`);
    } catch (error) {
      console.error('Error desplegando el contrato NFT:', error);
      alert('Error desplegando el contrato NFT. Revisa la consola para más detalles.');
    }
  };

  return (
    <FormContainer>
      <Title>Desplegar NFT</Title>
      <form onSubmit={handleDeploy}>
        <div>
          <label>Nombre del Token:</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Símbolo del Token:</label>
          <Input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </div>
        <Button type="submit">Desplegar NFT</Button>
      </form>
    </FormContainer>
  );
};

export default DeployNFTForm;