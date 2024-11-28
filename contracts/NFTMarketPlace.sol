// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketPlace is Ownable {
    struct Listing {
        uint256 tokenId;
        address tokenAddress;
        address seller;
        uint256 price;
        bool sold;
    }

    Listing[] public listings;

    constructor() Ownable(msg.sender) {}

    function listNFT(address tokenAddress, uint256 tokenId, uint256 price) public {
        IERC721 tokenContract = IERC721(tokenAddress);
        require(tokenContract.ownerOf(tokenId) == msg.sender, "No eres el propietario del NFT");
        require(tokenContract.isApprovedForAll(msg.sender, address(this)), "El contrato no esta aprobado para transferir el NFT");

        listings.push(Listing({
            tokenId: tokenId,
            tokenAddress: tokenAddress,
            seller: msg.sender,
            price: price,
            sold: false
        }));
    }

    function buyNFT(uint256 listingId) public payable {
        Listing storage listing = listings[listingId];
        require(!listing.sold, "El NFT ya ha sido vendido");
        require(msg.value == listing.price, "El precio enviado no coincide con el precio del NFT");

        listing.sold = true;
        IERC721 tokenContract = IERC721(listing.tokenAddress);
        tokenContract.safeTransferFrom(listing.seller, msg.sender, listing.tokenId);

        payable(listing.seller).transfer(msg.value);
    }

    function getListings() public view returns (Listing[] memory) {
        return listings;
    }
}