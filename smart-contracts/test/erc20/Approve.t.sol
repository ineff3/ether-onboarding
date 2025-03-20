// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {TestableGoldToken} from "../../src/01_ERC20/TestableGoldToken.sol";

contract ApproveTest is Test {
    TestableGoldToken goldToken;
    address owner;
    address spender;

    uint256 constant INIT_BALANCE = 100 * 10 ** 18;
    uint256 constant ALLOWANCE_AMOUNT = 50 * 10 ** 18;

    function setUp() public {
        goldToken = new TestableGoldToken();
        owner = makeAddr("Bob");
        spender = makeAddr("Alice");
        goldToken.mint(owner, INIT_BALANCE);
    }

    function testApprove() public {
        vm.prank(owner);
        goldToken.approve(spender, ALLOWANCE_AMOUNT);
        assertEq(goldToken.allowance(owner, spender), ALLOWANCE_AMOUNT);
    }

    function testApproveOverwrite() public {
        vm.prank(owner);
        goldToken.approve(spender, ALLOWANCE_AMOUNT);
        assertEq(goldToken.allowance(owner, spender), ALLOWANCE_AMOUNT);

        uint256 newAllowance = 30 * 10 ** 18;
        vm.prank(owner);
        goldToken.approve(spender, newAllowance);
        assertEq(goldToken.allowance(owner, spender), newAllowance);
    }

    function testApproveZeroAddress() public {
        vm.prank(owner);
        vm.expectRevert();
        goldToken.approve(address(0), ALLOWANCE_AMOUNT);
    }
}
