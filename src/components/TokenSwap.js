import React, { useState } from 'react';
import { ethers } from 'ethers';
import {
  ChainId,
  Token,
  WETH,
  Fetcher,
  Trade,
  Route,
  TokenAmount,
  TradeType,
  Percent,
} from '@uniswap/sdk';
import styled from 'styled-components';

const SwapContainer = styled.div`
  position: relative;
    width: 100%;
    padding: 62px;
    height: 400px;
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

const TokenSwap = () => {
  const [inputAmount, setInputAmount] = useState('');
  const [inputTokenAddress, setInputTokenAddress] = useState('');
  const [outputTokenAddress, setOutputTokenAddress] = useState('');

  const swapTokens = async () => {
    if (!window.ethereum) {
      alert('MetaMask no está instalado');
      return;
    }

    const chainId = ChainId.MAINNET; // O el ChainId correspondiente
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const inputToken = new Token(chainId, inputTokenAddress, 18);
    const outputToken = new Token(chainId, outputTokenAddress, 18);

    const pair = await Fetcher.fetchPairData(inputToken, WETH[chainId], provider);
    const route = new Route([pair], WETH[chainId]);

    const amountIn = ethers.parseUnits(inputAmount, 18);

    const trade = new Trade(
      route,
      new TokenAmount(inputToken, amountIn.toString()),
      TradeType.EXACT_INPUT
    );

    const slippageTolerance = new Percent('50', '10000'); // 0.5% de tolerancia
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
    const path = [inputToken.address, outputToken.address];
    const to = await signer.getAddress();
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutos

    const uniswapRouterAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'; // Dirección del router Uniswap V2

    const routerABI = [
      'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
    ];

    const routerContract = new ethers.Contract(uniswapRouterAddress, routerABI, signer);

    // Aprobar el token de entrada
    const tokenABI = [
      'function approve(address spender, uint256 amount) public returns (bool)',
    ];

    const tokenContract = new ethers.Contract(inputToken.address, tokenABI, signer);

    const approvalResponse = await tokenContract.approve(uniswapRouterAddress, amountIn);
    await approvalResponse.wait();

    // Ejecutar el intercambio
    const swapResponse = await routerContract.swapExactTokensForTokens(
      amountIn,
      amountOutMin.toString(),
      path,
      to,
      deadline
    );

    await swapResponse.wait();

    alert('¡Intercambio completado con éxito!');
  };

  return (
    <SwapContainer>
      <h2>Intercambiar Tokens</h2>
      <div>
        <label>Dirección del Token de Entrada:</label>
        <input
          type="text"
          value={inputTokenAddress}
          onChange={(e) => setInputTokenAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Dirección del Token de Salida:</label>
        <input
          type="text"
          value={outputTokenAddress}
          onChange={(e) => setOutputTokenAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Cantidad a Enviar:</label>
        <input
          type="text"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
        />
      </div>
      <button onClick={swapTokens}>Intercambiar</button>
    </SwapContainer>
  );
};

export default TokenSwap;