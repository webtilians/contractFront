const hre = require("hardhat");

async function main() {
  await hre.run('compile');

  // Obtén el signer (cuenta) que desplegará el contrato
  const [deployer] = await hre.ethers.getSigners();
  const initialOwner = deployer.address; // Puedes usar la dirección del deployer o cualquier otra dirección

  // Obtén la fábrica del contrato
  const MyBasicNFT = await hre.ethers.getContractFactory("MyNFT");

  // Despliega el contrato pasando el parámetro requerido
  const myBasicNFT = await MyBasicNFT.deploy(initialOwner);
  await myBasicNFT.waitForDeployment();

  const contractAddress = await myBasicNFT.getAddress();
  console.log("MyBasicNFT desplegado en:", contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});