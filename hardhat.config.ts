import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      mining: {
        auto: false,
      },
      gas: "auto",
      loggingEnabled: true,
    },

    holesky:{
      url:"https://ethereum-holesky.blockpi.network/v1/rpc/public",
      accounts: [
        "af6b265e6e3b5a76b7dab1fc438c17f80c0dacbe401ce4014b5523f2f79aa770",
        "76591e4de92849e8989241b52e2306591e9bebd9d744999bc6eb068657fa5dbc",
      ],
    }
    
  },
};

export default config;
