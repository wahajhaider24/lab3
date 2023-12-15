require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/83b607a9da6648eda62e165bb0d12e4f",
      accounts: ["8966d4a2c90e0231a0afa8dc07e504bb80adc509bca454e3cb6bf89d610e7e77"] ,
    }
  },

};
