import React, { useState } from 'react';
import { ethers } from 'ethers';
import PersonalAgreement from '../contracts/PersonalAgreement.json'; // Asegúrate de tener la ABI del contrato
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

      const contractAddress = '0x02CDC38B6FeCC7A5673e4BDa09b3D0896FA365F2'; // Reemplaza con la dirección del contrato desplegado
      const personalAgreement = new ethers.Contract(contractAddress, PersonalAgreement.abi, signer);

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