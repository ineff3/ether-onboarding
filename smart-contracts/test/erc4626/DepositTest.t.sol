// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {SimpleVaultToken} from "../../src/01_ERC20/SimpleVaultToken.sol";
import {MockUSDC} from "../../src/common/MockUSDC.sol";
import {BadERC20} from "../../src/common/BadERC20.sol";

contract DepositTest is Test {
    MockUSDC mockUSDC;
    BadERC20 badERC20;
    SimpleVaultToken simpleVaultToken;

    function setUp() public {
        mockUSDC = new MockUSDC();
        badERC20 = new BadERC20();
        simpleVaultToken = new SimpleVaultToken(address(mockUSDC));
    }

    function testExpectedAmountOfShares() public {
        uint256 asset1 = 100;
        deal(address(mockUSDC), address(this), asset1);
        mockUSDC.approve(address(simpleVaultToken), asset1);
        uint256 share1 = simpleVaultToken.deposit(asset1, address(this));

        uint256 asset2 = 50;
        address user = makeAddr("Bob");
        deal(address(mockUSDC), user, asset2);
        vm.prank(user);
        mockUSDC.approve(address(simpleVaultToken), asset2);
        vm.prank(user);
        uint256 share2 = simpleVaultToken.deposit(asset2, user);

        assertEq(share1, asset1);
        assertEq(share2, asset2);
        assertEq(simpleVaultToken.totalSupply(), share1 + share2);
        assertEq(simpleVaultToken.balanceOf(address(this)), share1);
        assertEq(simpleVaultToken.balanceOf(user), share2);
    }

    function testWithOtherReceiver() public {
        address otherReceiver = makeAddr("Alice");

        uint256 asset1 = 100;
        deal(address(mockUSDC), address(this), asset1);
        mockUSDC.approve(address(simpleVaultToken), asset1);
        uint256 share1 = simpleVaultToken.deposit(asset1, otherReceiver);

        uint256 asset2 = 50;
        address user = makeAddr("Bob");
        deal(address(mockUSDC), user, asset2);
        vm.prank(user);
        mockUSDC.approve(address(simpleVaultToken), asset2);
        vm.prank(user);
        uint256 share2 = simpleVaultToken.deposit(asset2, otherReceiver);

        assertEq(simpleVaultToken.balanceOf(otherReceiver), share1 + share2);
        assertEq(simpleVaultToken.balanceOf(user), 0);
        assertEq(simpleVaultToken.balanceOf(address(this)), 0);
    }

    function testWithZeroAssets() public {
        uint256 asset1 = 100;
        deal(address(mockUSDC), address(this), asset1);
        mockUSDC.approve(address(simpleVaultToken), asset1);

        vm.expectRevert(SimpleVaultToken.ZeroInputAmount.selector);
        simpleVaultToken.deposit(0, address(this));
    }

    function testDepositEventEmission() public {
        uint256 assets = 100;
        deal(address(mockUSDC), address(this), assets);
        mockUSDC.approve(address(simpleVaultToken), assets);

        uint256 expectedShares = simpleVaultToken.convertToShares(assets);
        vm.expectEmit(true, true, false, true);
        emit SimpleVaultToken.Deposit(address(this), address(this), assets, expectedShares);
        simpleVaultToken.deposit(assets, address(this));
    }

    function testWithFailedTransferFrom() public {
        simpleVaultToken = new SimpleVaultToken(address(badERC20));

        uint256 assets = 100;
        deal(address(badERC20), address(this), assets);
        badERC20.approve(address(simpleVaultToken), assets);

        badERC20.setForceFailTransferFrom(true);
        vm.expectRevert("Transfer failed");
        simpleVaultToken.deposit(assets, address(this));
    }
}
