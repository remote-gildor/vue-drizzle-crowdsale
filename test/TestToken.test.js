const TestToken = artifacts.require("TestToken");

contract("TestToken", accounts => {

  describe("Token specs", () => {

    it("has the correct name", async () => {

      const inst = await TestToken.deployed();
      const name = await inst.name();
      assert.equal(name, "Test Token");

    });

  });

});
