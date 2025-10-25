pragma solidity ^0.8.20;

contract Watchlist {
    mapping(address => string[]) public watchlists;
    event TokenAdded(address indexed user, string token);

    function addToken(string calldata token) external {
        watchlists[msg.sender].push(token);
        emit TokenAdded(msg.sender, token);
    }

    function getWatchlist(address user) external view returns (string[] memory) {
        return watchlists[user];
    }
}
