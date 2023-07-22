// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { RoyaltyManager } from "./RoyaltyManager.sol";

/**
    @title ManagerFactory
    @notice This contract is used to create new instances of the RoyaltyManager contract.
*/
contract ManagerFactory {
    
        /**
            @notice Event emitted when a new instance of the RoyaltyManager contract is created.
            @param manager The address of the new instance of the RoyaltyManager contract.
        */
        event ManagerCreated(address indexed manager);
    
        /**
            @notice The address of the EAS smart contract.
        */
        address public eas;
    
        /**
            @notice The address of the token smart contract.
        */
        address public token;
    
        /**
            @notice Consturctor of this smart contract.
            @param _easAddress The address of the EAS smart contract.
            @param _tokenAddress The address of the token smart contract.
        */
        constructor(address _easAddress, address _tokenAddress) {
            eas = _easAddress;
            token = _tokenAddress;
        }
    
        /**
            @notice The owner of the factory can create a new instance of the RoyaltyManager contract.
            @return The address of the new instance of the RoyaltyManager contract.
        */
        function createManager() external returns (address) {
            RoyaltyManager manager = new RoyaltyManager(eas, token);
            emit ManagerCreated(address(manager));
            return address(manager);
        }
}