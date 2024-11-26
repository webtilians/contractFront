import React from 'react';
import CreateAgreementForm from '../components/CreateAgreementForm';
import SignAgreementForm from '../components/SignAgreementForm';
import styled from 'styled-components';

const AgreementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: white;
  font-family: 'Roboto', sans-serif; /* Puedes cambiar esto a cualquier fuente sofisticada que prefieras */
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const PersonalAgreements = () => {
  return (
    <AgreementsContainer>
      <Title>Acuerdos Personales</Title>
      <CreateAgreementForm />
      <SignAgreementForm />
    </AgreementsContainer>
  );
};

export default PersonalAgreements;