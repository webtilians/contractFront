const hre = require("hardhat");

async function main() {
  console.log("deploy.js");
  const [deployer] = await hre.ethers.getSigners();

  console.log("Desplegando contratos con la cuenta:", deployer.address);
  const PersonalAgreement = await hre.ethers.getContractFactory("PersonalAgreement");
  const personalAgreement = await PersonalAgreement.deploy();

  await personalAgreement.deployed();

  console.log("PersonalAgreement deployed to:", personalAgreement.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });