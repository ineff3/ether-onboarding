// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin-contracts/token/ERC20/ERC20.sol";

contract BadERC20 is ERC20 {
    bool public forceFailTransfer = false;
    bool public forceFailTransferFrom = false;

    constructor() ERC20("BadERC20", "bERC") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        if (forceFailTransfer) {
            return false;
        }
        return super.transfer(to, amount);
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        if (forceFailTransferFrom) {
            return false;
        }
        return super.transferFrom(from, to, amount);
    }

    function setForceFailTransfer(bool _fail) external {
        forceFailTransfer = _fail;
    }

    function setForceFailTransferFrom(bool _fail) external {
        forceFailTransferFrom = _fail;
    }
}
