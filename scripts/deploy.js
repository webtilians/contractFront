const hre = require("hardhat");

async function main() {
  await hre.run('compile');

  const [deployer] = await hre.ethers.getSigners();
  console.log("Desplegando contratos con la cuenta:", deployer.address);

  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy(deployer.address);
  await lottery.waitForDeployment();

  const contractAddress = await lottery.getAddress();
  console.log("Lottery desplegado en:", contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});