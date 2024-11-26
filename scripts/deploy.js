const hre = require("hardhat");

async function main() {
  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.waitForDeployment();

  console.log("Marketplace desplegado en:", marketplace.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});