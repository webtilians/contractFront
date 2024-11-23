import React, { useState } from 'react';
import { ethers, ContractFactory } from 'ethers';
import MyBasicNFT from '../contracts/MyBasicNFT.json'; // Asegúrate de tener la ABI y el bytecode del contrato

const DeployNFTForm = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');

  const handleDeploy = async (e) => {
    e.preventDefault();

    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask no está instalado. Por favor, instálalo para continuar.');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress(); // Obtener la dirección del signer

      const nftContractFactory = new ContractFactory(
        MyBasicNFT.abi,
        MyBasicNFT.bytecode,
        signer
      );

      const nftContract = await nftContractFactory.deploy(name, symbol, signerAddress);
      await nftContract.waitForDeployment();

      alert(`Contrato NFT desplegado en: ${nftContract.target}`);
    } catch (error) {
      console.error('Error desplegando el contrato NFT:', error);
      alert('Error desplegando el contrato NFT. Revisa la consola para más detalles.');
    }
  };

  return (
    <form onSubmit={handleDeploy}>
      <div>
        <label>Nombre del Token:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Símbolo del Token:</label>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </div>
      <button type="submit">Desplegar NFT</button>
    </form>
  );
};

export default DeployNFTForm;