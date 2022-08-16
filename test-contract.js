const { Contract, getDefaultProvider, Wallet } = require('ethers')
const lockJson = require('./artifacts/contracts/Lock.sol/Lock.json')

const provider = getDefaultProvider('http://127.0.0.1:8545/')
const wallet = new Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider)
const contract = new Contract('0x5FbDB2315678afecb367f032d93F642f64180aa3', lockJson.abi, wallet)
contract['withdraw']()