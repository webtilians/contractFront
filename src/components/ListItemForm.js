import React, { useState } from 'react';
import { ethers } from 'ethers';
import MarketplaceAbi from '../contracts/Marketplace.json';
import { CONTRACT_ADDRESSES } from '../config';
import styled from 'styled-components';

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

const ListItemForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleListItem = async (e) => {
    e.preventDefault();

    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask no está instalado.');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const marketplace = new ethers.Contract(
        CONTRACT_ADDRESSES.marketplace,
        MarketplaceAbi.abi,
        signer
      );

      const priceInWei = ethers.parseEther(price);

      const tx = await marketplace.listItem(name, description, priceInWei);
      await tx.wait();

      alert('Artículo listado exitosamente');
    } catch (error) {
      console.error('Error al listar el artículo:', error);
      alert('Error al listar el artículo.');
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleListItem}>
        <input
          type="text"
          placeholder="Nombre del artículo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Precio en ETH"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Listar Artículo</button>
      </form>
    </FormContainer>
  );
};

export default ListItemForm;