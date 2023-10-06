// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract UpgradeableToken is
    Initializable,
    ERC20Upgradeable,
    ERC20BurnableUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    string private author;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(string memory authorName) public initializer {
        __ERC20_init("UpgradeableToken", "UT");
        __ERC20Burnable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
        __author_init(authorName);
    }

    function __author_init(string memory _author) public initializer {
        author = _author;
    }

    function getAuthor() public view returns (string memory) {
        return author;
    }

    // Token Function

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // UUPS Function

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
