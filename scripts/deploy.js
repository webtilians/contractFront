const hre = require("hardhat");

async function main() {
  // Compilar el contrato si no está compilado
  await hre.run('compile');

  // Obtener el contrato a desplegar
  const Tournament = await hre.ethers.getContractFactory("Tournament");
  const tournament = await Tournament.deploy();

  await tournament.waitForDeployment();

  console.log("tournament desplegado en:", tournament.target);
}

// Manejar errores y ejecutar la función principal
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});