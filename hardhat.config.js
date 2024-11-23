// hardhat.config.js
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
console.log("SEPOLIA_RPC_URL:", SEPOLIA_RPC_URL);
console.log("PRIVATE_KEY cargada correctamente.");
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
  },
};