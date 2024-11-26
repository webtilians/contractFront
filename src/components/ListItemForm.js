import React, { useState } from 'react';
import { ethers } from 'ethers';
import MarketplaceAbi from '../contracts/Marketplace.json';
import { CONTRACT_ADDRESSES } from '../config';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: ${props => props.theme.colors.base1};
  padding: 7rem;
  border: 2px solid ${props => props.theme.colors.base2};
  clip-path: polygon(26% 7%, 64% 1%, 99% 44%, 70% 95%, 30% 95%, 0% 50%);
  width: 400px;
  max-width: 90%;
  margin: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(103deg, rgba(218, 234, 255, 0.05), rgba(34, 15, 0, 0.2));
    clip-path: polygon(30% 5%, 70% 5%, 100% 50%, 70% 95%, 30% 95%, 0% 50%);
    z-index: -1;
    transform: translate(-3px, 7px);
    box-shadow: 0 44px 44px rgba(0, 0, 0, 0.2);
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