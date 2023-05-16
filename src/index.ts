import { Signer, providers } from "ethers";
import Prediction from "./resources/prediction";
import { Network } from "./types";

export class MetataSpacecySDK {
	prediction: Prediction;

	constructor(providerOrSigner: providers.JsonRpcProvider | Signer, network: Network) {
		this.prediction = new Prediction(providerOrSigner, network);
	}
}
