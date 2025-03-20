// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {GoldToken} from "../../src/01_ERC20/GoldToken.sol";

contract BalanceOfTest is Test {
    GoldToken goldToken;

    function setUp() public {
        goldToken = new GoldToken();
    }

    function testAccountBalance() public {
        address user = makeAddr("Bob");
        uint256 testBalance = 100;

        deal(address(goldToken), user, testBalance);

        assertEq(goldToken.balanceOf(user), testBalance);
    }

    function testEmptyAccountBalance() public {
        address user = makeAddr("Bob");
        assertEq(goldToken.balanceOf(user), 0);
    }
}
