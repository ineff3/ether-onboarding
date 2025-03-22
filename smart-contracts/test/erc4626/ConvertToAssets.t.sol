// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {SimpleVaultToken} from "../../src/01_ERC20/SimpleVaultToken.sol";
import {MockUSDC} from "../../src/common/MockUSDC.sol";

contract ConvertToAssetsTest is Test {
    MockUSDC mockUSDC;
    SimpleVaultToken simpleVaultToken;

    function setUp() public {
        mockUSDC = new MockUSDC();
        simpleVaultToken = new SimpleVaultToken(address(mockUSDC));
    }

    function testEmptyVault() public view {
        uint256 shares = 100;
        uint256 expectedAssets = shares;

        uint256 assets = simpleVaultToken.convertToAssets(shares);
        assertEq(assets, expectedAssets);
    }

    function testWithAssets() public {
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


        uint256 totalAssets = asset1 + asset2;
        uint256 totalShares = share1 + share2;
        uint256 expectedShares = (share1 * totalAssets) / totalShares;
        assertEq(simpleVaultToken.convertToAssets(share1), expectedShares);
    }

    function testZeroShares() public view {
        uint256 assets = simpleVaultToken.convertToAssets(0);
        assertEq(assets, 0);
    }
}
