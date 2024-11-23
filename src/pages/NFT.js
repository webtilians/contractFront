// src/pages/NFT.js
import React from 'react';
import DeployNFTForm from '../components/DeployNFTForm';
import TransferNFTForm from '../components/TransferNFTForm';

const NFT = () => {
  return (
    <div>
      <h1>NFT Marketplace</h1>
      <DeployNFTForm />
      <TransferNFTForm />
    </div>
  );
};

export default NFT;