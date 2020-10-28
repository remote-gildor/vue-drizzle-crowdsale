const TestToken = artifacts.require("TestToken");

contract("TestToken", accounts => {

  describe("Token specs", () => {

    it("has the correct name", async () => {

      const inst = await TestToken.deployed();
      const name = await inst.name();
      assert.equal(name, "Test Token");

    });

    it("has the correct symbol", async () => {

      const inst = await TestToken.deployed();
      const symbol = await inst.symbol();
      assert.equal(symbol, "TT");

    });

    it("has the correct number of decimals", async () => {

      const inst = await TestToken.deployed();
      const decimals = await inst.decimals();
      assert.equal(decimals, 18);

    });

  });

});
