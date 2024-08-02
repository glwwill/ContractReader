// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

import "@chainlink/contracts/src/v0.8/Ownable.sol";

contract PriceFeed is Ownable {
AggregatorV3Interface internal priceFeed;

/***************************************** */

Network: Kovan
Aggregator: ETH/USD
Address:  0x9326BFA02ADD2366b30bacB125260Af641031331
*****************************/
constructor() {
priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
}

 

//Returns the latest price



function getLatestPrice() public view returns (int) {(,int price,,,) = priceFeed.latestRoundData();

return price;

}

}