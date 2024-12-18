// src/pages/NFT.js
import React from 'react';
import DeployNFTForm from '../components/DeployNFTForm';
import TransferNFTForm from '../components/TransferNFTForm';
import styled from 'styled-components';

const NFTContainer = styled.div`
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

const NFT = () => {
  return (
    <NFTContainer>
      <Title>NFT Marketplace</Title>
      <DeployNFTForm />
      <TransferNFTForm />
    </NFTContainer>
  );
};

export default NFT;