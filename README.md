# hardhat-demo
A demo project for hardhat for upgradeable contract(EIP-1967) UUPS
## Basic knowledge
An upgradeable contract is a contract that can be upgraded to a new contract without losing the state of the old contract.
The upgradeable contract is based on the proxy contract and the implementation contract.
The proxy contract is the contract that the user interacts with, and the implementation contract is the contract that the proxy contract calls.
The proxy contract is responsible for forwarding the call to the implementation contract.
The implementation contract is responsible for the business logic.
The proxy contract and the implementation contract are one-to-one mapping.
The illustration of UUPS is as follows:
![image](https://miro.medium.com/v2/resize:fit:1136/format:webp/1*P7C72ZpYrSUIedcqx6q48w.png)
## EIP-1967
EIP-1967 is a standard for upgradeable contracts. It defines the proxy contract and the implementation contract.
The more detail is [here](https://eips.ethereum.org/EIPS/eip-1967)
# Basic commands
## Install hardhat
```npm install hardhat```
## Create a new project
```npx hardhat init```
## Add some contract
可以使用 openzeppelin 的 wizard 產生合約 [url](https://www.openzeppelin.com/contracts)
## Compile the project
```npx hardhat compile```
## Run the tests
```npx hardhat test```
可以使用 console.sol 在合約中印出訊息 僅限Hardhat local network
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
# Local test config
## Run a local network
```npx hardhat node```
## Run a ganache-cli network
```npx ganache-cli```
## Run a ganache-cli network on docker
```docker run -d -p 8545:8545 trufflesuite/ganache-cli:latest```
# The basic workflow
1. Prepare the development environment
2. Initialize the project 
3. Write the contract
4. Write the test
5. Compile the contract
6. Run the test
7. Run the coverage
8. Before deploy the contract, remove the console.log in the contract
9. Deploy the contract
10. Verify the contract
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
- [x] SimpleToken contract and test
- [ ] UpgradableToken contract and test
