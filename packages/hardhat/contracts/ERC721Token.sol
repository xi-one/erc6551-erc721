// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Token is ERC721URIStorage, Ownable{
    
    uint256 private _tokenIds;

    constructor(string memory name, string memory symbol) ERC721(name, symbol){
        _tokenIds = 0;
    }

    function mintNFT(address recipient, string memory tokenURI)
        public
        
        returns (uint256)
    {
        _tokenIds++;

        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function burnNFT(uint256 _id) external {
        _burn(_id);
    }

    function supply() public view returns (uint256){
        return _tokenIds;
    }
}