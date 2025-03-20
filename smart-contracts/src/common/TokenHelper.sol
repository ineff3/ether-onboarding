// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../01_ERC20/interfaces/IERC20.sol";

contract TokenHelper {
    function parseToken(uint256 value, IERC20 token) public view returns (uint256) {
        return value * 10 ** token.decimals();
    }
}
