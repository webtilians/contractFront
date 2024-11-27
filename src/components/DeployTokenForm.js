import React, { useState } from 'react';
import { ethers, ContractFactory } from 'ethers';
import CustomERC20Token from '../contracts/CustomERC20Token.json'; // Asegúrate de tener la ABI del contrato
import styled from 'styled-components';

const FormContainer = styled.div`
  position: relative;
    width: 100%;
    padding: 62px;
    height: 400px;
    background: linear-gradient(135deg, rgb(25 46 55), rgba(0, 121, 145, 1));
    
    clip-path: polygon(47% -3%, 99% 30%, 88% 74%, 38% 92%, 8% 76%, 0% 24%);
    box-shadow: 0 0 15px rgb(50 167 164);
    background: repeating-radial-gradient(#193438, transparent 122px);
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

const DeployTokenForm = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [initialSupply, setInitialSupply] = useState("");

  const handleDeploy = async (e) => {
    e.preventDefault();

    // Verificar que Metamask está instalado
    if (typeof window.ethereum === 'undefined') {
      alert("Metamask no está instalado. Por favor, instálalo para continuar.");
      return;
    }

    try {
      // Solicitar acceso a la cuenta de Metamask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Definir el contrato a desplegar
      const factory = new ContractFactory(
        CustomERC20Token.abi,
        CustomERC20Token.bytecode,
        signer
      );

      // Desplegar el contrato con los argumentos ingresados
      const contract = await factory.deploy(
        name,
        symbol,
        ethers.parseUnits(initialSupply, 18)
      );
      await contract.waitForDeployment();

      alert(`Contrato desplegado exitosamente en la dirección: ${contract.target}`);
    } catch (error) {
      console.error("Error desplegando el contrato:", error);
      alert("Error desplegando el contrato. Revisa la consola para más detalles.");
    }
  };

  return (
    <FormContainer>
      <Title>Desplegar Token</Title>
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
        <div>
          <label>Suministro Inicial:</label>
          <Input
            type="text"
            value={initialSupply}
            onChange={(e) => setInitialSupply(e.target.value)}
          />
        </div>
        <Button type="submit">Desplegar Token</Button>
      </form>
    </FormContainer>
  );
};

export default DeployTokenForm;
