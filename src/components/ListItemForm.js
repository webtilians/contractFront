import React, { useState } from 'react';
import { ethers } from 'ethers';
import MarketplaceAbi from '../contracts/Marketplace.json';
import { CONTRACT_ADDRESSES } from '../config';

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
  );
};

export default ListItemForm;