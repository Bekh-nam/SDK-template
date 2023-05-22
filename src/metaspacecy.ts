import { providers, Signer } from "ethers";
import Prediction from "./resources/prediction";
import { Network } from "./types";

export default class MetaspacecySDK {
	prediction: Prediction;

	constructor(providerOrSigner: providers.JsonRpcProvider | Signer, network: Network) {
		this.prediction = new Prediction(providerOrSigner, network);
	}
}
