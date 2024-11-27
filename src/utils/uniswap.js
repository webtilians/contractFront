import { ethers } from 'ethers';
import { ChainId, Token, WETH, Fetcher, Route, Trade, TokenAmount, TradeType } from '@uniswap/sdk';

const chainId = ChainId.SEPOLIA; // O ChainId.SEPOLIA si estás en testnet

export const getPrice = async (tokenAddress) => {
  const token = await Fetcher.fetchTokenData(chainId, tokenAddress);
  const pair = await Fetcher.fetchPairData(token, WETH[chainId]);
  const route = new Route([pair], WETH[chainId]);
  return route.midPrice.toSignificant(6);
};

// Agrega más funciones según las necesidades