import { ethers } from 'hardhat'
import ERC721Token from '../deployments/cronos_testnet/ERC721Token.json';


const provider = new ethers.providers.JsonRpcProvider(
    "https://evm-t3.cronos.org/"
);
const secretkey = process.env.DEPLOYER_PRIVATE_KEY;
const walletObj = new ethers.Wallet(secretkey!);
const ethersSigner = walletObj.connect(provider);

async function main() {
    const receiver = "0xc75C8C7f741a312Ba9f5E6725cf837EcB379054D";
    const ERC721Contract = new ethers.Contract(ERC721Token.address, ERC721Token.abi, ethersSigner);
    const mintTx = await ERC721Contract.mintNFT(receiver, " ");

    const mintRc = await mintTx.wait();
    //console.log(mintRc);

    const TokenId = await ERC721Contract.supply();
    console.log("Minted id: ", TokenId);
    console.log("Receiver: ", receiver)
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
  