// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    constructor(address payable r1, address payable r2) {
        receiver1 = r1;
        receiver2 = r2;
    }

    function split() public payable {
        receiver1.transfer(msg.value / 2);
        receiver2.transfer(msg.value / 2);
    }

    function updateReceiver(address payable r1, address payable r2) public {
        require(msg.sender == receiver1 || msg.sender == receiver2);
        receiver1 = r1;
        receiver2 = r2;
    }
}
