// SPDX-License-Identifier: MITs
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VerifyHash is Ownable {
    using ECDSA for bytes32;

    // signature related
    mapping(uint256 => bool) public _usedNonces;
    address private _signerAddress;

    event SetSignerAddress(address signerAddress);

    function matchAddresSigner(
        bytes32 hash,
        bytes memory signature
    ) private view returns (bool) {
        return _signerAddress == hash.recover(signature);
    }

    function setSignerAddress(address addr) external onlyOwner {
        _signerAddress = addr;
        emit SetSignerAddress(addr);
    }

    function getSignerAddress() public view onlyOwner returns (address) {
        return _signerAddress;
    }

    function VerifyMint(
        IERC20 _erc20,
        uint _amount,
        uint nonce,
        uint expireTime,
        bytes memory signature
    ) internal returns (bool) {
        bytes32 hash = keccak256(
            abi.encodePacked(
                "\x19Ethereum Signed Message:\n32",
                keccak256(
                    abi.encodePacked(
                        address(this),
                        msg.sender,
                        _erc20,
                        _amount,
                        nonce,
                        expireTime
                    )
                )
            )
        );
        require(
            _signerAddress != address(0),
            "VerifyHash: Signer address not set"
        );
        require(
            matchAddresSigner(hash, signature),
            "VerifyHash: signature not correct"
        ); //
        require(!_usedNonces[nonce], "VerifyHash: HASH_USED");
        _usedNonces[nonce] = true;
        return true;
    }
}
