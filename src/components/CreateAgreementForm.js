import React, { useState } from 'react';
import { ethers } from 'ethers';
import PersonalAgreement from '../contracts/PersonalAgreement.json';
import { CONTRACT_ADDRESSES } from '../config.js';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: ${props => props.theme.colors.base1};
  padding: 2rem;
  border: 2px solid ${props => props.theme.colors.base2};
  clip-path: polygon(
    25% 5%, 
    75% 5%, 
    100% 50%, 
    75% 95%, 
    25% 95%, 
    0% 50%
  ); /* Crear la forma de hexágono deformado */
  width: 400px;
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

const CreateAgreementForm = () => {
  const [party2, setParty2] = useState('');
  const [terms, setTerms] = useState('');

  const handleCreateAgreement = async (e) => {
    e.preventDefault();

    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask no está instalado. Por favor, instálalo para continuar.');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const personalAgreement = new ethers.Contract(
        CONTRACT_ADDRESSES.personalAgreement,
        PersonalAgreement.abi,
        signer
      );

      const tx = await personalAgreement.createAgreement(party2, terms);
      await tx.wait();

      alert('Acuerdo creado exitosamente');
    } catch (error) {
      console.error('Error creando el acuerdo:', error);
      alert('Error creando el acuerdo. Revisa la consola para más detalles.');
    }
  };

  return (
    <FormContainer>
      <Title>Crear Acuerdo Personal</Title>
      <form onSubmit={handleCreateAgreement}>
        <div>
          <label>Dirección de la otra parte:</label>
          <Input
            type="text"
            value={party2}
            onChange={(e) => setParty2(e.target.value)}
          />
        </div>
        <div>
          <label>Términos del Acuerdo:</label>
          <Input
            type="text"
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
          />
        </div>
        <Button type="submit">Crear Acuerdo</Button>
      </form>
    </FormContainer>
  );
};

export default CreateAgreementForm;