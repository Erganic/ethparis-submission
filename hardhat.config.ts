import { HardhatUserConfig } from "hardhat/types";
import * as dotenv from "dotenv";

// Hardhat plugins
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import "solidity-coverage";
require("hardhat-contract-sizer");
require("@openzeppelin/hardhat-upgrades")

dotenv.config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//   solidity: "0.8.18",
// };
// module.exports = {
//   defaultNetwork: "mumbai",
//   networks: {
//       hardhat: {
//           blockGasLimit: 103039 // whatever you want here
//       },
//   }
// }
const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.13",
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
    ],
  },

  // contractSizer: {
  //   alphaSort: true,
  //   disambiguatePaths: false,
  //   runOnCompile: true,
  //   strict: true,
  // },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    goerli: {
      url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: [`${process.env.KEY}`],
    },
    mumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      accounts: [`${process.env.KEY}`],   
    },
    fantomTest: {
      url: "https://rpc.ankr.com/fantom_testnet",
      accounts: [`${process.env.KEY}`],
    },
    bscTest: {
      url: "https://bsc-testnet.publicnode.com",
      accounts: [`${process.env.KEY}`],
    },
    fuji: {
      url: "https://rpc.ankr.com/avalanche_fuji",
      accounts: [`${process.env.KEY}`],
    },
    polygon: {
      url: "https://rpc.ankr.com/polygon",
      accounts: [`${process.env.KEY}`],
    },
    fantom: {
      url: "https://rpc.ankr.com/fantom",
      accounts: [`${process.env.KEY}`],
    },
    

    

  },
};

export default config;
