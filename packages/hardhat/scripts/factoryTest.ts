import { ethers } from 'hardhat'
import factory from '../deployments/cronos_testnet/Factory.json'
import account from '../deployments/cronos_testnet/ERC6551Account.json'
import ERC1155Token from '../deployments/cronos_testnet/ERC1155Token.json';

const provider = new ethers.providers.JsonRpcProvider(
    "https://evm-t3.cronos.org/"
);
const secretkey = process.env.DEPLOYER_PRIVATE_KEY;
const walletObj = new ethers.Wallet(secretkey!);
const ethersSigner = walletObj.connect(provider);

async function main() {

    const factroyContract = new ethers.Contract(factory.address, factory.abi, ethersSigner);
    const seed = 0;
    const changetx = await factroyContract.setAccount(account.address);
    await changetx.wait();
    // deploy 
    const deploytx = await factroyContract.deployNFT("testNFT", "TEST");
    const deployrc = await deploytx.wait();
    const event = deployrc.events.find((element: any) => element.event === 'DeployNFT');
    const [nftcontract, owner] = event.args;
    console.log("nft address: ", nftcontract);
    console.log("owner: ", owner); 
    // minting 
    const mintTx = await factroyContract.mintNFT(nftcontract, "0xc75C8C7f741a312Ba9f5E6725cf837EcB379054D", "", seed);
    const mintRc = await mintTx.wait();
    const mintEvent = mintRc.events.find((element: any) => element.event === 'MintNFT');
    const [tokenId, accountAddr] = mintEvent.args;
    console.log("token ID: ", tokenId);
    console.log("Account Address: ", accountAddr);


    
    /* const nftcontract = '0x394E929891E951CC66E6B599a03223c1C38909f1';
    const tokenId = 1;
    const accountAddr = '0xA6CCc4a86E18Ecd330fc26680919094B196D39ba' */

    
    // nft contract address 조회 
    const addr = await factroyContract.getAccountAddress(nftcontract, tokenId, seed);
    console.log("account address check: ", addr);

    // erc6551 account에 erc1155 토큰 민팅하고 전송하기
    const subSecretkey = process.env.SUB_PRIVATE_KEY;
    const walletObj2 = new ethers.Wallet(subSecretkey!);
    const ethersSigner2 = walletObj2.connect(provider);
    const accountContract = new ethers.Contract(accountAddr, account.abi, ethersSigner2);
    const erc1155Contract = new ethers.Contract(ERC1155Token.address, ERC1155Token.abi, ethersSigner);
    const erc1155Tx = await erc1155Contract.mint(accountAddr, 1, 3, []);

    const erc1155Rc = await erc1155Tx.wait();
    let fromBalance = await erc1155Contract.balanceOf(accountAddr, 1);
    let toBalance = await erc1155Contract.balanceOf(ethersSigner.address, 1);
    console.log("before from_balance: ", fromBalance);
    console.log("after to_balance: ", toBalance);

    const calldata = (await erc1155Contract.populateTransaction.safeTransferFrom(accountAddr, ethersSigner.address, 1, 1, [])).data;

    const executeTX = await accountContract.executeCall(ERC1155Token.address, 0, calldata);
    await executeTX.wait();

    fromBalance = await erc1155Contract.balanceOf(accountAddr, 1);
    toBalance = await erc1155Contract.balanceOf(ethersSigner.address, 1);
    console.log("after from_balance: ", fromBalance);
    console.log("after to_balance: ", toBalance);

}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
  