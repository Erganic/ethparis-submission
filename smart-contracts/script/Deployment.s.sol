// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Script } from "forge-std/Script.sol";
import { ManagerFactory } from "../src/ManagerFactory.sol";
import { RoyaltyManager } from "../src/RoyaltyManager.sol";

contract Deployment is Script {
    ManagerFactory public factory;
    RoyaltyManager public manager;

    address public mockDAIAddress = 0x53844F9577C2334e541Aec7Df7174ECe5dF1fCf0;
    address public easAddress = 0xC2679fBD37d54388Ce493F1DB75320D236e1815e;

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);
        factory = new ManagerFactory(easAddress, mockDAIAddress);
        factory.createManager();
        vm.stopBroadcast();
    }
}
