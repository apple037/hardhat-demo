# hardhat-demo
A demo project for hardhat 
# Basic commands
## Install hardhat
```npm install hardhat```
## Create a new project
```npx hardhat init```
## Compile the project
```npx hardhat compile```
## Run the tests
```npx hardhat test```
## Run single test
```npx hardhat test test/test.js```
## Run coverage
```npx hardhat coverage```
## Run the script (deploy contract)
```npx hardhat run scripts/deploy.js```
## Run the script (deploy contract) on Specific Network
```npx hardhat run scripts/deploy.js --network [network-name]```
## Run verify contract
```npx hardhat verify --network [network-name] [contract-address]```
# Project structure
## contracts
1. SimpleToken.sol: A simple ERC20 token contract
2. UpgradableToken.sol: An upgradable ERC20 token contract
3. VerifyHash.sol: A contract to verify the signature
## scripts
1. deploy.js: A script to deploy the contract
2. deploy_upgradable_token.js: A script to deploy the upgradable contract
3. faucet.js: A faucet script to send ether to the address on local network
## todo list
[x] SimpleToken contract and test
[ ] UpgradableToken contract and test