// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Array {
    // Several ways to initialize an array

//Declare an Event
event pushed( uint _value);
event poped( uint _value);
event removed(uint _value);
//Emit an event
//emit push(msg.sender, _id, msg.value);

    uint256[] public arr;
    //uint256[] public arr2 = [1, 2, 3];
    // Fixed sized array, all elements initialize to 0
    uint256[10] public myFixedSizeArr= [1, 2, 3,6,8,9,23,78,90];

    function get(uint256 i) public view returns (uint256) {
        return arr[i];
    }

    // Solidity can return the entire array.
    // But this function should be avoided for
    // arrays that can grow indefinitely in length.
    function getmyFixedSizeArr() public view returns (uint256[10] memory) {
        return myFixedSizeArr;
    }

    function getArr() public view returns (uint256[] memory) {
        return arr;
    }

  

    function push(uint256 i) public {
        // Append to array
        // This will increase the array length by 1.
        arr.push(i);

        emit pushed( i);
    }

    function pop() public {
        require(arr.length>0,'no items in array');
        uint lasted=arr[arr.length-1];
        // Remove last element from array
        // This will decrease the array length by 1
        arr.pop();
         emit poped( lasted);
    }

    function getLength() public view returns (uint256) {
        return arr.length;
    }

    function remove(uint256 index) public {
        require(index<arr.length,'no item at this position');
        // Delete does not change the array length.
        // It resets the value at index to it's default value,
        // in this case 0
        emit removed(index);
        delete arr[index];
    }

function concatenate(string memory str1, string memory str2) public pure returns (string memory) {
        return string.concat(str1, str2);
    }
    // Calculates the sum of the two input parameters
    function sum(uint x, uint y) public pure returns (uint) {
        return x + y;
    }

    mapping(address => uint256) public myMap;

    function get(address _addr) public view returns (uint256) {
        // Mapping always returns a value.
        // If the value was never set, it will return the default value.
        return myMap[_addr];
    }

    function set(address _addr, uint256 _i) public {
        // Update the value at this address
        myMap[_addr] = _i;
    }

    function remove(address _addr) public {
        // Reset the value to the default value.
        delete myMap[_addr];
    }

   
}