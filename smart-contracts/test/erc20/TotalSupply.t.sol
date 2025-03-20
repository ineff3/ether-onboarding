// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {GoldToken} from "../../src/01_ERC20/GoldToken.sol";

contract TotalSupplyTest is Test {
    function testTotalSupply() public {
        GoldToken goldToken = new GoldToken();
        uint256 initTokenSupply = 1000 * 10 ** goldToken.decimals();

        assertEq(goldToken.totalSupply(), initTokenSupply);
    }
}
