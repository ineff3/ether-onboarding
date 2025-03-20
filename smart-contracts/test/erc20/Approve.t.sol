// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {GoldToken} from "../../src/01_ERC20/GoldToken.sol";

contract ApproveTest is Test {
    GoldToken goldToken;
    address owner;
    address spender;
    event Approval(address indexed owner, address indexed spender, uint256 value);

    uint256 constant INIT_BALANCE = 100;
    uint256 constant ALLOWANCE_AMOUNT = 50;

    function setUp() public {
        goldToken = new GoldToken();
        owner = makeAddr("Bob");
        spender = makeAddr("Alice");
        deal(address(goldToken), owner, INIT_BALANCE);
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
        vm.expectRevert("ERC20: approve to the zero address");
        goldToken.approve(address(0), ALLOWANCE_AMOUNT);
    }

    function testEmitsApprovalEvent() public {
        vm.expectEmit(true, true, true, true);
        emit Approval(owner, spender, ALLOWANCE_AMOUNT);

        vm.prank(owner);
        goldToken.approve(spender, ALLOWANCE_AMOUNT);
    }
}
