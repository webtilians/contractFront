import React, { useState } from 'react';
import { ethers } from 'ethers';
import MyBasicNFT from '../contracts/MyBasicNFT.json'; // Asegúrate de tener la ABI del contrato
//qiuero conseguir el adddress del contrato y la ABI
//importamos la libreria ethers para interactuar con la blockchain          
//importamos el contrato MyBasicNFT.json                                        
//creamos la funcion CreateNFTForm que es un componente de react

const TransferNFTForm = () => {
    const [tokenId, setTokenId] = useState("");
    const [recipient, setRecipient] = useState("");

    const handleTransferNFT = async (e) => {
        e.preventDefault();

        if (typeof window.ethereum === 'undefined') {
            alert("Metamask no está instalado. Por favor, instálalo para continuar.");
            return;
        }

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const nftContract = new ethers.Contract(
                MyBasicNFT.address,
                MyBasicNFT.abi,
                signer
            );

            const transaction = await nftContract['safeTransferFrom(address,address,uint256)'](
                signer.getAddress(),
                recipient,
                tokenId
            );
            await transaction.wait();

            alert(`NFT transferido exitosamente al destinatario: ${recipient}`);
        } catch (error) {
            console.error("Error transfiriendo NFT:", error);
            alert("Error transfiriendo NFT. Revisa la consola para más detalles.");
        }
    };

    return (
        <form onSubmit={handleTransferNFT}>
            <div>
                <label>ID del Token:</label>
                <input
                    type="text"
                    value={tokenId}
                    onChange={(e) => setTokenId(e.target.value)}
                />
            </div>
            <div>
                <label>Destinatario:</label>
                <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
            </div>
            <button type="submit">Transferir NFT</button>
        </form>
    );
};

export default TransferNFTForm;