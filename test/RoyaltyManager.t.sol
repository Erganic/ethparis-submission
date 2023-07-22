// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import { RoyaltyManager } from "../src/RoyaltyManager.sol";
import { IEAS } from "eas-contracts/IEAS.sol";
import { Attestation } from "eas-contracts/Common.sol";
import { IERC20 } from "openzeppelin/contracts/token/ERC20/IERC20.sol";
import "forge-std/console.sol";

contract RoyaltyManagerTest is Test {
    RoyaltyManager public manager;
    IEAS public eas;
    IERC20 public token;

    function setUp() public {
        uint256 forkId = vm.createFork("sepolia");
        vm.selectFork(forkId);
        token = IERC20(0x53844F9577C2334e541Aec7Df7174ECe5dF1fCf0);
        manager = new RoyaltyManager(0xC2679fBD37d54388Ce493F1DB75320D236e1815e, 0x53844F9577C2334e541Aec7Df7174ECe5dF1fCf0);
        eas = IEAS(0xC2679fBD37d54388Ce493F1DB75320D236e1815e);
    }

    function testBuyLicense() public {
        token.create(address(this));
        console.log("token balance: %d", token.balanceOf(address(this)));
        Attestation memory attestation = eas.getAttestation(0x49dc5a7b1e7c5f0bef481f400f2044446d6a7b38b3ba59c26e3fd75afedb611a);
        uint256 price = manager._getPrice(attestation.data);
        console.log("price from _getPrice: %d", price);
        token.approve(address(manager), price);
        manager.buyLicense(0x49dc5a7b1e7c5f0bef481f400f2044446d6a7b38b3ba59c26e3fd75afedb611a, price);
        console.log("token balance: %d", token.balanceOf(address(this)));
        console.log("token balance of manager: %d", token.balanceOf(address(manager)));
        assertEq(token.balanceOf(address(manager)), price);
    }
}
