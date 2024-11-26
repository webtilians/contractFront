const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Desplegando contratos con la cuenta:", await deployer.getAddress());
  const PersonalAgreement = await hre.ethers.getContractFactory("PersonalAgreement", deployer);
  const personalAgreement = await PersonalAgreement.deploy();

  await personalAgreement.waitForDeployment();

  console.log("PersonalAgreement desplegado en:", personalAgreement.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});