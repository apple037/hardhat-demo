const {
    loadFixture, time
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { convertUnitFromDecimals, mintSign } = require("../utils/utils.js");
require("dotenv").config();

describe("SimpleToken", function () {
    async function fixture() {
        const provider = ethers.provider;
        const [owner, addr1, addr2, signer] = await ethers.getSigners();
        const SimpleToken = await ethers.getContractFactory("SimpleToken");
        let tx_signer_adr = process.env.SIGNER_ADDRESS;
        const simpleToken = await SimpleToken.deploy(tx_signer_adr);
        // should emit event
        expect(await simpleToken.setSignerAddress(signer.address)).to.emit(simpleToken, "SetSignerAddress").withArgs(signer.address);
        return { simpleToken, owner, addr1, addr2, signer };
    };

    beforeEach(async function () {
        ({ simpleToken, owner, addr1, addr2, signer, verifyHash } = await loadFixture(fixture));
    });

    describe("Deployment", function () {
        describe("Common function", function () {
            it("Should set the right owner", async function () {
                ({ simpleToken, owner, addr1 } = await loadFixture(fixture));
                expect(await simpleToken.owner()).to.equal(owner.address);
            });

            it("Should set the right name", async function () {
                const name = await simpleToken.name();
                console.log("name: ", name);
                expect(await simpleToken.name()).to.equal("SimpleToken");
            });

            it("Should set the right symbol", async function () {
                expect(await simpleToken.symbol()).to.equal("ST");
            });

            it("Should revert when non-owner tries to mint", async function () {
                await expect(simpleToken.connect(addr1).mint(addr1.address, 100)).to.be.revertedWith("Ownable: caller is not the owner");
            });

            it("Should mint 100 tokens to addr1", async function () {
                await simpleToken.mint(addr1.address, 100);
                expect(await simpleToken.balanceOf(addr1.address)).to.equal(100);
            });
        });
    });

    describe("Token function", function () {
        // Mint 100 tokens to addr1 before each test
        beforeEach(async function () {
            const amount = await convertUnitFromDecimals(100, 18);
            await simpleToken.mint(addr1.address, amount);
            const bal1 = await simpleToken.balanceOf(addr1.address);
        });
        describe("Transfer function", function () {
            it("Should transfer 50 tokens from addr1 to addr2", async function () {
                const amount = await convertUnitFromDecimals(50, 18);
                // Transfer should emit event
                expect(await simpleToken.connect(addr1).transfer(addr2.address, amount)).to.emit(simpleToken, "Transfer").withArgs(addr1.address, addr2.address, amount);
                expect(await simpleToken.balanceOf(addr1.address)).to.equal(amount);
                expect(await simpleToken.balanceOf(addr2.address)).to.equal(amount);
            });
        });
    });

    describe("Signature function", function () {
        it("Should mint 100 tokens to addr1 using a signature", async function () {
            let signer_addr = await simpleToken.getSignerAddress();
            console.log("signer: ", signer_addr);
            let dateTime = new Date().getTime();
            // get 5 minutes from now
            dateTime += 5 * 60 * 1000;
            const timestamp = Math.floor(dateTime / 1000);
            let amount = await convertUnitFromDecimals(100, 18);
            const sig = await mintSign(simpleToken.target, addr1.address, simpleToken.target, amount, 0, timestamp, signer);
            console.log("sig: ", sig);
            let bal2 = await simpleToken.balanceOf(addr1.address);
            console.log("bal2: ", bal2);
            await simpleToken.connect(addr1).mintWithSignature(amount, 0, timestamp, sig);
            let bal1 = await simpleToken.balanceOf(addr1.address);
            console.log("bal1: ", bal1);
            let amount_after = await convertUnitFromDecimals(100, 18);
            expect(await simpleToken.balanceOf(addr1.address)).to.equal(amount_after);
        });
    });
});