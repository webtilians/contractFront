import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MarketplaceAbi from '../contracts/Marketplace.json';
import { CONTRACT_ADDRESSES } from '../config';
import styled from 'styled-components';

const ItemListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: white;
  font-family: 'Roboto', sans-serif;
`;

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

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.base3};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

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
    <ItemListContainer>
      <FormContainer>
        <Title>Artículos en Venta</Title>
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
      </FormContainer>
    </ItemListContainer>
  );
};

export default ItemList;