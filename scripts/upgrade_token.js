const { ethers, upgrades } = require("hardhat");
const fs = require('fs');

async function main() {
    const UpgradeableTokenV2 = await ethers.getContractFactory("UpgradeableTokenV2");
    // load the deployed address from file
    const PROXY_ADDRESS = fs.readFileSync("deployed_address.txt").toString();
    if (!PROXY_ADDRESS) {
        throw new Error("Please deploy the contract first");
    }
    const upgradeableToken = await upgrades.upgradeProxy(PROXY_ADDRESS, UpgradeableTokenV2);
    console.log("UpgradeableToken upgraded");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });