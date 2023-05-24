import Prediction from "../src/resources/prediction";
import * as dotenv from "dotenv";
dotenv.config();
import { BigNumber, ethers } from "ethers";
import { Network } from "../src/types";

const zeroAddress = "0x0000000000000000000000000000000000000000";
const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");

let signer = new ethers.Wallet(process.env.PRIVATE_KEY || "12312e1ej1ndjwndn1l23n12312k3n3kl12n1kn32l12n4l1k2n41k2ln41kln4k", provider);
const prediction = new Prediction(signer, Network.bnbTestnet);

console.log("prediction:::", prediction.contract["INVERSE_BASIS_POINT()"]);

// prediction.getEventDetail(1).then((result: Event) => {
// 	console.log("result:::::", result);
// });

// prediction.updateEntranceFee(BigNumber.from(parseEther("0.00001"))).then((tx) => {
// 	console.log("tx::::", tx);
// });

// prediction.createEvent("Who are you?", ["AA", "BB"], zeroAddress, 10, 1684546822, 1684548822, 60).then((result: any) => {
// 	console.log("result::::", result);
// });

// prediction.predictEvent(accountAddress, 56, 0, BigNumber.from("10000000")).then((result: any) => {
// 	console.log("result::::", result);
// });

// prediction.resolveEvent(61, [100, 0]).then((result: any) => {
// 	console.log("result::::", result);
// });

// prediction.registerOperator().then((result) => {
// 	console.log("result:::", result);
// });