const { ethers, upgrades } = require("hardhat");

async function main() {
    const TestToken = await ethers.getContractFactory("TestToken");
    const testToken = await upgrades.deployProxy(TestToken, ["Jasper"], { initializer: 'initialize' });
    console.log("TestToken deployed to:", testToken.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });