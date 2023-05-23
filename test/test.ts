import Prediction from "../src/resources/prediction";
import * as dotenv from "dotenv";
dotenv.config();
import { BigNumber, ContractReceipt, ethers } from "ethers";
import { Network } from "../src/types";
import { EventDetail } from "../src/resources/prediction/types";
import { parseEther } from "ethers/lib/utils";
import { Provider } from "@ethersproject/providers";

// const accountAddress = "0x5A5316f2619BF119c2FB2230669b1A4c5a707279";
// const zeroAddress = "0x0000000000000000000000000000000000000000";
// const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
// const signer = new ethers.Wallet(process.env.PRIVATE_KEY | "0x00", provider);

// const prediction = new Prediction(signer, Network.bnbTestnet);

//console.log("prediction:::", prediction.contract["INVERSE_BASIS_POINT()"]);

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
