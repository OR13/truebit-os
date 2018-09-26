pragma solidity ^0.4.24;

import "../openzeppelin-solidity/MintableToken.sol";
import "../openzeppelin-solidity/BurnableToken.sol";

contract TRU is MintableToken, BurnableToken {
    string public constant name = "TRU Token";
    string public constant symbol = "TRU";
    uint8 public constant decimals = 8;

    event Burn(address indexed from, uint256 amount);

    mapping (address => uint) test_tokens;

    function getTestTokens() public returns (bool) {
        if (test_tokens[msg.sender] != 0) return false;
        test_tokens[msg.sender] = block.number;
        balances[msg.sender] += 100000000000000000000000;
    }

    function () public payable {
        revert("Contract has disabled receiving ether");
    }

}
