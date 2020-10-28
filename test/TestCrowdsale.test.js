const {
  BN,           // Big Number support 
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');

const { assert } = require("chai");

// helper
const ether = (n) => web3.utils.toWei(n.toString(), 'ether');

// artifacts
const TestCrowdsale = artifacts.require("TestCrowdsale");
const TestToken = artifacts.require("TestToken");

contract("TestCrowdsale", accounts => {

  beforeEach(async () => {
    this.token_inst = await TestToken.deployed();
    this.crowdsale_inst = await TestCrowdsale.deployed();
    
  });

  describe("Crowdsale specs", () => {

    it("has the correct cap", async () => {

      const cap = await this.crowdsale_inst.cap();
      assert.equal(cap, ether(100));

    });

    it("has the correct rate", async () => {

      const rate = await this.crowdsale_inst.rate();
      assert.equal(rate, 500);

    });

    it("has the correct token address", async () => {

      const token_address = await this.crowdsale_inst.token();
      assert.equal(token_address, this.token_inst.address);

    });

  });

  describe("Crowdsale investments", () => {

    it("succeeds if cap is not yet reached", async () => {
      let weiRaisedBefore = await this.crowdsale_inst.weiRaised();
      assert.equal(weiRaisedBefore, 0);

      let value = ether(50);

      // make 50 ETH investment (which is lower than the cap of 100 ETH)
      const transaction = {
        from: accounts[0],
        value: value
      };

      await this.crowdsale_inst.sendTransaction(transaction);

      // the wei raised should equal to the value invested
      let weiRaisedAfter = await this.crowdsale_inst.weiRaised();
      assert.equal(weiRaisedAfter-weiRaisedBefore, value);

    });

    it("shows the correct new token balance of the investor", async () => {

      const rate = await this.crowdsale_inst.rate();
      const value = ether(50); // the amount that the user invested in the previous test
      const expectedTokens = rate * value;

      const tokenBalance = await this.token_inst.balanceOf(accounts[0]);

      assert.equal(expectedTokens, tokenBalance);

    });

    it("fails if cap is already reached", async () => {

      // total raised so far should be 50 ETH (from the previous test)
      let oldValue = ether(50);
      let weiRaisedBefore = await this.crowdsale_inst.weiRaised();
      assert.equal(oldValue, weiRaisedBefore);

      // the second user should try to invest 51
      let value = ether(51);

      // make 51 ETH investment (which goes over the cap)
      const transaction = {
        from: accounts[1],
        value: value
      };

      await expectRevert(
        this.crowdsale_inst.sendTransaction(transaction),
        "CappedCrowdsale: cap exceeded"
      );

      let weiRaisedAfter = await this.crowdsale_inst.weiRaised();
      assert.equal(weiRaisedAfter, oldValue); // weiRaised should remain the same as before the (failed) tx

    });

  });

});
