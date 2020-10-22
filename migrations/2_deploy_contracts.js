const TestToken = artifacts.require("TestToken");
const TestCrowdsale = artifacts.require("TestCrowdsale");

// helper
//const ether = (n) => new web3.BigNumber(web3.toWei(n, 'ether'));

module.exports = async function(deployer, network, accounts) {
  // Token settings
  const name = "Test Token";
  const symbol = "TT";
  const decimals = 18;

  // Crowdsale settings
  const rate = 500; // 1 ETH = 500 TT
  const owner = accounts[0]; // TODO: Replace me (address that will receive ETH)
  const cap = web3.utils.toWei("100", 'ether');

  // Deploy token contract
  await deployer.deploy(TestToken, name, symbol, decimals);
  const deployedToken = await TestToken.deployed();

  // Deploy crowdsale contract
  await deployer.deploy(TestCrowdsale, rate, owner, deployedToken.address, cap);
  const deployedCrowdsale = await TestCrowdsale.deployed();

  // Add Crowdsale contract address as a token minter
  await deployedToken.addMinter(deployedCrowdsale.address);
};
