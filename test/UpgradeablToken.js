const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
const { convertUnitFromDecimals } = require("../utils/utils.js")

describe("Upgradeable Token", function () {
    async function fixture() {
        const provider = ethers.provider;
        const [owner, addr1, addr2] = await ethers.getSigners();
        const UpgradeableToken = await ethers.getContractFactory("UpgradeableToken");
        const upgradeableToken = await upgrades.deployProxy(UpgradeableToken, ["Jasper"], { initializer: 'initialize' });

        return { upgradeableToken, owner, addr1, addr2 };
    };

    describe("Token functions", function () {
        it("Should return the correct name and symbol", async function () {
            const { upgradeableToken } = await loadFixture(fixture);
            expect(await upgradeableToken.name()).to.equal("UpgradeableToken");
            expect(await upgradeableToken.symbol()).to.equal("UT");
        });
        it("Should return the author name", async function () {
            const { upgradeableToken } = await loadFixture(fixture);
            expect(await upgradeableToken.getAuthor()).to.equal("Jasper");
        });
        it("Should mint 1000 tokens to the owner", async function () {
            let amount = await convertUnitFromDecimals(1000, 18);
            const { upgradeableToken, owner } = await loadFixture(fixture);
            await upgradeableToken.mint(owner.address, amount);
            expect(await upgradeableToken.balanceOf(owner.address)).to.equal(amount);
        });
    });
    describe("Test after upgrade", function () {
        async function upgrade_fixture() {
            const { upgradeableToken, owner, addr1, addr2 } = await loadFixture(fixture);
            const UpgradeableTokenV2 = await ethers.getContractFactory("UpgradeableTokenV2");
            const upgradeableTokenV2 = await upgrades.upgradeProxy(upgradeableToken.target, UpgradeableTokenV2);
            return { upgradeableTokenV2, owner, addr1, addr2 };
        }
        it("Should return the correct name and symbol", async function () {
            const { upgradeableTokenV2 } = await loadFixture(upgrade_fixture);
            expect(await upgradeableTokenV2.name()).to.equal("UpgradeableToken");
            expect(await upgradeableTokenV2.symbol()).to.equal("UT");
        });
        it("Should return the author name", async function () {
            const { upgradeableTokenV2 } = await loadFixture(upgrade_fixture);
            expect(await upgradeableTokenV2.getAuthor()).to.equal("Jasper");
        });
        it("Should change the author name", async function () {
            const { upgradeableTokenV2 } = await loadFixture(upgrade_fixture);
            await upgradeableTokenV2.setAuthor("Jasper2");
            expect(await upgradeableTokenV2.getAuthor()).to.equal("Jasper2");
        });
    });



});