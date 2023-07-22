const {ethers} = require("hardhat");

async function main() {


  const lock = await ethers.deployContract("0x7f6d87d9e732ec81f05f54993d26deba");

  await lock.waitForDeployment();

  console.log(
    lock.address
  );


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
