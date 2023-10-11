require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades")
require("dotenv").config();

// Go to https://alchemy.com, sign up, create a new App in
// its dashboard, and replace "KEY" with its key
// if you don't want to use Alchemy, you can replace this to your own node
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const PRIVATE_KEY = process.env.PRIVATE_KEY;
// Scan browser API key
const SCAN_API_KEY = process.env.SCAN_API_KEY;

module.exports = {
  solidity: "0.8.19",
  etherscan: {
    apiKey: {
      goerli: SCAN_API_KEY
    }
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY]
    }
  }
};