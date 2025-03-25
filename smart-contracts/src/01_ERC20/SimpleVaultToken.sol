// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin-contracts/token/ERC20/ERC20.sol";
import "@openzeppelin-contracts/access/Ownable.sol";
import "./interfaces/ISimpleERC4626.sol";

contract SimpleVaultToken is ERC20, Ownable, ISimpleERC4626 {
    event Deposit(address indexed sender, address indexed owner, uint256 assets, uint256 shares);
    event Withdraw(
        address indexed sender,
        address indexed receiver,
        address indexed owner,
        uint256 assets,
        uint256 shares
    );
    event Harvest(address indexed sender, uint256 amount);

    IERC20 public immutable underlyingAsset;

    error ZeroInputAmount();

    constructor(address _underlyingAsset) ERC20("SimpleVaultToken", "SVT") Ownable() {
        require(_underlyingAsset != address(0), "Invalid asset address");
        underlyingAsset = IERC20(_underlyingAsset);
    }

    function asset() external view override returns (address) {
        return address(underlyingAsset);
    }

    function convertToShares(uint256 assets) public view override returns (uint256 shares) {
        uint256 totalAssets = underlyingAsset.balanceOf(address(this));
        uint256 totalShares = totalSupply();

        if (totalShares == 0 || totalAssets == 0) {
            return assets;
        }

        return (assets * totalShares) / totalAssets;
    }

    function deposit(uint256 assets, address receiver) external override returns (uint256 shares) {
        if (assets == 0) {
            revert ZeroInputAmount();
        }

        uint256 expectedShares = convertToShares(assets);

        require(underlyingAsset.transferFrom(msg.sender, address(this), assets), "Transfer failed");

        _mint(receiver, expectedShares);

        emit Deposit(msg.sender, receiver, assets, expectedShares);

        return expectedShares;
    }

    function withdraw(uint256 assets, address receiver, address owner) external override returns (uint256 shares) {
        if (assets == 0) {
            revert ZeroInputAmount();
        }

        uint256 ownerShares = convertToShares(assets);

        require(balanceOf(owner) >= ownerShares, "Not enough SVT balance");

        if (msg.sender != owner) {
            _spendAllowance(owner, msg.sender, ownerShares);
        }

        _burn(owner, ownerShares);

        require(underlyingAsset.transfer(receiver, assets), "Transfer failed");

        emit Withdraw(msg.sender, receiver, owner, assets, ownerShares);

        return ownerShares;
    }

    function convertToAssets(uint256 shares) external view override returns (uint256 assets) {
        uint256 totalAssets = underlyingAsset.balanceOf(address(this));
        uint256 totalShares = totalSupply();

        if (totalAssets == 0 || totalShares == 0) {
            return shares;
        }

        return (shares * totalAssets) / totalShares;
    }

    function harvest(uint256 amount) external override onlyOwner {
        if (amount <= 0) {
            revert ZeroInputAmount();
        }
        underlyingAsset.transferFrom(msg.sender, address(this), amount);

        emit Harvest(msg.sender, amount);
    }
}
