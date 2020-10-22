pragma solidity >=0.4.17 <0.7.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract TestToken is ERC20, ERC20Detailed, ERC20Mintable {
    constructor(string memory _name, string memory _symbol, uint8 _decimals) 
        ERC20Detailed(_name, _symbol, _decimals)
        public {

    }
}
