// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import { EAS } from "eas-contracts/EAS.sol";

/**
    @title Ergonomic
    @notice This contract handles the distribution of the royalties to the artists who have 
    contributed to the creation of purchased artwork.
*/

contract Distributor {

    EAS public eas;

    /**
        @notice Mapping of the artists' addresses to their royalties.
     */
    mapping(address => uint256) public royalties;

    /**
        @notice Consturctor of this smart contract.
     */

    constructor(address _easAddress) { 
        eas = new EAS(_easAddress);
    }

    /**
        @notice The user will call this function to buy the license of the artwork. The function will 
        update the balances of all artisits who have contributed to the branch of the artwork.
        @param _artworkId The uid of attestation record of the purhchased artwork.
     */
    function buyLicense(uint256 _artworkId) external {
        
    }

    /**
        @notice Internal function that will be used to call the attestation service.
        @param _artworkId The uid of attestation record of the purhchased artwork.
     */
    function _callAttestationService(uint256 _artworkId) internal {
        eas.getAttestation(_artworkId);
    }
}
