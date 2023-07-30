// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721Token.sol";
import "./interfaces/IERC6551Registry.sol";
import "./interfaces/IERC6551Account.sol";

contract Factory is Ownable {
    event DeployNFT(address nftContract, address owner);
    event MintNFT(uint256 tokenID, address accountAddr);

    address private _registry;
    address private _account; 
    mapping(address => ERC721Token[]) public nfts; // owner -> nft contract
    //ERC721Token[] public allNFT;


    constructor (address registry, address account) {
        _registry = registry;
        _account = account;
    }

    function deployNFT(string memory name, string memory symbol) public returns(address){
        ERC721Token nft = new ERC721Token(name, symbol);
        nfts[msg.sender].push(nft);
        address nftContract = address(nft);
        emit DeployNFT(nftContract, msg.sender);
        return address(nft);
    }

    function mintNFT(address nftAddr, address to, string memory uri, uint256 seed) public returns (uint256 tokenID, address accountAddr){
        ERC721Token nftContract = ERC721Token(nftAddr);
        
        tokenID = nftContract.mintNFT(to, uri);
        accountAddr = IERC6551Registry(_registry).createAccount(
            _account,
            338,
            nftAddr,
            tokenID,
            seed,
            ""
        );
        emit MintNFT(tokenID, accountAddr);
    }

    function getAccountAddress(address nftAddr, uint256 id, uint256 seed) public view returns (address) {
        address accountAddr = IERC6551Registry(_registry).account(
            _account,
            338,
            nftAddr,
            id,
            seed
        );

        return accountAddr;
    }

    function setRegistry(address newRegistry) external onlyOwner {
        _registry = newRegistry;
    }

    function setAccount(address newAccount) external onlyOwner {
        _account = newAccount;
    }

    function getRegistry() public view returns(address){
        return _registry;
    }

    function getAccount() public view returns(address) {
        return _account;
    }

} 