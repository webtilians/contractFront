import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MarketplaceABI from '../contracts/Marketplace.json';
import MyBasicNFTABI from '../contracts/MyBasicNFT.json';

const marketplaceAddress = '0x1234567890abcdef1234567890abcdef12345678'; // Reemplaza con la dirección del contrato desplegado

const Marketplace = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const loadListings = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(marketplaceAddress, MarketplaceABI.abi, provider);
      const loadedListings = await contract.getListings();
      setListings(loadedListings);
    };
    loadListings();
  }, []);

  const buyNFT = async (listingId, price) => {
    if (!window.ethereum) {
      alert('MetaMask no está instalado');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(marketplaceAddress, MarketplaceABI.abi, signer);

      const transaction = await contract.buyNFT(listingId, { value: price });
      console.log('Compra de NFT enviada, esperando confirmación...');

      await transaction.wait();
      console.log('NFT comprado');
      alert('¡NFT comprado exitosamente!');
    } catch (error) {
      console.error('Error al comprar el NFT:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Marketplace</h2>
      <ul>
        {listings.map((listing, index) => (
          <li key={index}>
            <p>ID del Token: {listing.tokenId}</p>
            <p>Precio: {ethers.formatEther(listing.price)} ETH</p>
            <button onClick={() => buyNFT(index, listing.price)}>Comprar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Marketplace;