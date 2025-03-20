// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {GoldToken} from "../../src/01_ERC20/GoldToken.sol";

contract AllowanceTest is Test {
    GoldToken goldToken;
    address owner;
    address spender;
    uint256 constant ALLOW_AMOUNT = 10 * 10 ** 18;

    function setUp() public {
        goldToken = new GoldToken();
        owner = makeAddr("Alice");
        spender = makeAddr("John");
    }

    function testAllowance() public {
        vm.prank(owner);
        goldToken.approve(spender, ALLOW_AMOUNT);

        assertEq(goldToken.allowance(owner, spender), ALLOW_AMOUNT);
    }

    function testInitiallyZero() public view {
        assertEq(goldToken.allowance(owner, spender), 0);
    }
}
