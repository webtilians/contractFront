import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MarketplaceAbi from '../contracts/Marketplace.json';
import { CONTRACT_ADDRESSES } from '../config';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask no está instalado.');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const marketplace = new ethers.Contract(
        CONTRACT_ADDRESSES.marketplace,
        MarketplaceAbi.abi,
        provider
      );

      const itemCount = await marketplace.itemCount();
      const itemCountNumber = Number(itemCount);

      const itemsArray = [];
      for (let i = 1; i <= itemCountNumber; i++) {
        const item = await marketplace.getItem(i);
        itemsArray.push({
          itemId: Number(item.itemId),
          seller: item.seller,
          name: item.name,
          description: item.description,
          price: ethers.formatEther(item.price),
          status: item.status,
        });
      }

      setItems(itemsArray);
    } catch (error) {
      console.error('Error al obtener los artículos:', error);
    }
  };

  const purchaseItem = async (itemId, price) => {
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

      const tx = await marketplace.purchaseItem(itemId, {
        value: ethers.parseEther(price),
      });
      await tx.wait();

      alert('Artículo comprado exitosamente');
      fetchItems(); // Actualizar la lista
    } catch (error) {
      console.error('Error al comprar el artículo:', error);
      alert('Error al comprar el artículo.');
    }
  };

  return (
    <div>
      <h2>Artículos en Venta</h2>
      <ul>
        {items.map((item) => (
          <li key={item.itemId}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Precio: {item.price} ETH</p>
            <p>Vendedor: {item.seller}</p>
            <button onClick={() => purchaseItem(item.itemId, item.price)}>Comprar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;