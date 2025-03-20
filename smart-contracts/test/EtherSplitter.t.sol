// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {EtherSplitter} from "../src/EtherSplitter.sol";

contract EtherSplitterTest is Test {
    function testTrue() public {
        address r1 = makeAddr("Bob");
        address r2 = makeAddr("Alice");

        address me = makeAddr("John");

        vm.deal(me, 1 ether);
        vm.startPrank(me);

        assumePayable(r1);
        assumePayable(r2);

        EtherSplitter ethSplitter = new EtherSplitter(payable(r1), payable(r2));

        uint256 sendAmount = 0.8 ether;
        ethSplitter.split{value: sendAmount}();

        assertEq(r1.balance, 0.4 ether);
        assertEq(r2.balance, 0.4 ether);
    }
}
