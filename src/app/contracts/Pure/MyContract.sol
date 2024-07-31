// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract MyContract{
    // Concatenates two strings and returns the result
    function concatenate(string memory str1, string memory str2) public pure returns (string memory) {
        return string.concat(str1, str2);
    }
    // Calculates the sum of the two input parameters
    function sum(uint x, uint y) public pure returns (uint) {
        return x + y;
    }
}