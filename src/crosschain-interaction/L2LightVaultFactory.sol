pragma solidity ^0.8.0;

import "contracts/L2LightVault.sol";

contract L2LightVaultFactory { 
    function create(uint32 targetChainId, address targetAddress) public returns (address) {
        L2LightVault vault = new L2LightVault(msg.sender, targetChainId, targetAddress);

        return address(vault);
    }
}