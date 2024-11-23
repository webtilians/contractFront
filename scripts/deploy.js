// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const MyBasicNFT = await hre.ethers.getContractFactory("contracts/MyBasicNFT.sol:MyBasicNFT");
  const [deployer] = await hre.ethers.getSigners();
  
  const name = "MyDynamicToken"; // Puedes cambiar esto a cualquier nombre que desees
  const symbol = "MDT"; // Puedes cambiar esto a cualquier símbolo que desees
  
  const myBasicNFT = await MyBasicNFT.deploy(name, symbol, deployer.address);

  await myBasicNFT.deployed();

  console.log("MyBasicNFT desplegado en:", myBasicNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error en el despliegue:", error);
    process.exit(1);
  });