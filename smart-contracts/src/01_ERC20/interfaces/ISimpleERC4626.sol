// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISimpleERC4626 {
    /**
     * @notice Returns the address of the underlying asset managed by the vault.
     * @return The address of the ERC-20 token used as the vault asset.
     */
    function asset() external view returns (address);

    /**
     * @notice Deposits a specified amount of assets into the vault and mints corresponding shares.
     * @param assets The amount of the underlying asset to deposit.
     * @param receiver The address that will receive the minted vault shares.
     * @return shares The number of vault shares minted in exchange for the deposit.
     */
    function deposit(uint256 assets, address receiver) external returns (uint256 shares);

    /**
     * @notice Withdraws a specified amount of assets from the vault by burning corresponding shares.
     * @param assets The amount of the underlying asset to withdraw.
     * @param receiver The address that will receive the withdrawn assets.
     * @param owner The address that owns the vault shares being burned.
     * @return shares The number of vault shares burned to process the withdrawal.
     */
    function withdraw(uint256 assets, address receiver, address owner) external returns (uint256 shares);

    /**
     * @notice Converts an asset amount into the equivalent number of vault shares.
     * @param assets The amount of the underlying asset.
     * @return shares The corresponding number of vault shares.
     */
    function convertToShares(uint256 assets) external view returns (uint256 shares);

    /**
     * @notice Converts a vault share amount into the equivalent number of underlying assets.
     * @param shares The number of vault shares.
     * @return assets The corresponding amount of underlying assets.
     */
    function convertToAssets(uint256 shares) external view returns (uint256 assets);

    /**
     * @notice Allows the vault owner to inject additional assets into the vault.
     * @dev Only the contract owner can call this function.
     * @param amount The amount of assets to add to the vault.
     */
    function harvest(uint256 amount) external;
}
