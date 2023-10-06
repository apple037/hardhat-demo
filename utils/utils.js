const { Web3 } = require("web3")
const web3 = new Web3("http://localhost:8545")
const { ethers } = require("hardhat");

async function convertUnitFromDecimals(amount, decimals) {
    return BigInt(amount * Math.pow(10, decimals));
}


async function mintSign(verifyContractAddress, sender, tokenAddress, amount, nonce, expireTime, signer) {
    let data = {
        verifyContractAddress: verifyContractAddress,
        sender: sender,
        tokenAddress: tokenAddress,
        amount: amount,
        nonce: nonce,
        expireTime: expireTime,
        signer: signer.address,
    };
    //console.log("data: ", data);
    let hex = web3.utils.soliditySha3(
        { t: "address", v: verifyContractAddress },
        { t: "address", v: sender },
        { t: "address", v: tokenAddress },
        { t: "uint256", v: amount },
        { t: "uint256", v: nonce },
        { t: "uint256", v: expireTime },
    );
    let pk = "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6"
    let sig_web3 = web3.eth.accounts.sign(hex, pk);
    //console.log("sig_web3: ", sig_web3);
    return sig_web3.signature;
}


module.exports = { convertUnitFromDecimals, mintSign };