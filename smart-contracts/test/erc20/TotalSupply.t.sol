// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {GoldToken} from "../../src/01_ERC20/GoldToken.sol";
import {TokenHelper} from "../../src/common/TokenHelper.sol";
import "../../src/01_ERC20/interfaces/IERC20.sol";

contract TotalSupplyTest is Test {
    function testTotalSupply() public {
        GoldToken goldToken = new GoldToken();
        TokenHelper tokenHelper = new TokenHelper();

        uint256 INIT_TOKEN_SUPPLY = 1000;
        uint256 INIT_TOKEN_SUPPLY_PARSED = tokenHelper.parseToken(INIT_TOKEN_SUPPLY, IERC20(address(goldToken)));

        assertEq(goldToken.totalSupply(), INIT_TOKEN_SUPPLY_PARSED);
    }
}
