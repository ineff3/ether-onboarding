// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {SimpleVaultToken} from "../../src/01_ERC20/SimpleVaultToken.sol";
import {MockUSDC} from "../../src/common/MockUSDC.sol";


contract HarvestTest is Test {
    SimpleVaultToken simpleVaultToken;
    MockUSDC mockUSDC;
    address ownerAccount;

    function setUp() public {
        ownerAccount = makeAddr("Owner");
        mockUSDC = new MockUSDC();
        vm.prank(ownerAccount);
        simpleVaultToken = new SimpleVaultToken(address(mockUSDC));
    }

    function testWithZeroAmount() public {
        vm.prank(ownerAccount);
        vm.expectRevert(SimpleVaultToken.ZeroInputAmount.selector);
        simpleVaultToken.harvest(0);
    }

    function testWithNotOwnerAccount() public {
        address user = makeAddr("Bob");

        vm.prank(user);

        vm.expectRevert("Ownable: caller is not the owner");
        simpleVaultToken.harvest(100);
    }

    function testWithOwnerAccount() public {
        uint256 amount = 100;

        deal(address(mockUSDC), ownerAccount, amount);
        vm.prank(ownerAccount);
        mockUSDC.approve(address(simpleVaultToken), amount);

        vm.prank(ownerAccount);
        simpleVaultToken.harvest(amount);

        assertEq(mockUSDC.balanceOf(address(simpleVaultToken)), amount);
    }

    function testSharesDifference() public {
        uint256 depositAmount = 100;
        deal(address(mockUSDC), address(this), depositAmount);
        mockUSDC.approve(address(simpleVaultToken), depositAmount);
        uint256 shares = simpleVaultToken.deposit(depositAmount, address(this));

        uint256 harvestAmount = 50;
        deal(address(mockUSDC), ownerAccount, harvestAmount);
        vm.prank(ownerAccount);
        mockUSDC.approve(address(simpleVaultToken), harvestAmount);
        vm.prank(ownerAccount);
        simpleVaultToken.harvest(harvestAmount);

        uint256 expectedShares = (depositAmount * shares) / (depositAmount + harvestAmount);
        assertEq(simpleVaultToken.convertToShares(depositAmount), expectedShares);
    }

    function testHarvestEventEmission() public {
        uint256 harvestAmount = 50;
        deal(address(mockUSDC), ownerAccount, harvestAmount);
        vm.prank(ownerAccount);
        mockUSDC.approve(address(simpleVaultToken), harvestAmount);

        vm.expectEmit(true, false, false, true);
        emit SimpleVaultToken.Harvest(
            ownerAccount,
            harvestAmount
        );

        vm.prank(ownerAccount);
        simpleVaultToken.harvest(harvestAmount);
    }
}
