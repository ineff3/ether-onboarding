pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {Dummy} from "src/Dummy.sol";

contract DummyTest is Test {
    function testTrue() public {
        Dummy dummy = new Dummy();
        assertTrue(dummy.run());
    }
}
