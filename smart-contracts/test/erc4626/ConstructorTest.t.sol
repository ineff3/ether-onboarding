// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {SimpleVaultToken} from "../../src/01_ERC20/SimpleVaultToken.sol";

contract ConstructorTest is Test {
    SimpleVaultToken simpleVaultToken;

    function setUp() public {
        simpleVaultToken = new SimpleVaultToken(makeAddr("USDC"));
    }

    function testTokenMetadata() public view {
        assertEq(simpleVaultToken.name(), "SimpleVaultToken");
        assertEq(simpleVaultToken.symbol(), "SVT");
    }

    function testUnderlyingAddressNotEmpty() public {
        vm.expectRevert("Invalid asset address");
        simpleVaultToken = new SimpleVaultToken(address(0));
    }
}
