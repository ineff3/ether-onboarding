// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {GoldToken} from "../../src/01_ERC20/GoldToken.sol";

import {TokenHelper} from "../../src/common/TokenHelper.sol";
import "../../src/01_ERC20/interfaces/IERC20.sol";

contract ConstructorTest is Test {
    GoldToken goldToken;
    TokenHelper tokenHelper;
    address deployer;
    uint256 constant INITIAL_SUPPLY = 1000;

    function setUp() public {
        deployer = makeAddr("Deployer");
        vm.prank(deployer);
        goldToken = new GoldToken();
        tokenHelper = new TokenHelper();
    }

    function testTokenMetadata() public view {
        assertEq(goldToken.name(), "GoldToken");
        assertEq(goldToken.symbol(), "GLD");
    }

    function testInitialSupplyMinted() public view {
        uint256 INITIAL_SUPPLY_PARSED = tokenHelper.parseToken(INITIAL_SUPPLY, IERC20(address(goldToken)));
        assertEq(goldToken.balanceOf(deployer), INITIAL_SUPPLY_PARSED);
    }
}
