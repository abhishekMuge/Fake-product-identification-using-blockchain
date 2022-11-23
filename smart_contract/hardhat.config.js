require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_API_KEY = "BOO4QxWVqL12KwK-O_Sbxx66LRKh9FCU";
const GOERLI_PRIVATE_KEY =
  "ba31ceb20acb06f157bbf5b39c0faf840423816d37274e2d20310a81b41e7b4c";

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};

// Contract deployed on address: 0x1f31449ff2175D485F5f1F7055C91cdb1dac995B
// second version
// Contract deployed on address: 0xc7BBF1283f5955F53eaE43Dce46EA2C23b68BC90
