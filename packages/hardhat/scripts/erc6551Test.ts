import { ethers } from 'hardhat'
import registry from '../deployments/cronos_testnet/ERC6551Registry.json';
import account from '../deployments/cronos_testnet/ERC6551Account.json'
import ERC721Token from '../deployments/cronos_testnet/ERC721Token.json'

const provider = new ethers.providers.JsonRpcProvider(
    "https://evm-t3.cronos.org/"
);
const secretkey = process.env.DEPLOYER_PRIVATE_KEY;
const walletObj = new ethers.Wallet(secretkey!);
const ethersSigner = walletObj.connect(provider);

async function main() {
    const registryContract = new ethers.Contract(registry.address, registry.abi, ethersSigner);
    const createTx = await registryContract.createAccount(
        account.address, 
        338, //chain ID
        ERC721Token.address, 
        1, // Token ID
        0, // salt
        []
        );

    const createRc = await createTx.wait();
    //console.log(createRc);

    const addr = await registryContract.account(account.address, 
        338, //chain ID
        ERC721Token.address, 
        1, // Token ID
        0 // salt
        )
    
    console.log("Account address: ", addr);
    const accountContract = new ethers.Contract(addr, account.abi, ethersSigner);
    const result = await accountContract.token();
    const owner = await accountContract.owner();
    console.log("token(): ", result);
    console.log("owner(): ", owner);

    



}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
  