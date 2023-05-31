import * as dotenv from "dotenv";
dotenv.config();
import { BigNumber, ethers } from "ethers";
import { Network } from "../src/types";
import AdminVirtual from "../src/resources/access/registerRole";
//--Init env
const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
const signer = new ethers.Wallet(process.env.PRIVATE_KEY || "12312e1ej1ndjwndn1l23n12312k3n3kl12n1kn32l12n4l1k2n41k2ln41kln4k", provider);
const admin = new AdminVirtual(signer, Network.bnbTestnet);

//-- Test
admin.registerOperator().then((result: any) => {
	console.log("result:::", result);
});
