// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./VerifyHash.sol";

contract SimpleToken is ERC20, ERC20Burnable, Ownable, VerifyHash {
    constructor(address _signerAddress) ERC20("SimpleToken", "ST") {
        setSignerAddress(_signerAddress);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function mintWithSignature(
        uint256 _amount,
        uint256 nonce,
        uint256 expireTime,
        bytes memory signature
    ) public {
        require(
            VerifyMint(
                IERC20(address(this)),
                _amount,
                nonce,
                expireTime,
                signature
            ),
            "VerifyHash: signature not correct"
        );
        require(
            block.timestamp <= expireTime,
            "SimpleToken: signature expired"
        );
        _mint(msg.sender, _amount);
    }
}
