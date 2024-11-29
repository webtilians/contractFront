import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CreateAgreementForm from '../components/CreateAgreementForm';
import SignAgreementForm from '../components/SignAgreementForm';

const AgreementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
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

const BackButton = styled.button`
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: ${props => props.theme.colors.base3};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: absolute;
  top: 1rem;
  left: 1rem;
  &:hover {
    background-color: ${props => props.theme.colors.base4};
  }
`;

const PersonalAgreements = () => {
  const navigate = useNavigate();

  return (
    <AgreementsContainer>
      <Title>Acuerdos Personales</Title>
      <CreateAgreementForm />
      <SignAgreementForm />
      <BackButton onClick={() => navigate('/home')}>Atras</BackButton>
    </AgreementsContainer>
  );
};

export default PersonalAgreements;