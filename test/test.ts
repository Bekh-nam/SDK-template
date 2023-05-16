import Prediction from "../src/resources/prediction";
import { ethers } from "ethers";
import { Network } from "../src/types";
import { Event } from "../src/resources/prediction/types";

const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");

const prediction = new Prediction(provider, Network.bnbTestnet);

prediction.getEventDetail(100).then((result: Event) => {
	console.log("result:::::", result);
});
