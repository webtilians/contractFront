import React, { useState } from 'react';
import { ethers, ContractFactory } from 'ethers';
import CustomERC20Token from '../contracts/CustomERC20Token.json'; // Asegúrate de tener la ABI del contrato

const DeployTokenForm = () => {
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [initialSupply, setInitialSupply] = useState("");

    const handleDeploy = async (e) => {
        e.preventDefault();

        // Verificar que Metamask está instalado
        if (typeof window.ethereum === 'undefined') {
            alert("Metamask no está instalado. Por favor, instálalo para continuar.");
            return;
        }

        try {
            // Solicitar acceso a la cuenta de Metamask
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // Definir el contrato a desplegar
            const factory = new ContractFactory(
                CustomERC20Token.abi,
                CustomERC20Token.bytecode,
                signer
            );

            // Desplegar el contrato con los argumentos ingresados
            const contract = await factory.deploy(
                name,
                symbol,
                ethers.parseUnits(initialSupply, 18)
            );
            await contract.waitForDeployment();

            alert(`Contrato desplegado exitosamente en la dirección: ${contract.target}`);
            console.log("Dirección del contrato:", contract.target);
        } catch (error) {
            console.error("Error al desplegar el contrato:", error);
            alert("Error al desplegar el contrato");
        }
    };

    return (
        <form onSubmit={handleDeploy}>
            <div>
                <label>Nombre del Token:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Símbolo del Token:</label>
                <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} required />
            </div>
            <div>
                <label>Suministro Inicial (en unidades):</label>
                <input type="text" value={initialSupply} onChange={(e) => setInitialSupply(e.target.value)} required />
            </div>
            <button type="submit">Crear Token</button>
        </form>
    );
};

export default DeployTokenForm;
