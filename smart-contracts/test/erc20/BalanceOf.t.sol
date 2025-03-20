// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {TestableGoldToken} from "../../src/01_ERC20/TestableGoldToken.sol";

contract BalanceOfTest is Test {
    function testAccountBalance() public {
        TestableGoldToken goldToken = new TestableGoldToken();

        address user1 = makeAddr("Bob");
        uint256 testBalance = 100 * 10 ** goldToken.decimals();

        goldToken.mint(user1, testBalance);

        assertEq(goldToken.balanceOf(user1), testBalance);
    }
}
