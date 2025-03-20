// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {GoldToken} from "../../src/01_ERC20/GoldToken.sol";

contract TransferTest is Test {
    GoldToken goldToken;
    address sender;
    address receiver;
    event Transfer(address indexed from, address indexed to, uint256 value);

    uint256 constant INIT_BALANCE = 100;
    uint256 constant TRANSFER_AMOUNT = 50;

    function setUp() public {
        goldToken = new GoldToken();
        sender = makeAddr("Bob");
        receiver = makeAddr("Alice");
        deal(address(goldToken), sender, INIT_BALANCE);
    }

    function testTransfer() public {
        vm.prank(sender);
        goldToken.transfer(receiver, TRANSFER_AMOUNT);

        assertEq(goldToken.balanceOf(sender), INIT_BALANCE - TRANSFER_AMOUNT);
        assertEq(goldToken.balanceOf(receiver), TRANSFER_AMOUNT);
    }

    function testTransferFullBalance() public {
        vm.prank(sender);
        goldToken.transfer(receiver, INIT_BALANCE);

        assertEq(goldToken.balanceOf(sender), 0);
        assertEq(goldToken.balanceOf(receiver), INIT_BALANCE);
    }

    function testTransferToZeroAddress() public {
        vm.prank(sender);
        vm.expectRevert("ERC20: transfer to the zero address");
        goldToken.transfer(address(0), TRANSFER_AMOUNT);
    }

    function testTransferMoreThanBalance() public {
        vm.prank(sender);
        vm.expectRevert("ERC20: transfer amount exceeds balance");
        goldToken.transfer(receiver, INIT_BALANCE + 1);
    }

    function testEmitsTransferEvent() public {
        vm.expectEmit(true, true, true, true);
        emit Transfer(sender, receiver, TRANSFER_AMOUNT);

        vm.prank(sender);
        goldToken.transfer(receiver, TRANSFER_AMOUNT);
    }
}
