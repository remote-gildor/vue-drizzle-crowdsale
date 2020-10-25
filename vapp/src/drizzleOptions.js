import TestToken from './contracts/TestToken.json';
import TestCrowdsale from './contracts/TestCrowdsale.json';

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:7545'
    }
  },
  contracts: [TestToken, TestCrowdsale],
  events: {
    TestCrowdsale: ['TokensPurchased']
  },
  polls: {
    accounts: 15000
  }
}

export default options
