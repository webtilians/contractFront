import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ProfileContainer = styled.div`
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
  position: relative;
    width: 100%;
    padding: 62px;
    height: 400px;
    background: linear-gradient(135deg, rgb(25 46 55), rgba(0, 121, 145, 1));
    
    clip-path: polygon(47% -3%, 99% 30%, 88% 74%, 38% 92%, 8% 76%, 0% 24%);
    box-shadow: 0 0 15px rgb(50 167 164);
    background: repeating-radial-gradient(#193438, transparent 180px);
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

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.base3};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.base3};
`;

const Text = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.base3};
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const ListItem = styled.li`
  margin: 0.5rem 0;
  padding: 0.5rem;
  background-color: ${props => props.theme.colors.base2};
  border-radius: 5px;
  color: ${props => props.theme.colors.base3};
`;

const UserProfile = () => {
  const address = useSelector((state) => state.user.address);
  const votingContracts = useSelector((state) => state.user.votingContracts);
  const tokenContracts = useSelector((state) => state.user.tokenContracts);

  return (
    <ProfileContainer>
      <FormContainer>
        <Title>Perfil del Usuario</Title>
        <Text><strong>Dirección de la Wallet:</strong> {address}</Text>

        <Subtitle>Contratos de Votación Creados</Subtitle>
        {votingContracts.length > 0 ? (
          <List>
            {votingContracts.map((contractAddress, index) => (
              <ListItem key={index}>
                Contrato #{index + 1}: {contractAddress}
              </ListItem>
            ))}
          </List>
        ) : (
          <Text>No has creado ningún contrato de votación.</Text>
        )}

        <Subtitle>Tokens Creados</Subtitle>
        {tokenContracts.length > 0 ? (
          <List>
            {tokenContracts.map((tokenAddress, index) => (
              <ListItem key={index}>
                Token #{index + 1}: {tokenAddress}
              </ListItem>
            ))}
          </List>
        ) : (
          <Text>No has creado ningún token.</Text>
        )}
      </FormContainer>
    </ProfileContainer>
  );
};

export default UserProfile;
