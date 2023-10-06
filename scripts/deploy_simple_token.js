const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const SimpleToken = await ethers.getContractFactory("SimpleToken");

    let tx_signer_adr = process.env.SIGNER_ADDRESS;

    console.log("tx_signer_adr: ", tx_signer_adr);

    // 将构造函数参数作为数组传递给 deploy 函数
    const simpleToken = await SimpleToken.deploy(tx_signer_adr);

    console.log("SimpleToken deployed to:", await simpleToken.getAddress());
    // Store the contract address in a file
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
