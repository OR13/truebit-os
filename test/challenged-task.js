const assert = require('assert');
const timeout = require('../os/lib/util/timeout');
const BigNumber = require('bignumber.js');
const mineBlocks = require('../os/lib/util/mineBlocks');
const fs = require('fs');

let os;
let taskSubmitter;

before(async () => {
  os = await require('../os/kernel')('./basic-client/config.json');
  taskSubmitter = require('../basic-client/taskSubmitter')(os.web3);
});

describe('Challenged Task Life Cycle', async function() {
  this.timeout(60000);
  let killTaskGiver;
  let killSolver;
  let killVerifier;
  let taskID;
  let originalBalance;

  before(async () => {
    killTaskGiver = await os.taskGiver.init(os.web3, os.accounts[0]);
    killSolver = await os.solver.init(os.web3, os.accounts[1], true);
    killVerifier = await os.verifier.init(os.web3, os.accounts[2]);
    originalBalance = new BigNumber(
      await os.web3.eth.getBalance(os.accounts[1])
    );
  });

  after(() => {
    killTaskGiver();
    killSolver();
    killVerifier();
  });

  it('account 0 can submitTask', async () => {
    taskSubmitter.submitTask({
      minDeposit: 1000,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      intervals: [20, 40, 60],
      disputeResAddress: os.verifier.debug.disputeResolutionLayer.address,
      reward: os.web3.utils.toWei('1', 'ether'),
      from: os.accounts[0]
    });
    await timeout(2000);
    let tasks = os.taskGiver.getTasks();
    taskID = Object.keys(tasks)[0];
    assert(Object.keys(os.taskGiver.getTasks()));
  });

  it('account 2 can commitChallenge', async () => {
    let data = await os.verifier.debug.incentiveLayer.getSolution(taskID)
    console.log(data)
  });

  
});
