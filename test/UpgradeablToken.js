const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TestToken", function () {
    async function fixture() {
        const provider = ethers.provider;
        const [owner, addr1, addr2] = await ethers.getSigners();
        const TestToken = await ethers.getContractFactory("TestToken");
        const testToken = await TestToken.deploy("Jasper");
        await this.testToken.deployed();

        return { testToken, owner, addr1, addr2 };
    };

    it("Should set the right name", async function () {
        const { testToken } = await loadFixture(fixture);
        const name = await testToken.name();
        console.log("name: ", name);
        expect(await testToken.name()).to.equal("TestToken");
    });

    it("Should set the right symbol", async function () {
        const { testToken } = await loadFixture(fixture);
        expect(await testToken.symbol()).to.equal("TT");
    });



});