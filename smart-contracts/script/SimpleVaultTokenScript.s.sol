// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {SimpleVaultToken} from "../src/01_ERC20/SimpleVaultToken.sol";
import {GoldToken} from "../src/01_ERC20/GoldToken.sol";

contract SimpleVaultTokenScript is Script {
    SimpleVaultToken public simpleVaultToken;
    GoldToken public goldToken;


    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        goldToken = new GoldToken();

        simpleVaultToken = new SimpleVaultToken(address(goldToken));

        vm.stopBroadcast();
    }
}
