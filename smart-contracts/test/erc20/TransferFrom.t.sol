// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {TestableGoldToken} from "../../src/01_ERC20/TestableGoldToken.sol";

contract TransferFromTest is Test {
    TestableGoldToken goldToken;
    address owner;
    address spender;
    address recipient;

    uint256 constant INIT_BALANCE = 100 * 10 ** 18;
    uint256 constant ALLOWANCE_AMOUNT = 50 * 10 ** 18;
    uint256 constant TRANSFER_AMOUNT = 20 * 10 ** 18;

    function setUp() public {
        goldToken = new TestableGoldToken();
        owner = makeAddr("Bob");
        spender = makeAddr("Alice");
        recipient = makeAddr("John");

        goldToken.mint(owner, INIT_BALANCE);
        vm.prank(owner);
        goldToken.approve(spender, ALLOWANCE_AMOUNT);
    }

    function testTransferFrom() public {
        vm.prank(spender);
        goldToken.transferFrom(owner, recipient, TRANSFER_AMOUNT);

        assertEq(goldToken.balanceOf(owner), INIT_BALANCE - TRANSFER_AMOUNT);
        assertEq(goldToken.balanceOf(recipient), TRANSFER_AMOUNT);
        assertEq(goldToken.allowance(owner, spender), ALLOWANCE_AMOUNT - TRANSFER_AMOUNT);
    }

    function testTransferFromWithoutApproval() public {
        address unapprovedSpender = makeAddr("Ge");
        vm.prank(unapprovedSpender);
        vm.expectRevert();
        goldToken.transferFrom(owner, recipient, TRANSFER_AMOUNT);
    }

    function testTransferMoreThanApproved() public {
        vm.prank(spender);
        vm.expectRevert();
        goldToken.transferFrom(owner, recipient, ALLOWANCE_AMOUNT + 10);
    }
}
