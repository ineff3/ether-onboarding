// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {SimpleVaultToken} from "../../src/01_ERC20/SimpleVaultToken.sol";
import {MockUSDC} from "../../src/common/MockUSDC.sol";

contract DepositTest is Test {
    MockUSDC mockUSDC;
    SimpleVaultToken simpleVaultToken;

    function setUp() public {
        mockUSDC = new MockUSDC();
        simpleVaultToken = new SimpleVaultToken(address(mockUSDC));
    }

    function testBurnShares() public {
        uint256 asset1 = 100;
        deal(address(mockUSDC), address(this), asset1);
        mockUSDC.approve(address(simpleVaultToken), asset1);
        simpleVaultToken.deposit(asset1, address(this));

        simpleVaultToken.withdraw(asset1, address(this), address(this));

        assertEq(simpleVaultToken.balanceOf(address(this)), 0);
        assertEq(mockUSDC.balanceOf(address(this)), asset1);
        assertEq(simpleVaultToken.totalSupply(), 0);
        assertEq(mockUSDC.balanceOf(address(simpleVaultToken)), 0);
    }

    function testWithOtherReceiver() public {
        uint256 asset1 = 100;
        deal(address(mockUSDC), address(this), asset1);
        mockUSDC.approve(address(simpleVaultToken), asset1);
        simpleVaultToken.deposit(asset1, address(this));

        address otherReceiver = makeAddr("Bob");

        simpleVaultToken.withdraw(asset1, otherReceiver, address(this));

        assertEq(mockUSDC.balanceOf(otherReceiver), asset1);
    }

    function testWithZeroAssets() public {
        vm.expectRevert(SimpleVaultToken.ZeroInputAmount.selector);
        simpleVaultToken.withdraw(0, address(this), address(this));
    }

    function testWithInsufficientBalance() public {
        vm.expectRevert("Not enough SVT balance");
        simpleVaultToken.withdraw(100, address(this), address(this));
    }
}
