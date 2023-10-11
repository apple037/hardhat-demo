const { ethers, upgrades } = require("hardhat");
const fs = require('fs');
async function main() {
    const UpgradeableToken = await ethers.getContractFactory("UpgradeableToken");
    const upgradeableToken = await upgrades.deployProxy(UpgradeableToken, ["Jasper"], { initializer: 'initialize' });
    console.log("UpgradeableToken deployed to:", await upgradeableToken.getAddress());
    // Save proxy address to file
    fs.writeFileSync("deployed_address.txt", await upgradeableToken.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });