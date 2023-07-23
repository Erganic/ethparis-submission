# ethparis-submission
Top-level repo for the ETHParis submission

## Demo
* http://demo.erganism.art/

## Figma Mockups
* [Wireframes](https://www.figma.com/file/OYtQHCBnKUdFqDqFfBWiW8/Erganism?type=design&node-id=3406:3029&mode=design&t=7IElT2FkkxSo2vyi-1)

## Directories
* [Erganic Github Organisation Repositories](https://github.com/orgs/Erganic/repositories)

    This repository contains the code from several repositories which have been merged into this repo under separate directories via git subtree. The following table describes what is contained in each directory, and the corresponding repository containing the code specific to that feature/implementation:

    |Repository|Description|Link|
    | --- | --- | --- |
    | webapp | Webapp | https://github.com/Erganic/webapp |
    | smart-contracts | Smart Contracts | https://github.com/Erganic/smart-contracts |
    | test-sismo | Sismo ID | https://github.com/Erganic/test-sismo |
    | attest-station | EAS Graph | https://github.com/Erganic/attest-station |
    | art-boutique | IPFS | https://github.com/Erganic/art-boutique |

## Erganic Infrastructure contracts
This repository supplies source code for modular cross-chain communication layer for the Erganic components. Represented contracts enable users to experiment with a set of on-chain activities:
- Tokenize art pieces
- Issue licenses
- Interact with licenses
- Rely on to:
  - Attest 
  - Check attestation  
- Deposit funds in Safe Vault for:
  - Customizated behavior (pool, social impact)
  - Frictionless cross-chain interaction via Hyperlane 
- Via Safe Vault, request to:
  - Bridge funds
  - Transfer authority on Safe Vault to arbitrary actor

## Deployments

|Celo||
| --- | --- |
| HyperLightVault | [0x8d741Bdf3007FDf9f72277cef2A7103e8fE2B2F6](https://explorer.celo.org/alfajores/address/0x8d741Bdf3007FDf9f72277cef2A7103e8fE2B2F6/transactions) |
| L2LightVault | [0x7a57D5d5abe4b528945Ef9df809c3d2b0347C9be](https://explorer.celo.org/alfajores/address/0x7a57D5d5abe4b528945Ef9df809c3d2b0347C9be/transactions)|
| L2LightVaultFactory | [0x02F39E83656C3d7AE3F02721c6AA90e01d861c09](https://explorer.celo.org/alfajores/address/0x02F39E83656C3d7AE3F02721c6AA90e01d861c09/transactions) |

|Sepolia||
| --- | --- |
| L2CommunicationInitiator | [0x906247C1DBfcB161C32C14184Af6E65Cb5b88bEf](https://sepolia.etherscan.io/address/0x906247c1dbfcb161c32c14184af6e65cb5b88bef) |
| RoyaltyManager | [0x6eb6dae84a86d7e63242dde6118a98df76e3bb1a](https://sepolia.etherscan.io/address/0x6eb6dae84a86d7e63242dde6118a98df76e3bb1a) |