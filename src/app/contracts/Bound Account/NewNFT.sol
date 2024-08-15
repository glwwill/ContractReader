// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
contract MyToken is ERC721, Ownable {
      using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    constructor(address initialOwner)
        ERC721('MyToken', 'MTK')
        Ownable(initialOwner)
    {}
    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
    function _baseURI() internal pure override returns (string memory) {
        return 'urlLink';
    }
}