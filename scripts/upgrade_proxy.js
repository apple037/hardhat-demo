const { ethers, upgrades } = require("hardhat");
const fs = require('fs');
async function main() {
    // Load the proxy address from file
    const PROXY_ADDRESS = fs.readFileSync("deployed_address.txt").toString();
    if (!PROXY_ADDRESS) {
        throw new Error("Please deploy the contract first");
    }
    const UpgradeableTokenV2 = await ethers.getContractFactory("UpgradeableTokenV2");
    const upgradeableTokenV2 = await upgrades.upgradeProxy(PROXY_ADDRESS, UpgradeableTokenV2);
    console.log("UpgradeableToken upgraded to V2 at:", await upgradeableTokenV2.getAddress());
    // Save proxy address to file
    fs.writeFileSync("deployed_address.txt", await upgradeableTokenV2.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });