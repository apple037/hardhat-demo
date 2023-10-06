const { ethers } = require("hardhat");

async function main() {
    const SimpleToken = await ethers.getContractFactory("SimpleToken");
    const simpleToken = await upgrades.deployProxy(SimpleToken);
    console.log("SimpleToken deployed to:", simpleToken.address);
    // Store the contract address in a file
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });