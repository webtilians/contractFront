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
