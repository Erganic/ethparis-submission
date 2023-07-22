// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import { RoyaltyManager } from "../src/RoyaltyManager.sol";
import { EAS } from "eas-contracts/EAS.sol";
import { Attestation } from "eas-contracts/Common.sol";
import "forge-std/console.sol";

contract RoyaltyManagerTest is Test {
    RoyaltyManager public manager;
    EAS public eas;

    function setUp() public {
        uint256 forkId = vm.createFork(0xC2679fBD37d54388Ce493F1DB75320D236e1815e);
        vm.selectFork(forkId);
        manager = new RoyaltyManager();
        eas = new EAS(address(manager));
    }

    function testDataDecode() public {
        Attestation memory attestation = eas.getAttestation(0xbd6e229d68570631b6f0f87c95cef6e62b3bbf4fcbf3965892349fe4c1d6f069);
        console.log(manager.decodeData(attestation.data));

    }
}
