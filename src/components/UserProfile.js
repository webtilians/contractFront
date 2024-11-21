import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const address = useSelector((state) => state.user.address);
  const votingContracts = useSelector((state) => state.user.votingContracts);
  const tokenContracts = useSelector((state) => state.user.tokenContracts);

  return (
    <div>
      <h2>Perfil del Usuario</h2>
      <p><strong>Dirección de la Wallet:</strong> {address}</p>

      <h3>Contratos de Votación Creados</h3>
      {votingContracts.length > 0 ? (
        <ul>
          {votingContracts.map((contractAddress, index) => (
            <li key={index}>
              Contrato #{index + 1}: {contractAddress}
            </li>
          ))}
        </ul>
      ) : (
        <p>No has creado ningún contrato de votación.</p>
      )}

      <h3>Tokens Creados</h3>
      {tokenContracts.length > 0 ? (
        <ul>
          {tokenContracts.map((tokenAddress, index) => (
            <li key={index}>
              Token #{index + 1}: {tokenAddress}
            </li>
          ))}
        </ul>
      ) : (
        <p>No has creado ningún token.</p>
      )}
    </div>
  );
};

export default UserProfile;
