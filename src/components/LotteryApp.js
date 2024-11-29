import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styled from 'styled-components';
import LotteryABI from '../contracts/Lottery.json'; // Asegúrate de tener la ABI del contrato
const lotteryAddress = '0xDD85728371Ceb79afD3121F906608Fd98ED491d8'; // Reemplaza con la dirección del contrato desplegado
const FormContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 62px;
  height: 800px;
  background: linear-gradient(135deg, rgb(25 46 55), rgba(0, 121, 145, 1));
  clip-path: polygon(47% -3%, 99% 30%, 88% 74%, 38% 92%, 8% 76%, 0% 24%);
  box-shadow: 0 0 15px rgb(50 167 164);
  background: repeating-radial-gradient(#193438, #95b0b2 340px);
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
const LotteryApp = () => {
  const [ticketPrice, setTicketPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [lotteryId, setLotteryId] = useState('');
  const [message, setMessage] = useState('');
  const [lotteries, setLotteries] = useState([]);

  useEffect(() => {
    fetchLotteries();
  }, []);

  const fetchLotteries = async () => {
    if (!window.ethereum) {
      alert('MetaMask no está instalado');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(lotteryAddress, LotteryABI.abi, provider);
      const lotteries = await contract.getLotteries();
      setLotteries(lotteries);
    } catch (error) {
      console.error('Error al obtener los sorteos:', error);
    }
  };

  const createLottery = async () => {
    if (!window.ethereum) {
      alert('MetaMask no está instalado');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(lotteryAddress, LotteryABI.abi, signer);

      const tx = await contract.createLottery(ethers.parseEther(ticketPrice), duration);
      await tx.wait();
      setMessage('Lotería creada exitosamente');
      fetchLotteries(); // Actualiza la lista de sorteos
    } catch (error) {
      console.error('Error al crear la lotería:', error);
      setMessage(`Error: ${error.message}`);
    }
  };

  const buyTicket = async (lotteryId, ticketPrice) => {
    if (!window.ethereum) {
      alert('MetaMask no está instalado');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(lotteryAddress, LotteryABI.abi, signer);

      const tx = await contract.buyTicket(lotteryId, { value: ethers.parseEther(ticketPrice) });
      await tx.wait();
      setMessage('Boleto comprado exitosamente');
    } catch (error) {
      console.error('Error al comprar el boleto:', error);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <FormContainer>
      <h1>Sistema de Lotería</h1>
      <div>
        <h2>Crear Lotería</h2>
        <input
          type="text"
          placeholder="Precio del boleto (ETH)"
          value={ticketPrice}
          onChange={(e) => setTicketPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Duración (segundos)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button onClick={createLottery}>Crear Lotería</button>
      </div>
      <div>
        <h2>Lista de Sorteos</h2>
        <ul>
          {lotteries.map((lottery, index) => (
            <li key={index}>
              <p>ID del Sorteo: {index}</p>
              <p>Precio del Boleto: {ethers.formatEther(lottery.ticketPrice.toString())} ETH</p>
              <p>Fecha de Finalización: {new Date(Number(lottery.endTime) * 1000).toLocaleString()}</p>
              <p>Estado: {lottery.isActive ? 'Activo' : 'Finalizado'}</p>
              {lottery.winner !== ethers.ZeroAddress && (
                <p>Ganador: {lottery.winner}</p>
              )}
              {lottery.isActive && (
                <button onClick={() => buyTicket(index, ethers.formatEther(lottery.ticketPrice.toString()))}>
                  Comprar Boleto
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <p>{message}</p>
    </FormContainer>
  );
};

export default LotteryApp;