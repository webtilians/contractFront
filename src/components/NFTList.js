import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MyBasicNFT from '../contracts/MyBasicNFT.json';

const nftAddress = '0x1234567890abcdef1234567890abcdef12345678'; // Reemplaza con la dirección del contrato desplegado

const NFTList = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const loadNFTs = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(nftAddress, MyBasicNFT.abi, provider);
      const tokenCounter = await contract.tokenCounter();
      const loadedNFTs = [];
      for (let i = 0; i < tokenCounter; i++) {
        const tokenURI = await contract.tokenURI(i);
        loadedNFTs.push({ id: i, uri: tokenURI });
      }
      setNfts(loadedNFTs);
    };
    loadNFTs();
  }, []);

  return (
    <div>
      <h2>Mis NFTs</h2>
      <ul>
        {nfts.map((nft) => (
          <li key={nft.id}>
            <p>ID: {nft.id}</p>
            <p>URI: {nft.uri}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NFTList;