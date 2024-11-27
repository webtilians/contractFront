import React, { useState } from 'react';
import { ethers } from 'ethers';
import PersonalAgreement from '../contracts/PersonalAgreement.json'; // Asegúrate de tener la ABI del contrato
import styled from 'styled-components';
import { CONTRACT_ADDRESSES } from '../config';

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

const SignAgreementForm = () => {
  const [agreementId, setAgreementId] = useState('');

  const handleSignAgreement = async (e) => {
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

      const tx = await personalAgreement.signAgreement(agreementId);
      await tx.wait();

      alert('Acuerdo firmado exitosamente');
    } catch (error) {
      console.error('Error firmando el acuerdo:', error);
      alert('Error firmando el acuerdo. Revisa la consola para más detalles.');
    }
  };

  return (
    <FormContainer>
      <Title>Firmar Acuerdo Personal</Title>
      <form onSubmit={handleSignAgreement}>
        <div>
          <label>ID del Acuerdo:</label>
          <Input
            type="text"
            value={agreementId}
            onChange={(e) => setAgreementId(e.target.value)}
          />
        </div>
        <Button type="submit">Firmar Acuerdo</Button>
      </form>
    </FormContainer>
  );
};

export default SignAgreementForm;