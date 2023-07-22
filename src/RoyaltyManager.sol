// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;
import { EAS } from "eas-contracts/EAS.sol";
import { Attestation } from "eas-contracts/Common.sol";
import { IERC20 } from "openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
    @title Ergonomic
    @notice This contract handles the distribution of the royalties to the artists who have 
    contributed to the creation of purchased artwork.
*/

contract Distributor {

    EAS public eas;
    IERC20 public token;

    /**
        @notice Mapping of the artists' addresses to their royalties.
     */
    mapping(address => uint256) public balance;

    /**
        @notice Consturctor of this smart contract.
        @param _easAddress The address of the EAS smart contract.
        @param _tokenAddress The address of the token smart contract.
     */

    constructor(address _easAddress, address _tokenAddress) { 
        eas = new EAS(_easAddress);
        token = new IERC20(_tokenAddress);
    }

    /**
        @notice The user will call this function to buy the license of the artwork. The function will 
        update the balances of all artisits who have contributed to the branch of the artwork.
        @param _artworkId The uid of attestation record of the purhchased artwork.
     */
    function buyLicense(uint256 _artworkId, uint256 amount) external {
        Attestation memory attestation = eas.getAttestation(_artworkId);
        uint256 tempAmount;

        if (attestation.refUID == 0) {
            balance[attestation.attester] += tempAmount;
            return; // Exit the function after allocating funds to the attester
        }

        while (attestation.refUID != 0) {
            balance[attestation.attester] = tempAmount / 50;
            tempAmount = tempAmount / 50;
            _artworkId = attestation.refUID;
            attestation = eas.getAttestation(_artworkId);
        }

    }

    /**
        @notice Artist can call this function to withdraw all of their accumulated balance
        @param _artist The address of the artist
        @param _amount The amount of the balance to be withdrawn
     */
    function withdraw(address _artist, uint256 _amount) external {
        require(balance[_artist] >= _amount, "Insufficient balance");
        balance[_artist] -= _amount;
        token.transfer(_artist, _amount);
    }  

    function decodeData(bytes memory data) pure public returns(address, uint256){
        (address creator, string storage ipfs, string storage license) = abi.decode(data, (address,string,string));
        return (creator,ipfs,license);
   }
}
