// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {TestableGoldToken} from "../../src/01_ERC20/TestableGoldToken.sol";

contract TransferTest is Test {
    TestableGoldToken goldToken;
    address sender;
    address receiver;

    uint256 constant INIT_BALANCE = 100 * 10 ** 18;
    uint256 constant TRANSFER_AMOUNT = 50 * 10 ** 18;

    function setUp() public {
        goldToken = new TestableGoldToken();
        sender = makeAddr("Bob");
        receiver = makeAddr("Alice");
        goldToken.mint(sender, INIT_BALANCE);
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
        vm.expectRevert();
        goldToken.transfer(address(0), TRANSFER_AMOUNT);
    }

    function testTransferMoreThanBalance() public {
        vm.prank(sender);
        vm.expectRevert();
        goldToken.transfer(receiver, INIT_BALANCE + 1);
    }
}
