# hardhat-test

### Write a lock Contract
1. `npm hardhat` and choose create a Typescript project
  - 合约代码在 contracts/Lock.sol 里面，是一个简单的锁定 Eth 到指定时间的合约
### Depoly Contract
1. 启动一个本地的节点 npx hardhat node
2. 把这个合约发布到本地的节点 npx hardhat run scripts/deploy.ts --network localhost 
3. 可以看到发布的合约地址

### Call Contract Function
1. npm i ethers
2. 添加 test-contract.js

```javascript
const { Contract, getDefaultProvider, Wallet } = require('ethers')
const lockJson = require('./artifacts/contracts/Lock.sol/Lock.json')

// 网络的 API 地址
const provider = getDefaultProvider('http://127.0.0.1:8545/')
// 这里 Wallet 的 private key 对应发布合约的地址
const wallet = new Wallet('b4a715f2607bd0f1c779f9c217a3eeabda414b57bcf1c55abbe047148e7dae99', provider)
// 这里合约地址填写发布合约后生成的地址
const contract = new Contract('0x5FbDB2315678afecb367f032d93F642f64180aa3', lockJson.abi, wallet)
contract['withdraw']()
3. node test-contract.js 发现会报错，因为还没到解锁时间
4. 修改 contract-demo/scripts/deploy.ts 里面的锁定时间为 10s
5. 重新发布2次交易，并且使得 block 的时间超过 10s, 再次调用合约成功
```

### 发布到测试网络
1. https://goerlifaucet.com/ 获取测试的 eth
2. https://infura.io/ 提供了测试网络的 api
3. 创建 api key 后在 hardhat.config.ts 添加 network 字段
```json
  networks: {
    goerli: {
      url: 'https://infura.io/ 提供的 goerli 网络地址',
      accounts: ['账户的 private key']
    }
  }
```
4. 发布合约 npx hardhat run scripts/deploy.ts --network goerli
5. 发布成功后根据合约地址在 https://goerli.etherscan.io/ 查看发布的合约信息
6. 等待锁定时间后，修改 test-contract.js 执行，可以取回存入的 ETH