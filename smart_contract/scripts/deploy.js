const { ethers } = require("hardhat");

const main = async () => {
  const AuthentifiFactory = await ethers.getContractFactory("Authentifi");
  const AuthentifiContract = await AuthentifiFactory.deploy();
  console.log("Contract deployed on address:", AuthentifiContract.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("Error in deploying contract >>", error);
    process.exit(1);
  });
