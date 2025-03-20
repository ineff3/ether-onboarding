// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {GoldToken} from "../../src/01_ERC20/GoldToken.sol";

contract TransferFromTest is Test {
    GoldToken goldToken;
    address owner;
    address spender;
    address recipient;
    event Transfer(address indexed from, address indexed to, uint256 value);

    uint256 constant INIT_BALANCE = 100;
    uint256 constant ALLOWANCE_AMOUNT = 50;
    uint256 constant TRANSFER_AMOUNT = 20;

    function setUp() public {
        goldToken = new GoldToken();
        owner = makeAddr("Bob");
        spender = makeAddr("Alice");
        recipient = makeAddr("John");

        deal(address(goldToken), owner, INIT_BALANCE);
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
        vm.expectRevert("ERC20: insufficient allowance");
        goldToken.transferFrom(owner, recipient, TRANSFER_AMOUNT);
    }

    function testTransferMoreThanApproved() public {
        vm.prank(spender);
        vm.expectRevert("ERC20: insufficient allowance");
        goldToken.transferFrom(owner, recipient, ALLOWANCE_AMOUNT + 10);
    }

    function testTransferWithMoreTransferAmountThanBalance() public {
        vm.prank(spender);
        deal(address(goldToken), owner, 0);
        vm.expectRevert("ERC20: insufficient allowance");
        goldToken.transferFrom(owner, recipient, TRANSFER_AMOUNT);
    }

    function testTransferFromEmitsEvent() public {
        vm.expectEmit(true, true, true, true);
        emit Transfer(owner, recipient, TRANSFER_AMOUNT);

        vm.prank(spender);
        goldToken.transferFrom(owner, recipient, TRANSFER_AMOUNT);
    }
}
