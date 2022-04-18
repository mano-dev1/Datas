// contracts/NFT.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";



interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract NFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    

    constructor() ERC721("Garage Tokens", "GT") {
        
    }

    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

        // bidding

    event Checking(uint256 indexed approvevalue, uint256 indexed fee, uint256 netamount);
    struct Action {
        address nftContAddr;
        string tokenName;
        uint256 nftId;
        address nftOwner;
        uint256 dateTime;
        uint256 startDateTime;
        uint256 endDateTime;
        uint bidId;
    }
    struct Type {
        address addr;
        bool bid;
    }
    
    struct Bids {
        uint256 bidId;
        uint256 dateTime;
        uint256 updatedAt;
        uint256 amount;
        uint256 status;
    }
    // status 1:open 2:completed 3:withdraw
    mapping(uint256 => Action) public action;
    mapping(uint256 => mapping(address => Bids)) public bidData;
    mapping(string => Type) public tokenType;

    uint256 public auction_Id = 1;
    uint256 public bid_Id = 1;

    event RetAuctionId(
        uint256 indexed newAuctionId
    );

    event RetBidId(
        uint256 indexed newBidId
    );

    function addToken(string memory _type, address tokenAddress, bool bid) public {
        tokenType[_type].addr = tokenAddress;
        tokenType[_type].bid = bid;
    }

    function createAution(address nftContAddr, string memory tokenName, uint256 nftId, uint256 startDateTime, uint256 endDateTime) public {
        require(tokenType[tokenName].bid, "oops! Could not create a Bid with this Token");
        require(msg.sender == IERC721(nftContAddr).ownerOf(nftId), "oops! you could not create a Auction");
        uint256 auctionId = auction_Id;
        auction_Id++;
        Action memory Actiondet;

        Actiondet = Action(
            nftContAddr,
            tokenName,
            nftId,
            msg.sender,
            block.timestamp,
            startDateTime,
            endDateTime,
            0
        );
        action[auctionId] = Actiondet;
        emit RetAuctionId(auctionId);
    }

    function placeBid(uint256 aucId, uint256 amount) public {
        require(amount > 0, 'Amount must be greater than zero');
        require(action[aucId].bidId == 0, "Auction already completed");

        address userAddr = msg.sender;
        address nftContAddr = action[aucId].nftContAddr;
        uint256 nftId = action[aucId].nftId;
        string memory tokenName = action[aucId].tokenName;
        uint256 curTime = block.timestamp;

        require(tokenType[tokenName].bid, "oops! Could not create a Bid with this Token");
        require(msg.sender != IERC721(nftContAddr).ownerOf(nftId), "oops! you could not create a Bid");
        require(curTime >= action[aucId].startDateTime, 'Auction not yet started');
        require(curTime <= action[aucId].endDateTime, 'Auction time over');

        address tokenAddr = tokenType[tokenName].addr;
        IERC20 t = IERC20(tokenAddr);
        uint256 approveValue = t.allowance(userAddr, address(this));
        require( approveValue >= amount, "oops! Insufficient Balance");
        if (bidData[aucId][userAddr].amount <= 0) {
            uint256 bidId = bid_Id;
            bid_Id++;
            bidData[aucId][userAddr].bidId = bidId;
            bidData[aucId][userAddr].dateTime = block.timestamp;
            // dateTime: create time
            emit RetBidId(bidId);
        }
        bidData[aucId][userAddr].updatedAt = block.timestamp;
        bidData[aucId][userAddr].status = 1;
        bidData[aucId][userAddr].amount = amount;
    }

    function withdrawBid(uint256 aucId) public {
        address userAddr = msg.sender;
        require(bidData[aucId][userAddr].amount > 0, "oops! Bid not availabe");
        require(bidData[aucId][userAddr].status == 1, "oops! Withdraw bid not allowed to you");
        bidData[aucId][userAddr].updatedAt = block.timestamp;
        bidData[aucId][userAddr].status = 3;
    }

    function claimWinner(uint256 aucId, address bidUser) public {
        uint256 bidId = bidData[aucId][bidUser].bidId;

        require(action[aucId].bidId == 0, "Auction already completed");
        require(bidData[aucId][bidUser].amount > 0, "oops! Bid is not valid");
        require(bidData[aucId][bidUser].status == 1, "oops! Accept bid not allowed to you");

        string memory tokenName = action[aucId].tokenName;
        address tokenAddr = tokenType[tokenName].addr;
        uint256 amount = bidData[aucId][bidUser].amount;
        address conaddress = action[aucId].nftContAddr;
        uint256 Id = action[aucId].nftId;

        _claimWinner(tokenAddr, bidUser, owner(), amount, Id, conaddress);
        IERC721(conaddress).safeTransferFrom(msg.sender, bidUser, Id);
        bidData[aucId][bidUser].status = 2;
        action[aucId].bidId = bidId;
    }

    function _claimWinner(address tokenAddr, address from, address admin_, uint256 amount, uint256 Id, address conaddress) internal{
        uint256 fee = (amount * 10) / 100;
        uint256 val = amount - fee;
        IERC20 t = IERC20(tokenAddr);
        uint256 approveValue = t.allowance(from, address(this));
        require( approveValue >= amount, "oops! Insufficient Balance");
        require(msg.sender == IERC721(conaddress).ownerOf(Id), "oops! Is Not a Owner");
        emit Checking(approveValue, fee, val);
        t.transferFrom(from, admin_, fee);
        t.transferFrom(from, msg.sender, val);
    }
    
}